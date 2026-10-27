// Call radar data. One object per call. Every deadline and rule below was read on the
// source page named in `sources` on CHECKED. The page computes all counts from this file.
window.CHECKED = "2026-10-27";

window.AREAS = [
  { key: "adv",   name: "Advanced Computing",            note: "computing hardware beyond standard CMOS, such as neuromorphic and spintronic circuits" },
  { key: "ams",   name: "Analog Mixed-Signal IC Design", note: "very low power sensor interfaces and data converters" },
  { key: "bio",   name: "Biomedical IC Design",          note: "implantable and wearable chips that sense and stimulate the body" },
  { key: "cryo",  name: "Cryogenic CMOS",                note: "circuits that work a few degrees above absolute zero, for example to control qubits" },
  { key: "pwr",   name: "Power Management",              note: "circuits that stretch battery power or harvest energy from the surroundings" },
  { key: "space", name: "Space and Security",            note: "radiation hard, tamper resistant chips" }
];
// Extra chart rows that are not SDU research areas.
window.LANES_EXTRA = [
  { key: "any",  name: "Any area (open topic)" },
  { key: "eco",  name: "Ecosystem and skills" },
  { key: "none", name: "Outside the six areas" }
];

const PORTAL = "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/";
const IFD = "https://danmarksinnovationsfond.dk/en/calls/";

