(function () {
  "use strict";
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var MONTHS_LONG = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var CALLS = window.CALLS || [], AREAS = window.AREAS || [], EXTRA = window.LANES_EXTRA || [];
  var CHECKED = window.CHECKED;

  // ---- dates ----------------------------------------------------------
  function todayIso() {
    var m = /[?&]today=(\d{4}-\d{2}-\d{2})/.exec(location.search);
    if (m) return m[1];
    try {
      return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    } catch (e) { return new Date().toISOString().slice(0, 10); }
  }
  function dn(s) { var p = s.split("-").map(Number); return Date.UTC(p[0], p[1] - 1, p[2]) / 864e5; }
  function fmt(s) { var p = s.split("-").map(Number); return p[2] + " " + MONTHS[p[1] - 1] + " " + p[0]; }
  function fmtLong(s) { var p = s.split("-").map(Number); return p[2] + " " + MONTHS_LONG[p[1] - 1] + " " + p[0]; }
  var TODAY = todayIso(), T = dn(TODAY);

  function status(c) {
    if (c.closed) return "closed";
    if (c.unpublished) return "unpublished";
    if (c.deadline && dn(c.deadline) < T) return "closedAfter";
    return "ahead";
  }
  CALLS.forEach(function (c) { c.st = status(c); });
  var isPast = function (c) { return c.st === "closed" || c.st === "closedAfter"; };
  var laneName = {};
  AREAS.concat(EXTRA).forEach(function (a) { laneName[a.key] = a.name; });
  var areaKeys = AREAS.map(function (a) { return a.key; });

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); }
  function safe(name, fn) { try { fn(); } catch (e) { if (window.console) console.error(name, e); } }

  // ---- headline -------------------------------------------------------
  safe("headline", function () {
    var ahead = CALLS.filter(function (c) { return c.st === "ahead"; });
    var unpub = CALLS.filter(function (c) { return c.st === "unpublished"; });
    var closed26 = CALLS.filter(function (c) { return isPast(c) && c.deadline.slice(0, 4) === "2026"; });
    var sep = closed26.filter(function (c) { return c.deadline.slice(0, 7) === "2026-09"; });
    document.getElementById("q1").textContent = ahead.length + " calls have a deadline ahead, and " + unpub.length + " more are expected but not yet published.";
    document.getElementById("q2").textContent = closed26.length + " calls on this list closed in 2026, " + sep.length + " of them in September.";
    var byMonth = {};
    ahead.forEach(function (c) { var k = c.deadline.slice(0, 7); byMonth[k] = (byMonth[k] || 0) + 1; });
    var best = null;
    Object.keys(byMonth).sort().forEach(function (k) { if (!best || byMonth[k] > byMonth[best]) best = k; });
    document.getElementById("q3").textContent = best
      ? MONTHS_LONG[+best.slice(5, 7) - 1] + " " + best.slice(0, 4) + ", when " + byMonth[best] + " of the listed calls close."
      : "No dated call is ahead; see the expected calls in the table.";
    var unv = CALLS.filter(function (c) { return !c.verified && !isPast(c); });
    document.getElementById("q4").textContent = unv.length
      ? unv.length + " rows, the Chips JU calls on " + unv.map(function (c) { return c.short || c.name.toLowerCase(); }).join(" and ") + ". Their dates appear only on IFD's site so far."
      : "Nothing: every open row was read on an official page.";
    var days = T - dn(CHECKED);
    var s = document.getElementById("stale");
    var txt = "I read every row against its source on " + fmtLong(CHECKED);
    if (days <= 0) txt += ", which is today.";
    else txt += ", " + days + (days === 1 ? " day" : " days") + " before today. Rows whose deadline has passed since then have moved to the closed list.";
    if (days > 14) { txt += " Deadlines move, so read the call page before acting on any row."; s.className = "stale old"; }
    s.textContent = txt;
  });

  // ---- area list ------------------------------------------------------
  safe("areas", function () {
    var ul = document.getElementById("arealist");
    AREAS.forEach(function (a) { ul.appendChild(el("li", null, "<b>" + esc(a.name) + "</b>" + esc(a.note))); });
  });

  // ---- filter ---------------------------------------------------------
  var filter = "all";
  function matches(c, key) {
    if (key === "all") return true;
    if (c.areas.indexOf(key) >= 0) return true;
    return areaKeys.indexOf(key) >= 0 && c.areas.indexOf("any") >= 0;
  }

  // ---- tables ---------------------------------------------------------
  function srcCell(c) {
    var h = c.sources.map(function (s) { return '<a href="' + esc(s.url) + '">' + esc(s.label) + "</a>"; }).join("");
    if (c.verified) h += '<span class="ver">Checked ' + fmt(CHECKED) + "</span>";
    else h += '<span class="ver no">Unverified</span>' + (c.verifyNote ? '<span class="vnote">' + esc(c.verifyNote) + "</span>" : "");
    return h;
  }
  function fitCell(c, withLevel) {
    var h = c.areas.map(function (k) { return '<span class="tag">' + esc(laneName[k]) + "</span>"; }).join("");
    if (withLevel && c.level) h += '<br><span class="lvl ' + c.level + '">' + c.level + "</span>";
    h += '<span class="fitwhy">' + esc(c.why) + "</span>";
    return h;
  }
  function nameCell(c) {
    var h = '<span class="cname">' + esc(c.name) + '</span><span class="code">' + esc(c.code) + "</span>";
    if (c.st === "closedAfter") h += '<span class="after">Closed after I checked</span>';
    return h;
  }
  function deadlineCell(c) {
    if (c.st === "unpublished") return '<span class="dl">Not yet published</span><span class="dnote">' + esc(c.deadlineNote) + "</span>";
    var d = dn(c.deadline) - T, h = '<span class="dl">' + fmt(c.deadline) + "</span>";
    if (c.st === "ahead") h += '<span class="left">' + (d === 0 ? "closes today" : "in " + d + (d === 1 ? " day" : " days")) + "</span>";
    if (c.deadlineNote) h += '<span class="dnote">' + esc(c.deadlineNote) + "</span>";
    return h;
  }
  function row(c, cells) {
    var tr = el("tr", { id: "row-" + c.id, "data-id": c.id });
    cells.forEach(function (x, i) {
      var td = el("td", { "data-k": x[0] }, x[1]);
      td.className = i === 0 ? "first" : (x[0] === "Source" ? "src" : "");
      tr.appendChild(td);
    });
    return tr;
  }
  var GROUPS = [
    { key: "open", title: "Open now", test: function (c) { return c.st === "ahead" && !(c.opens && dn(c.opens) > T); } },
    { key: "later", title: "Opens later, deadline set", test: function (c) { return c.st === "ahead" && c.opens && dn(c.opens) > T; } },
    { key: "unpub", title: "Expected, not yet published", test: function (c) { return c.st === "unpublished"; } }
  ];
  safe("tables", function () {
    var tb = document.querySelector("#opentable tbody");
    GROUPS.forEach(function (g) {
      var list = CALLS.filter(g.test).sort(function (a, b) { return (a.deadline ? dn(a.deadline) : 1e9) - (b.deadline ? dn(b.deadline) : 1e9); });
      if (!list.length) return;
      var gr = el("tr", { "class": "group", "data-group": g.key }); gr.appendChild(el("td", { colspan: "6" }, esc(g.title))); tb.appendChild(gr);
      list.forEach(function (c) {
        var tr = row(c, [["Call", nameCell(c)], ["Funder", esc(c.funder)], ["Deadline", deadlineCell(c)],
          ["Who can apply", esc(c.who)], ["Fit to SDU areas", fitCell(c, true)], ["Source", srcCell(c)]]);
        tr.setAttribute("data-group", g.key); tb.appendChild(tr);
      });
    });
    var cb = document.querySelector("#closedtable tbody");
    CALLS.filter(isPast).sort(function (a, b) { return dn(b.deadline) - dn(a.deadline); }).forEach(function (c) {
      cb.appendChild(row(c, [["Call", nameCell(c)], ["Funder", esc(c.funder)], ["Deadline", deadlineCell(c)],
        ["Fit to SDU areas", fitCell(c, false)], ["Source", srcCell(c)]]));
    });
    var sa = document.getElementById("setaside");
    (window.SET_ASIDE || []).forEach(function (x) {
      sa.appendChild(el("li", null, '<a href="' + esc(x.url) + '">' + esc(x.name) + "</a> <span class=\"code\" style=\"display:inline\">" + esc(x.code) +
        (x.deadline ? ", deadline " + fmt(x.deadline) : "") + "</span>. " + esc(x.reason)));
    });
  });

  function applyFilter() {
    var shown = 0;
    ["#opentable", "#closedtable"].forEach(function (sel) {
      var rows = document.querySelectorAll(sel + " tbody tr[data-id]");
      rows.forEach(function (tr) {
        var c = CALLS.filter(function (x) { return x.id === tr.getAttribute("data-id"); })[0];
        var ok = matches(c, filter);
        tr.classList.toggle("hidden", !ok);
        if (ok) shown++;
      });
      document.querySelectorAll(sel + " tbody tr.group").forEach(function (gr) {
        var any = document.querySelectorAll(sel + ' tbody tr[data-id][data-group="' + gr.getAttribute("data-group") + '"]:not(.hidden)').length;
        gr.classList.toggle("hidden", !any);
      });
      var tb = document.querySelector(sel + " tbody"), old = tb.querySelector("tr.emptyrow");
      if (old) old.remove();
      if (!tb.querySelectorAll("tr[data-id]:not(.hidden)").length) {
        var tr = el("tr", { "class": "emptyrow" }); tr.appendChild(el("td", { colspan: "6", "class": "empty" }, "No call in this part of the list fits this area.")); tb.appendChild(tr);
      }
    });
    document.getElementById("showing").textContent = "Showing " + shown + " of " + CALLS.length + " calls" + (filter === "all" ? "." : ", for " + laneName[filter] + ".");
    document.querySelectorAll("#areachips .chip").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-k") === filter ? "true" : "false"); });
    drawChart();
  }
  function setFilter(k) { filter = k; applyFilter(); }

  safe("chips", function () {
    var box = document.getElementById("areachips");
    var opts = [{ key: "all", name: "All calls" }].concat(AREAS, EXTRA);
    opts.forEach(function (o) {
      var n = CALLS.filter(function (c) { return matches(c, o.key); }).length;
      var b = el("button", { type: "button", "class": "chip", "data-k": o.key, "aria-pressed": "false" }, esc(o.name) + '<span class="c">' + n + "</span>");
      b.addEventListener("click", function () { setFilter(o.key); });
      box.appendChild(b);
    });
  });

  function flashRow(id) {
    var tr = document.getElementById("row-" + id);
    if (!tr) return;
    if (tr.classList.contains("hidden")) { setFilter("all"); }
    tr.scrollIntoView({ behavior: "smooth", block: "center" });
    tr.classList.add("flash");
    setTimeout(function () { tr.classList.remove("flash"); }, 1800);
  }

  // ---- chart ----------------------------------------------------------
  var NS = "http://www.w3.org/2000/svg";
  function s(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function drawChart() {
    safe("chart", function () {
      var host = document.getElementById("chart");
      var W = Math.max(280, host.clientWidth || 600);
      var narrow = W < 600;
      var lanes = AREAS.concat(EXTRA);
      var labelW = narrow ? 0 : 196, binW = narrow ? 44 : 80, padR = 8, top = 34;
      var laneH = narrow ? 50 : 40, trackOff = narrow ? 33 : 20;
      var x0 = labelW + 6, x1 = W - binW - padR;
      var start = dn("2026-04-01"), end = dn("2028-02-01");
      function X(d) { return x0 + (dn(d) - start) / (end - start) * (x1 - x0); }
      var H = top + lanes.length * laneH + 34;
      var svg = s("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img", "aria-label": "Deadlines of the listed calls by SDU research area, April 2026 to January 2028" });

      // lanes
      lanes.forEach(function (ln, i) {
        var y = top + i * laneH, cy = y + trackOff, active = filter === ln.key || (filter !== "all" && areaKeys.indexOf(filter) >= 0 && ln.key === "any");
        if (active) svg.appendChild(s("rect", { x: 0, y: y + 1, width: W, height: laneH - 2, fill: "#eef3fa" }));
        svg.appendChild(s("line", { x1: x0, x2: x1 + binW - 6, y1: cy, y2: cy, stroke: "#e2e0dc", "stroke-width": 1 }));
        var lx = narrow ? x0 : 4, ly = narrow ? y + 13 : cy + 4;
        var t = s("text", { x: lx, y: ly, "font-size": narrow ? 11.5 : 12.5, "font-family": "IBM Plex Sans, system-ui, sans-serif",
          fill: active ? "#2c4a6b" : "#1a1d21", "font-weight": active ? 600 : 400, style: "cursor:pointer;paint-order:stroke", stroke: active ? "#eef3fa" : "#fff", "stroke-width": 4, "stroke-linejoin": "round" }, ln.name);
        t.addEventListener("click", function () { setFilter(filter === ln.key ? "all" : ln.key); });
        svg.appendChild(t);
      });

      // month ticks
      var step = narrow ? 6 : 3;
      for (var mi = 2026 * 12 + 3; mi <= 2028 * 12; mi += step) {
        var y = Math.floor(mi / 12), m = mi % 12;
        var iso = y + "-" + String(m + 1).padStart(2, "0") + "-01", x = X(iso);
        svg.appendChild(s("line", { x1: x, x2: x, y1: top - 4, y2: top + lanes.length * laneH, stroke: "#efede9", "stroke-width": 1 }));
        var lab = MONTHS[m] + (m === 0 || (y === 2026 && m === 3) ? " " + y : "");
        svg.appendChild(s("text", { x: x, y: top + lanes.length * laneH + 16, "text-anchor": mi === 2026 * 12 + 3 ? "start" : "middle", "font-size": 11, "font-family": "IBM Plex Mono, monospace", fill: "#7d8793" }, lab));
      }
      // bin label
      var bx = x1 + binW / 2;
      svg.appendChild(s("line", { x1: x1 + 6, x2: x1 + 6, y1: top - 4, y2: top + lanes.length * laneH, stroke: "#d6d3ce", "stroke-dasharray": "2 3" }));
      svg.appendChild(s("text", { x: W - 2, y: top + lanes.length * laneH + 16, "text-anchor": "end", "font-size": 11, "font-family": "IBM Plex Mono, monospace", fill: "#7d8793" }, "no date"));

      // checked and today lines
      var cx = X(CHECKED);
      svg.appendChild(s("line", { x1: cx, x2: cx, y1: top - 10, y2: top + lanes.length * laneH, stroke: "#1a1d21", "stroke-width": 1.3, "stroke-dasharray": "3 3" }));
      svg.appendChild(s("text", { x: cx, y: top - 14, "text-anchor": "middle", "font-size": 11.5, "font-family": "IBM Plex Sans, system-ui, sans-serif", fill: "#1a1d21" }, "Checked " + fmt(CHECKED)));
      if (T - dn(CHECKED) >= 3 && T < end) {
        var tx = X(TODAY);
        svg.appendChild(s("line", { x1: tx, x2: tx, y1: top - 2, y2: top + lanes.length * laneH, stroke: "#b03a3a", "stroke-width": 1.2 }));
        svg.appendChild(s("text", { x: tx + 4, y: top + 8, "font-size": 11, "font-family": "IBM Plex Sans, system-ui, sans-serif", fill: "#b03a3a" }, "Today"));
      }

      // dots: cluster near-equal dates in a lane and spread each cluster around the track
      var laneKeys = lanes.map(function (l) { return l.key; });
      var items = [];
      CALLS.forEach(function (c) {
        c.areas.forEach(function (k) {
          var li = laneKeys.indexOf(k);
          if (li < 0) return;
          items.push({ c: c, li: li, x: c.unpublished ? bx : X(c.deadline) });
        });
      });
      items.sort(function (a, b) { return a.li - b.li || a.x - b.x; });
      var clusters = [];
      items.forEach(function (it) {
        var last = clusters[clusters.length - 1];
        if (last && last.li === it.li && it.x - last.items[last.items.length - 1].x < 11) last.items.push(it);
        else clusters.push({ li: it.li, items: [it] });
      });
      var sp = narrow ? 8 : 9;
      clusters.forEach(function (cl) {
        var n = cl.items.length;
        cl.items.forEach(function (it, j) { it.cy = top + it.li * laneH + trackOff + (j - (n - 1) / 2) * sp; });
      });
      items.forEach(function (it) {
        var c = it.c, cy = it.cy, r = isPast(c) ? 4.6 : 5.6;
        var dim = filter !== "all" && !matches(c, filter);
        var g = s("g", { style: "cursor:pointer", opacity: dim ? 0.22 : 1, tabindex: "0", role: "button" });
        var shape;
        if (c.unpublished) shape = s("rect", { x: it.x - 5, y: cy - 5, width: 10, height: 10, fill: "#fff", stroke: "#2a78d6", "stroke-width": 1.8 });
        else if (isPast(c)) shape = s("circle", { cx: it.x, cy: cy, r: r, fill: "#b4b9c0", stroke: "#fff", "stroke-width": 0.8 });
        else if (!c.verified) shape = s("circle", { cx: it.x, cy: cy, r: r - 0.4, fill: "#fff", stroke: "#2a78d6", "stroke-width": 1.8, "stroke-dasharray": "2.6 2" });
        else shape = s("circle", { cx: it.x, cy: cy, r: r, fill: "#2a78d6", stroke: "#fff", "stroke-width": 0.8 });
        g.appendChild(s("title", {}, c.name + (c.deadline ? ", " + fmt(c.deadline) : ", not yet published")));
        g.appendChild(shape);
        g.appendChild(s("circle", { cx: it.x, cy: cy, r: 9, fill: "transparent" }));
        g.addEventListener("click", function () { flashRow(c.id); });
        g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flashRow(c.id); } });
        svg.appendChild(g);
      });
      host.innerHTML = "";
      host.appendChild(svg);
    });
  }
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { drawChart(); if (tour.on) tour.place(); }, 120); });

  safe("filter", applyFilter);

  // ---- walkthrough (spotlight) ----------------------------------------
  var STEPS = [
    { sel: "#headline", title: "Four questions first", text: "These are the questions a funding adviser asks before reading a list. The answers are counted from the table when the page loads, so they change as deadlines pass." },
    { sel: "#bluf .chartbox", title: "Deadlines on one timeline", text: "Each dot is one call, in the row of the SDU area it fits. Grey dots had passed when I checked; blue dots are still ahead. Click a dot to jump to its row in the table." },
    { sel: "#areachips", title: "Filter by research area", text: "Click an area to show only the calls that fit it, for example Cryogenic CMOS. Calls open to any area stay in every view." },
    { sel: "#disagree-core", title: "Why each row names its source", text: "One call showed two different deadlines across four official pages. That is why every row carries the page it was read on and the date I checked it." }
  ];
  var tour = { on: false, i: 0, hole: null, card: null };
  tour.place = function () {
    var st = STEPS[tour.i], t = document.querySelector(st.sel);
    if (!t) return;
    var r = t.getBoundingClientRect(), pad = 8;
    var top = r.top + window.scrollY, left = r.left + window.scrollX;
    tour.hole.style.top = (top - pad) + "px"; tour.hole.style.left = (left - pad) + "px";
    tour.hole.style.width = (r.width + 2 * pad) + "px"; tour.hole.style.height = (r.height + 2 * pad) + "px";
    tour.card.innerHTML = '<button class="x" type="button" aria-label="Close">&times;</button><h4>' + esc(st.title) + "</h4><p>" + esc(st.text) + "</p>" +
      '<div class="row"><div class="dots">' + STEPS.map(function (_, j) { return '<i class="' + (j === tour.i ? "on" : "") + '"></i>'; }).join("") + "</div><div>" +
      (tour.i > 0 ? '<button type="button" data-a="back">Back</button> ' : "") +
      '<button type="button" class="primary" data-a="next">' + (tour.i === STEPS.length - 1 ? "Done" : "Next") + "</button></div></div>";
    var vh = window.innerHeight, docW = document.documentElement.clientWidth, cw = tour.card.offsetWidth, ch = tour.card.offsetHeight;
    var target = Math.max(0, top - 70);
    var cardTop = top + r.height + pad + 12;
    if (cardTop + ch > target + vh - 10) {
      var need = cardTop + ch + 10 - vh;
      if (need <= top - 20) target = need; else cardTop = target + vh - ch - 12;
    }
    var cl = Math.min(Math.max(16, left), docW - cw - 16);
    tour.card.style.top = cardTop + "px"; tour.card.style.left = cl + "px";
    window.scrollTo({ top: target, behavior: "smooth" });
    tour.card.querySelector(".x").onclick = tour.close;
    var nx = tour.card.querySelector('[data-a="next"]'), bk = tour.card.querySelector('[data-a="back"]');
    nx.onclick = function () { if (tour.i < STEPS.length - 1) { tour.i++; tour.place(); } else tour.close(); };
    if (bk) bk.onclick = function () { tour.i--; tour.place(); };
  };
  tour.open = function () {
    if (!tour.hole) {
      tour.hole = el("div", { "class": "tour-hole", "aria-hidden": "true" });
      tour.card = el("div", { "class": "tour-card", role: "dialog", "aria-label": "Walkthrough" });
      document.body.appendChild(tour.hole); document.body.appendChild(tour.card);
    }
    tour.hole.style.display = tour.card.style.display = "block";
    tour.on = true; tour.i = 0; tour.place();
  };
  tour.close = function () {
    tour.on = false;
    if (tour.hole) { tour.hole.style.display = tour.card.style.display = "none"; }
    try { localStorage.setItem("callradar.tour.v1", "done"); } catch (e) {}
  };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && tour.on) tour.close(); });
  document.getElementById("tourbtn").addEventListener("click", tour.open);
  window.__tour = tour;
  safe("tour", function () {
    var seen = null;
    try { seen = localStorage.getItem("callradar.tour.v1"); } catch (e) {}
    if (!seen && !/[?&]notour/.test(location.search)) setTimeout(tour.open, 500);
  });
})();