window.CALLS = [
  // ---------- deadline ahead when checked ----------
  {
    id: "eic-harvest", name: "Advanced materials for miniaturised energy harvesting systems",
    code: "HORIZON-EIC-2026-PATHFINDERCHALLENGES-01-01",
    funder: "European Innovation Council (Horizon Europe)",
    opens: "2026-07-22", deadline: "2026-10-28", deadlineNote: "",
    who: "One organisation alone, or a consortium: two partners from two countries, or three or more from three countries with one in the EU.",
    areas: ["pwr"], level: "Partial",
    why: "The challenge funds new harvesting materials; SDU's power management circuits would be one part of the system.",
    sources: [{ label: "EU portal topic", url: PORTAL + "HORIZON-EIC-2026-PATHFINDERCHALLENGES-01-01" }],
    verified: true
  },
  {
    id: "ai1", name: "AI chip demonstrators for EU compute infrastructure",
    code: "DIGITAL-JU-CHIPS-2026-AI1-SG",
    funder: "Chips JU (Digital Europe), Danish share from IFD",
    opens: "2026-07-07", deadline: "2026-12-01", deadlineNote: "Moved twice: first 23 Sep, then 27 Oct.",
    who: "Must include an EU fabless AI chip company whose chip is already taped out at a commercial foundry.",
    areas: ["adv"], level: "Weak",
    why: "Needs a commercial AI chip that already exists; SDU could only join a company's bid.",
    sources: [
      { label: "EU portal topic", url: PORTAL + "DIGITAL-JU-CHIPS-2026-AI1-SG" },
      { label: "Chips JU open calls", url: "https://www.chips-ju.europa.eu/Open-and-Upcoming-Calls" }
    ],
    verified: true
  },
  {
    id: "gfp", name: "AI compute evaluation and deployment platform",
    code: "DIGITAL-JU-CHIPS-2026-AI-GFP",
    funder: "Chips JU (Digital Europe)",
    opens: "2026-07-07", deadline: "2026-12-01", deadlineNote: "Moved twice: first 23 Sep, then 27 Oct.",
    who: "A buyers' group of EU organisations with at least one public contracting authority and two EU cloud providers.",
    areas: ["none"], level: "None",
    why: "A procurement grant for one shared test platform; there is no role for a university design group.",
    sources: [
      { label: "EU portal topic", url: PORTAL + "DIGITAL-JU-CHIPS-2026-AI-GFP" },
      { label: "Chips JU open calls", url: "https://www.chips-ju.europa.eu/Open-and-Upcoming-Calls" }
    ],
    verified: true
  },
  {
    id: "japan", name: "EU and Japan collaboration on semiconductors",
    code: "DIGITAL-JU-CHIPS-2026-SG-JAPAN",
    funder: "Chips JU (Digital Europe), Danish share from IFD",
    opens: "2026-07-07", deadline: "2026-12-08", deadlineNote: "Moved from 24 Sep.",
    who: "At least three independent organisations under Digital Europe rules, with a matching commitment from Japanese partners.",
    areas: ["none"], level: "Weak",
    why: "Chiplets and chip stacking (2.5D and 3D packaging) close to production; not one of SDU's six areas.",
    sources: [
      { label: "EU portal topic", url: PORTAL + "DIGITAL-JU-CHIPS-2026-SG-JAPAN" },
      { label: "Chips JU open calls", url: "https://www.chips-ju.europa.eu/Open-and-Upcoming-Calls" }
    ],
    verified: true
  },
  {
    id: "eurostars12", name: "Eurostars Call 12",
    code: "Eurostars 3, Call 12",
    funder: "Eureka and the EU (Innovative SMEs partnership), Danish share from IFD",
    opens: "2026-12-17", deadline: "2027-03-04", deadlineNote: "Opens 17 Dec 2026.",
    who: "Led by an R&D active SME, with partners from at least two Eurostars countries; SMEs do at least half the work. IFD pays Danish partners only if a Danish SME takes part.",
    areas: ["any"], level: "Partial",
    why: "Fits any area when a company leads. This is the call to bring to Fyn drone, robotics and sensor SMEs.",
    sources: [
      { label: "IFD call page", url: IFD + "preannouncement-eurostars-3-call-12/" },
      { label: "EU portal listing (same dates)", url: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/competitive-calls-cs/44087099" }
    ],
    verified: true
  },
  {
    id: "vw", name: "Hardware components for virtual worlds",
    code: "HORIZON-CL4-2027-04-HUMAN-01",
    funder: "Horizon Europe, Cluster 4",
    opens: "2026-11-17", deadline: "2027-03-18", deadlineNote: "Opens 17 Nov 2026.",
    who: "Three organisations from three EU or associated countries, at least one in the EU. The topic also asks for social science partners.",
    areas: ["ams", "bio"], level: "Partial",
    why: "Asks for low energy sensors, chips and non invasive brain computer interfaces for headsets and wearables.",
    sources: [
      { label: "EU portal topic", url: PORTAL + "HORIZON-CL4-2027-04-HUMAN-01" },
      { label: "Consortium rule (Annex B)", url: "https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/horizon/wp-call/2026-2027/wp-15-general-annexes_horizon-2026-2027_en.pdf" }
    ],
    verified: true
  },
  {
    id: "data03", name: "Decentralised and sustainable AI data processing",
    code: "HORIZON-CL4-2027-04-DATA-03",
    funder: "Horizon Europe, Cluster 4",
    opens: "2026-11-17", deadline: "2027-03-18", deadlineNote: "Opens 17 Nov 2026.",
    who: "Three organisations from three countries, one in the EU. Only the EU, Norway, Iceland and seven named partner countries; Japan was added on 19 Oct 2026.",
    areas: ["adv"], level: "Partial",
    why: "Names neuromorphic computing and computing in memory as options; software and cloud partners will lead.",
    sources: [
      { label: "EU portal topic", url: PORTAL + "HORIZON-CL4-2027-04-DATA-03" },
      { label: "Consortium rule (Annex B)", url: "https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/horizon/wp-call/2026-2027/wp-15-general-annexes_horizon-2026-2027_en.pdf" }
    ],
    verified: true
  },
  {
    id: "qenable", name: "Quantum chip enabling technologies", short: "quantum chip enabling technologies",
    code: "No EU topic code yet",
    funder: "Chips JU, Danish share from IFD",
    opens: "2026-12-01", deadline: "2027-03-31", deadlineNote: "Date from IFD only; moved from September 2026.",
    who: "Unverified: no EU call text is published. IFD says it will add national money for Danish universities, institutes and companies in a winning project.",
    areas: ["cryo"], level: "Strong",
    why: "Funds the electronics that control and read out qubits, which is what CryoLab works on.",
    sources: [{ label: "IFD call page", url: IFD + "chips-ju-quantum-chips-enabling-technologies/" }],
    verified: false,
    verifyNote: "Not on the EU portal or the Chips JU site, whose upcoming list was empty on 27 Oct 2026."
  },
  {
    id: "qdesign", name: "Quantum chip design tools", short: "quantum chip design tools",
    code: "No EU topic code yet",
    funder: "Chips JU, Danish share from IFD",
    opens: "2026-12-01", deadline: "2027-03-31", deadlineNote: "Date from IFD only; moved from September 2026.",
    who: "Unverified: no EU call text is published. IFD says it will add national money for Danish partners in a winning project.",
    areas: ["cryo"], level: "Partial",
    why: "Design tools and libraries for quantum chips on the EU design platform; SDU could bring its cryogenic circuit experience.",
    sources: [{ label: "IFD call page", url: IFD + "chips-ju-quantum-chips-design/" }],
    verified: false,
    verifyNote: "Not on the EU portal or the Chips JU site, whose upcoming list was empty on 27 Oct 2026."
  },
  {
    id: "space27", name: "Space critical electronic components made in Europe",
    code: "HORIZON-CL4-2027-SPACE-07-83",
    funder: "Horizon Europe, Cluster 4",
    opens: "2027-10-07", deadline: "2028-01-20", deadlineNote: "Opens 7 Oct 2027.",
    who: "Three organisations from three countries, one in the EU. Only organisations in the EU, Norway and Iceland may take part.",
    areas: ["space"], level: "Strong",
    why: "Space grade parts sourced in Europe, which matches SDU's radiation hard chip work. The list of parts it will fund is not public yet.",
    sources: [
      { label: "EU portal topic", url: PORTAL + "HORIZON-CL4-2027-SPACE-07-83" },
      { label: "Consortium rule (Annex B)", url: "https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/horizon/wp-call/2026-2027/wp-15-general-annexes_horizon-2026-2027_en.pdf" }
    ],
    verified: true
  },
  // ---------- expected, not yet published ----------
  {
    id: "cju27", name: "Chips JU open research and innovation calls 2027",
    code: "2026 codes: HORIZON-JU-CHIPS-2026-1-RIA and HORIZON-JU-CHIPS-2026-1-IA",
    funder: "Chips JU (Horizon Europe), Danish share from IFD",
    opens: null, deadline: null, unpublished: true,
    deadlineNote: "In 2026: opened 3 Feb, short proposals by 7 May, full proposals by 17 Sep.",
    who: "2026 rule: organisations in EU, EEA, associated, OECD and Mercosur countries. The 2027 text is not out.",
    areas: ["any"], level: "Strong",
    why: "The yearly open call of the EU chip programme; any of the six areas can enter.",
    sources: [
      { label: "Chips JU calls page (none planned)", url: "https://www.chips-ju.europa.eu/Open-and-Upcoming-Calls" },
      { label: "2026 topic on the EU portal", url: PORTAL + "HORIZON-JU-CHIPS-2026-1-RIA" }
    ],
    verified: true
  },
  {
    id: "gs27", name: "Grand Solutions 2027",
    code: "IFD Grand Solutions",
    funder: "Innovation Fund Denmark (IFD)",
    opens: null, deadline: null, unpublished: true,
    deadlineNote: "In 2026: letters of interest from 5 Jan, phase 1 by 3 Mar, phase 2 by 10 Sep.",
    who: "2026 rule: companies, research institutions and public institutions in or outside Denmark. The 2027 text is not out.",
    areas: ["any"], level: "Partial",
    why: "In 2026 one theme covered critical and digital technologies; the 2027 themes are not public.",
    sources: [{ label: "IFD 2026 call page", url: IFD + "grand-solutions-2026-critical-and/" }],
    verified: true
  },
  // ---------- closed in 2026 ----------
  {
    id: "regions", name: "Cooperation of semiconductor intensive EU regions", closed: true,
    code: "HORIZON-CL4-2026-04-DIGITAL-EMERGING-15", funder: "Horizon Europe, Cluster 4",
    deadline: "2026-04-15", deadlineNote: "",
    areas: ["eco"], why: "About regional chip clusters and their governments, which is the ground this job works on.",
    sources: [{ label: "EU portal topic", url: PORTAL + "HORIZON-CL4-2026-04-DIGITAL-EMERGING-15" }], verified: true
  },
  {
    id: "indphd", name: "Industrial PhD and Industrial Postdoc, autumn 2026", closed: true,
    code: "IFD Industrial Researcher", funder: "Innovation Fund Denmark (IFD)",
    deadline: "2026-09-08", deadlineNote: "",
    areas: ["any"], why: "A PhD or postdoc shared with a company; works for any area.",
    sources: [{ label: "IFD call page", url: IFD + "industrial-phd-in-the-public-sector-autumn-2026/" }], verified: true
  },
  {
    id: "gs26", name: "Grand Solutions 2026: critical and digital technologies", closed: true,
    code: "IFD Grand Solutions", funder: "Innovation Fund Denmark (IFD)",
    deadline: "2026-09-10", deadlineNote: "Phase 1 closed 3 Mar.",
    areas: ["any"], why: "The national partnership call; the 2027 round is in the table above.",
    sources: [{ label: "IFD call page", url: IFD + "grand-solutions-2026-critical-and/" }], verified: true
  },
  {
    id: "eurostars11", name: "Eurostars Call 11", closed: true,
    code: "Eurostars 3, Call 11", funder: "Eureka and the EU, Danish share from IFD",
    deadline: "2026-09-10", deadlineNote: "",
    areas: ["any"], why: "Company led; Call 12 is in the table above.",
    sources: [{ label: "IFD call page", url: IFD + "eurostars-3-call-11/" }], verified: true
  },
  {
    id: "health", name: "Chips JU: reinforcing Europe's strength in health", closed: true,
    code: "HORIZON-JU-CHIPS-2026-FT3-IA", funder: "Chips JU (Horizon Europe)",
    deadline: "2026-09-16", deadlineNote: "",
    areas: ["bio"], why: "Health technology, where SDU's implant and wearable chips belong.",
    sources: [{ label: "EU portal topic", url: PORTAL + "HORIZON-JU-CHIPS-2026-FT3-IA" }], verified: true
  },
  {
    id: "6g", name: "Chips JU: front end modules for 6G radios", closed: true,
    code: "HORIZON-JU-CHIPS-2026-2-RIA", funder: "Chips JU (Horizon Europe)",
    deadline: "2026-09-16", deadlineNote: "",
    areas: ["ams"], why: "Radio circuits, which ICELab's radio frequency (RF) design work covers.",
    sources: [{ label: "EU portal topic", url: PORTAL + "HORIZON-JU-CHIPS-2026-2-RIA" }], verified: true
  },
  {
    id: "power", name: "Chips JU: reinforcing Europe's strength in power electronics", closed: true,
    code: "HORIZON-JU-CHIPS-2026-FT1-IA", funder: "Chips JU (Horizon Europe)",
    deadline: "2026-09-16", deadlineNote: "",
    areas: ["pwr"], why: "Power devices on 300 mm wafers; closer to factories than to SDU's circuits.",
    sources: [{ label: "EU portal topic", url: PORTAL + "HORIZON-JU-CHIPS-2026-FT1-IA" }], verified: true
  },
  {
    id: "space26", name: "Space critical components: radiation hard FPGA", closed: true,
    code: "HORIZON-CL4-2026-SPACE-03-81", funder: "Horizon Europe, Cluster 4",
    deadline: "2026-09-16", deadlineNote: "",
    areas: ["space"], why: "The 2026 round of the space components topic; the 2027 round is above.",
    sources: [{ label: "EU portal topic", url: PORTAL + "HORIZON-CL4-2026-SPACE-03-81" }], verified: true
  },
  {
    id: "cju26", name: "Chips JU open research and innovation calls 2026", closed: true,
    code: "HORIZON-JU-CHIPS-2026-1-RIA and HORIZON-JU-CHIPS-2026-1-IA", funder: "Chips JU (Horizon Europe)",
    deadline: "2026-09-17", deadlineNote: "Short proposals closed 7 May.",
    areas: ["any"], why: "Open topic for any area; the 2027 round is expected above.",
    sources: [
      { label: "EU portal topic (RIA)", url: PORTAL + "HORIZON-JU-CHIPS-2026-1-RIA" },
      { label: "EU portal topic (IA)", url: PORTAL + "HORIZON-JU-CHIPS-2026-1-IA" }
    ], verified: true
  },
  {
    id: "skills", name: "Chips JU: skills hubs of excellence", closed: true,
    code: "DIGITAL-JU-CHIPS-2026-SKILLS-HOE-SG", funder: "Chips JU (Digital Europe)",
    deadline: "2026-09-24", deadlineNote: "",
    areas: ["eco"], why: "University and PhD education hubs in chip design.",
    sources: [{ label: "EU portal topic", url: PORTAL + "DIGITAL-JU-CHIPS-2026-SKILLS-HOE-SG" }], verified: true
  },
  {
    id: "nordforsk", name: "International research collaboration in quantum technology", closed: true,
    code: "NordForsk, with Canada's NSERC and G7 partners", funder: "NordForsk, Danish share from IFD",
    deadline: "2026-09-24", deadlineNote: "",
    areas: ["cryo"], why: "Quantum research with Nordic partners from at least two countries.",
    sources: [{ label: "IFD call page", url: IFD + "international-collaboration-on-research-in-quantum-technology/" }], verified: true
  }
];

// Read and set aside: checked on the source page, not listed above.
window.SET_ASIDE = [
  { name: "Integrated photonic devices for very low power use", code: "HORIZON-CL4-2027-05-DIGITAL-EMERGING-03", deadline: "2027-03-18",
    reason: "Photonics is not one of SDU's six areas.", url: PORTAL + "HORIZON-CL4-2027-05-DIGITAL-EMERGING-03" },
  { name: "AI driven robotics for industry", code: "HORIZON-CL4-2027-04-DIGITAL-EMERGING-05", deadline: "2027-03-18",
    reason: "Robot integration with no chip work in the scope, and a single grant for one large consortium.", url: PORTAL + "HORIZON-CL4-2027-04-DIGITAL-EMERGING-05" },
  { name: "EuroHPC quantum platform calls", code: "HORIZON-JU-EUROHPC-2026 (several topics)", deadline: "2026-11-17",
    reason: "Quantum computer platforms; three weeks is too short to build a consortium.", url: PORTAL + "HORIZON-JU-EUROHPC-2026-SPT-10-01" },
  { name: "Independent Research Fund Denmark", code: "DFF", deadline: null,
    reason: "Its list of funding instruments with upcoming deadlines was empty when I checked.", url: "https://dff.dk/en/apply-for-funding/see-what-you-can-apply-for/current-funding-opportunities/" }
];
