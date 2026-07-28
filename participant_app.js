/* ==========================================================================
   PKD Function Review — Participant Feedback Dashboard Engine (KKM Light Theme)
   Anonymized Citations: State & Years of Service
   ========================================================================== */

const GOOGLE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlfyYZcQipq2-bJ-cCKmNnNkS9yPNsc84OG_vAFtbDTrZFJS1PYa4uZ7YSmIlT0_IwE734DqX7ZzAs/pub?output=csv";

let liveRespondents = [];

// 12 EPHF Ground Accomplishments Definition with Anonymized Quotes
const EPHF_SCORECARD_DATA = [
    {
        num: "EPHF 9", title: "Human Resources for Health", coverage: "36 / 36 (100%)", mentions: "52 Mentions",
        codes: ["STR-WORKFORCE (N=28)", "WEAK-HR-SHORT (N=34)", "WEAK-HR-TASK (N=32)", "HNA-RES (N=18)"],
        accomplishment: "Deployed Public Health Medicine Specialists & Family Medicine Specialists to lead primary care, managed multi-category staffing deficits (MO, MA, Nurse, PPKP, PPK), executed dual routine care and outbreak response.",
        quote: '"...mempunyai 3 orang Pakar Perubatan Kesihatan Awam (Public Health Medicine Specialist) dan 7 Pakar Perubatan Keluarga (FMS) yang sangat komited."',
        source: "Terengganu (15 years of service)"
    },
    {
        num: "EPHF 11", title: "Infrastructure & Digitalization", coverage: "36 / 36 (100%)", mentions: "44 Mentions",
        codes: ["OPP-DIGITAL (N=26)", "WEAK-INFRA (N=30)", "WEAK-DIGITAL (N=16)", "OPP-INFRA (N=18)"],
        accomplishment: "Rolled out CCMS digital clinic workflows, integrated Google Workspace cloud data analytics, maintained continuous clinic operations despite physical space limits (e.g. 42.37 m² makeshift HQ).",
        quote: '"...pelaksanaan sistem CCMS di klinik-klinik kesihatan serta integrasi Google Workspace bagi analisis data."',
        source: "Terengganu (15 years of service)"
    },
    {
        num: "EPHF 8", title: "Governance, Leadership & Partnership", coverage: "36 / 36 (100%)", mentions: "38 Mentions",
        codes: ["STR-GOV (N=29)", "STR-TEAM (N=31)", "THREAT-MOH (N=30)", "OPP-RESP (N=20)"],
        accomplishment: "Built active multi-agency district alliances with Municipal Councils (MBKT/PBT), Police, District Officers, and local YBs; fostered strong internal team synergy and supportive DHO leadership.",
        quote: '"...hubungan kerjasama yang rapat dengan Pejabat Daerah, PBT (MBKT), PDRM, dan wakil rakyat setempat."',
        source: "Terengganu (15 years of service)"
    },
    {
        num: "EPHF 1", title: "Surveillance & Health Intelligence", coverage: "36 / 36 (100%)", mentions: "32 Mentions",
        codes: ["STR-SURV (N=27)", "EPI-CD (N=29)", "EPI-NCD (N=22)"],
        accomplishment: "Executed continuous real-time disease notification tracking, active contact tracing for Dengue, HFMD, and TB outbreaks, managed urban community NCD health screenings.",
        quote: '"...sistem pemantauan data survelan yang cekap membolehkan tindakan kawalan wabak diambil dengan pantas."',
        source: "Pahang (14 years of service)"
    },
    {
        num: "EPHF 5", title: "Primary Healthcare Service Delivery", coverage: "36 / 36 (100%)", mentions: "30 Mentions",
        codes: ["SD-NET (N=32)", "EPHF-OPS (N=24)", "OPP-REFORM (N=18)"],
        accomplishment: "Supervised multi-tiered primary care clinic networks (Klinik Kesihatan, Klinik Desa, Klinik Komuniti), integrated university hospitals into MECC pre-hospital emergency care.",
        quote: '"...menyelia 10 buah Klinik Kesihatan, 15 Klinik Desa, dan 2 Klinik Komuniti di seluruh daerah."',
        source: "Pahang (14 years of service)"
    },
    {
        num: "EPHF 2", title: "Public Health Emergency Management", coverage: "36 / 36 (100%)", mentions: "28 Mentions",
        codes: ["STR-RES (N=24)", "THREAT-CLIMATE (N=21)", "OPS-TASK (N=25)"],
        accomplishment: "Deployed rapid field teams during annual monsoon floods, managed emergency disaster relief centers, reallocated resources dynamically based on outbreak and crisis priorities.",
        quote: '"...pengurusan sumber yang fleksibel mengikut keutamaan sewaktu krisis atau wabak."',
        source: "Sarawak (17 years of service)"
    },
    {
        num: "EPHF 4", title: "Health Promotion & Disease Prevention", coverage: "36 / 36 (100%)", mentions: "26 Mentions",
        codes: ["STR-COMM (N=22)", "THREAT-MISINFO (N=18)", "WEAK-BEHAVIOR (N=19)"],
        accomplishment: "Mobilized Wellness Hub community health champions (ANMS), conducted healthy lifestyle campaigns, countered social media health misinformation.",
        quote: '"...kepercayaan dan kerjasama yang baik daripada komuniti tempatan dalam menjayakan program kesihatan."',
        source: "Kedah (10 years of service)"
    },
    {
        num: "EPHF 10", title: "Health Financing & Asset Allocation", coverage: "36 / 36 (100%)", mentions: "25 Mentions",
        codes: ["FACTORS-INT (N=25)", "WEAK-ASSETS (N=26)", "THREAT-EXPECT (N=20)"],
        accomplishment: "Managed tight financial allocations, maintained aging transport/vehicle fleets for field inspection teams, met escalating public healthcare demand.",
        quote: '"...kekurangan peruntukan kewangan mengikut keperluan semasa."',
        source: "Sarawak (17 years of service)"
    },
    {
        num: "EPHF 3", title: "Health Protection & Environmental Health", coverage: "36 / 36 (100%)", mentions: "24 Mentions",
        codes: ["ENV-RISK-SETTING (N=19)", "FACTORS-EXT (N=20)", "EPHF-OPS (N=24)"],
        accomplishment: "Conducted vector fogging control, food safety (KMKM) inspections, environmental health oversight in factories, schools, and flood zones.",
        quote: '"...mengurus perkhidmatan kesihatan awam merangkumi kawalan penyakit menular, KKIA, KAS, KMKM, dan KPAS."',
        source: "Sabah (12 years of service)"
    },
    {
        num: "EPHF 6", title: "Social Determinants & Health Equity", coverage: "36 / 36 (100%)", mentions: "22 Mentions",
        codes: ["RISK-POP (N=21)", "THREAT-VULN (N=23)", "THREAT-DEMO (N=18)"],
        accomplishment: "Provided health screening & oversight in immigration detention depots, welfare homes, Orang Asli settlements, and 20,000+ floating university student populations.",
        quote: '"...pemantauan kesihatan di rumah kebajikan, depot tahanan imigresen, serta penempatan warga asing dan Orang Asli."',
        source: "Sarawak (17 years of service)"
    },
    {
        num: "EPHF 12", title: "Health Research, Evidence & Innovation", coverage: "31 / 36 (86%)", mentions: "18 Mentions",
        codes: ["OPP-PARTNER (N=22)", "HNA-POP (N=16)"],
        accomplishment: "Conducted population health profiling by zone, established academic research collaborations with UMT, UniSZA, UMS, and local universities.",
        quote: '"...kerjasama akademik dan operasi bersama UMT, UniSZA, dan UMS serta integrasi hospital universiti dalam MECC."',
        source: "Terengganu (15 years of service)"
    },
    {
        num: "EPHF 7", title: "Policy, Legislation & Enforcement", coverage: "29 / 36 (81%)", mentions: "15 Mentions",
        codes: ["EPHF-OPS (N=24)", "OPP-REFORM (N=18)"],
        accomplishment: "Enforced public health statutory laws, issued technical licensing advisories, advocated administrative decentralization for ground agility.",
        quote: '"...peluang reformasi perkhidmatan melalui pengagihan kuasa pentadbiran yang lebih fleksibel."',
        source: "Sarawak (17 years of service)"
    }
];

// Structural Issues Needing Reform Data with Anonymized Quotes
const ISSUES_DATA = [
    { title: "THREAT-MOH — Top-Down Ministerial Policy Disconnect (#1 Priority)", count: "N = 30 / 36 PKDs (83%)", desc: "Central program planners launch unresourced new policies without understanding ground operational capacity or district realities.", quote: '"Ketidakselarian antara perancang di peringkat kementerian dengan realiti operasi di lapangan, di mana program baharu sering diperkenalkan tanpa mengambil kira kekangan perjawatan dan beban kerja semasa di daerah."', source: "Sarawak (17 years of service)", action: "Mandate ground feasibility impact assessments and district co-design prior to any central policy rollout!" },
    { title: "WEAK-HR-TASK — Multi-Tasking & Concurrent Event Overload (#2 Priority)", count: "N = 32 / 36 PKDs (89%)", desc: "Personnel are forced to manage routine clinical care alongside concurrent outbreak investigations, flood disaster deployments, and official events simultaneously.", quote: '"Petugas perlu menjalankan tugas rutin di klinik serta tugasan kawalan wabak dan bencana serentak, menyebabkan kelesuan anggota dan risiko bebanan kerja lampau."', source: "Terengganu (15 years of service)", action: "Establish dedicated rapid-response surge teams to protect routine primary care delivery!" },
    { title: "WEAK-HR-SHORT — Multi-Category Staffing Deficits", count: "N = 34 / 36 PKDs (94%)", desc: "Severe shortages across Medical Officers (MOs), Medical Assistants (MAs), Nurses, Pharmacy, and Lab staffing categories.", quote: '"Kekurangan kakitangan di pelbagai jawatan merangkumi Pegawai Perubatan, Penolong Pegawai Kesihatan Awam (PPKP), Jururawat, dan Pembantu Perawatan Kesihatan."', source: "Sabah (12 years of service)", action: "Establish dedicated district staffing quotas & fast-track contract staff conversion." },
    { title: "WEAK-INFRA — Infrastructural Degradation & Space Limitations", count: "N = 30 / 36 PKDs (83%)", desc: "Makeshift HQ offices (e.g. 42.37 m² converted kitchen HQ); 50-year-old clinic structures with severe overcrowding.", quote: '"Pejabat bertapak di bekas dapur kolej seluas 42.37 m² sahaja, manakala klinik-klinik di daerah uzur dan telah melebihi usia 50 tahun."', source: "Terengganu (15 years of service)", action: "Prioritize capital expenditure allocations for purpose-built PKD headquarters & clinic upgrades." },
    { title: "WEAK-ASSETS — Transport Shortages & Maintenance Drain", count: "N = 26 / 36 PKDs (72%)", desc: "Aging vehicle fleets, limited field 4WDs, and heavy maintenance expenses on decaying structures.", quote: '"Kekurangan kenderaan jabatan yang uzur untuk operasi kawalan serta perbelanjaan penyelenggaraan bangunan tua yang terlalu tinggi."', source: "Sarawak (17 years of service)", action: "Modernize district transport fleets and transition to planned capital building replacements." },
    { title: "THREAT-VULN — Unresourced Floating & Transient Demographics", count: "N = 23 / 36 PKDs (64%)", desc: "20,000+ university students & seasonal island tourists utilizing services without static census budget allocations.", quote: '"Kehadiran 20,000 pelajar universiti dan pelancong terapung yang menggunakan perkhidmatan kesihatan tanpa peruntukan banci kewangan khusus."', source: "Terengganu (15 years of service)", action: "Reform healthcare funding allocation formulas to incorporate floating/transient population figures." },
    { title: "THREAT-CLIMATE — Monsoon Floods & Climate Hazards", count: "N = 21 / 36 PKDs (58%)", desc: "Severe annual monsoon flooding, coastal erosion, and extreme weather damaging facilities and driving disease surges.", quote: '"Perubahan iklim, kejadian banjir monsun teruk saban tahun, dan hakisan pantai yang menjejaskan akses perkhidmatan serta struktur bangunan fasiliti."', source: "Terengganu (15 years of service)", action: "Build climate-resilient clinic infrastructure & emergency disaster contingency funds." }
];

// Core Assets to Protect Data with Anonymized Quotes
const ASSETS_DATA = [
    { title: "STR-WORKFORCE — Senior Public Health Medicine Specialist & FMS Leadership", count: "N = 28 / 36 PKDs (78%)", desc: "High technical competency with senior Public Health Specialists (10–17 years experience) and Family Medicine Specialists leading ground care.", quote: '"Mempunyai 3 orang Pakar Perubatan Kesihatan Awam (Public Health Medicine Specialist) dan 7 Pakar Perubatan Keluarga (FMS) yang sangat komited."', source: "Terengganu (15 years of service)", strategy: "Preserve specialist technical leadership in district-level administrative decision-making." },
    { title: "STR-TEAM — Esprit de Corps & Team Synergy", count: "N = 31 / 36 PKDs (86%)", desc: "Strong internal teamwork spirit, mutual cross-unit support, and supportive senior DHO leadership.", quote: '"Semangat kerja berpasukan yang tinggi di kalangan warga PKD serta sokongan padu daripada Pegawai Kesihatan Daerah."', source: "Sabah (12 years of service)", strategy: "Protect positive workplace culture and institutionalize peer mentorship programs." },
    { title: "STR-SURV — Continuous Data-Driven Field Surveillance", count: "N = 27 / 36 PKDs (75%)", desc: "Active, ongoing surveillance data review enabling rapid field outbreak containment and contact tracing.", quote: '"Sistem pemantauan data survelan yang cekap membolehkan tindakan kawalan wabak diambil dengan pantas."', source: "Pahang (14 years of service)", strategy: "Safeguard real-time field disease notification & surveillance infrastructure." },
    { title: "STR-GOV — Whole-of-Government Municipal Alliances", count: "N = 29 / 36 PKDs (81%)", desc: "Strong multi-agency networks with District Offices, Municipal Councils (MBKT/PBT), Police, and local leaders.", quote: '"Hubungan kerjasama yang rapat dengan Pejabat Daerah, PBT (MBKT), PDRM, dan wakil rakyat setempat."', source: "Terengganu (15 years of service)", strategy: "Institutionalize inter-departmental co-ownership via District Health Committees." },
    { title: "OPP-DIGITAL — Digital CCMS & Cloud Analytics Momentum", count: "N = 26 / 36 PKDs (72%)", desc: "Successful CCMS rollout, Google Workspace cloud integration, and predictive analytics adoption.", quote: '"Pelaksanaan sistem CCMS di klinik-klinik kesihatan serta integrasi Google Workspace bagi analisis data."', source: "Terengganu (15 years of service)", strategy: "Expand and protect digital health investments across rural health clinics." },
    { title: "OPP-PARTNER — Multisectoral Academic & Hospital Alliances", count: "N = 22 / 36 PKDs (61%)", desc: "Active collaborations with UMS, UMT, and UniSZA (integrating UniSZA Hospital into MECC pre-hospital care).", quote: '"Kerjasama akademik dan operasi bersama UMT, UniSZA, dan UMS serta integrasi hospital universiti dalam MECC."', source: "Terengganu (15 years of service)", strategy: "Expand university student volunteer networks and formalize pre-hospital care ties." },
    { title: "STR-COMM — High Community Trust & Engagement", count: "N = 22 / 36 PKDs (61%)", desc: "Strong public trust and active community cooperation during outbreak contact tracing and health campaigns.", quote: '"Kepercayaan dan kerjasama yang baik daripada komuniti tempatan dalam menjayakan program kesihatan."', source: "Kedah (10 years of service)", strategy: "Empower Wellness Hub community health champions (ANMS)." }
];

document.addEventListener("DOMContentLoaded", () => {
    initParticipantTabs();
    initFrameworkToggle();
    fetchLiveCSV();
    
    document.getElementById("btnRefresh")?.addEventListener("click", fetchLiveCSV);
});

function initParticipantTabs() {
    const navItems = document.querySelectorAll(".p-nav-item");
    const tabContents = document.querySelectorAll(".p-tab-content");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetTab = item.getAttribute("data-tab");

            navItems.forEach(n => n.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            item.classList.add("active");
            document.getElementById(`tab-${targetTab}`).classList.add("active");
        });
    });
}

function initFrameworkToggle() {
    const btnIssues = document.getElementById("btnShowIssues");
    const btnAssets = document.getElementById("btnShowAssets");
    const containerIssues = document.getElementById("containerIssues");
    const containerAssets = document.getElementById("containerAssets");

    btnIssues?.addEventListener("click", () => {
        btnIssues.classList.add("active");
        btnAssets.classList.remove("active");
        containerIssues.style.display = "flex";
        containerAssets.style.display = "none";
    });

    btnAssets?.addEventListener("click", () => {
        btnAssets.classList.add("active");
        btnIssues.classList.remove("active");
        containerAssets.style.display = "flex";
        containerIssues.style.display = "none";
    });
}

function parseCSVText(text) {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentField += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentField.trim());
            currentField = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentRow.push(currentField.trim());
            if (currentRow.some(f => f !== '')) rows.push(currentRow);
            currentRow = [];
            currentField = '';
        } else {
            currentField += char;
        }
    }
    if (currentField !== '' || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        if (currentRow.some(f => f !== '')) rows.push(currentRow);
    }
    return rows;
}

async function fetchLiveCSV() {
    const syncText = document.getElementById("syncText");
    if (syncText) syncText.textContent = "Syncing Live CSV...";

    let rawText = null;
    try {
        const res = await fetch(GOOGLE_CSV_URL);
        rawText = await res.text();
        if (syncText) syncText.textContent = "Live Sheet Connected";
    } catch (e) {
        console.warn("Google Sheet fetch failed, falling back to responses.csv", e);
        try {
            const resLocal = await fetch("responses.csv");
            rawText = await resLocal.text();
            if (syncText) syncText.textContent = "Offline Mode (responses.csv)";
        } catch (e2) {
            console.error("Offline responses.csv failed", e2);
        }
    }

    if (rawText) {
        const rows = parseCSVText(rawText);
        if (rows.length > 1) {
            liveRespondents = [];
            for (let i = 1; i < rows.length; i++) {
                const r = rows[i];
                if (r.length >= 5 && r[0] !== '') {
                    liveRespondents.push({
                        id: `R${liveRespondents.length + 1}`,
                        timestamp: r[0] || "",
                        designation: r[1] || "",
                        pkd: r[2] || "",
                        state: r[3] || ""
                    });
                }
            }
            renderDashboard();
        }
    }
}

function renderDashboard() {
    // Render Hero Metrics
    const sampleEl = document.getElementById("metricSampleCount");
    if (sampleEl) sampleEl.textContent = `N = ${liveRespondents.length}`;
    
    const states = new Set(liveRespondents.map(r => r.state.toUpperCase().trim()));
    const stateEl = document.getElementById("metricStateCount");
    if (stateEl) stateEl.textContent = states.size;

    renderEphfScorecard();
    renderFrameworkItems();
}

function renderEphfScorecard() {
    const container = document.getElementById("ephfScorecardGrid");
    if (!container) return;

    container.innerHTML = EPHF_SCORECARD_DATA.map(item => `
        <div class="ephf-card">
            <div class="ephf-head">
                <h4>${item.num}: ${item.title}</h4>
                <span class="ephf-coverage-badge">${item.coverage}</span>
            </div>
            <div class="ephf-codes">
                ${item.codes.map(c => `<span class="code-chip">${c}</span>`).join("")}
            </div>
            <div class="ephf-accomplishment">
                <strong>Ground Accomplishments:</strong> ${item.accomplishment}
            </div>
            <div class="ephf-quote-box">
                ${item.quote}
                <div style="font-size: 11.5px; font-weight: 700; color: var(--kkm-navy); margin-top: 4px; font-style: normal;">— ${item.source}</div>
            </div>
        </div>
    `).join("");
}

function renderFrameworkItems() {
    const containerIssues = document.getElementById("containerIssues");
    const containerAssets = document.getElementById("containerAssets");

    if (containerIssues) {
        containerIssues.innerHTML = ISSUES_DATA.map(item => `
            <div class="item-card" style="border-left: 5px solid var(--danger-red);">
                <div class="item-card-head">
                    <span class="item-title">${item.title}</span>
                    <span class="item-n-count" style="background: var(--danger-bg); color: var(--danger-red);">${item.count}</span>
                </div>
                <p style="font-size: 13.5px; color: var(--text-secondary);">${item.desc}</p>
                <div class="ephf-quote-box" style="border-left-color: var(--danger-red);">
                    ${item.quote}
                    <div style="font-size: 11.5px; font-weight: 700; color: var(--kkm-navy); margin-top: 4px; font-style: normal;">— ${item.source}</div>
                </div>
                <div class="action-box">
                    <strong>🔧 Ministerial Reform Action:</strong> ${item.action}
                </div>
            </div>
        `).join("");
    }

    if (containerAssets) {
        containerAssets.innerHTML = ASSETS_DATA.map(item => `
            <div class="item-card" style="border-left: 5px solid var(--success-green);">
                <div class="item-card-head">
                    <span class="item-title">${item.title}</span>
                    <span class="item-n-count" style="background: var(--success-bg); color: var(--success-green);">${item.count}</span>
                </div>
                <p style="font-size: 13.5px; color: var(--text-secondary);">${item.desc}</p>
                <div class="ephf-quote-box" style="border-left-color: var(--success-green);">
                    ${item.quote}
                    <div style="font-size: 11.5px; font-weight: 700; color: var(--kkm-navy); margin-top: 4px; font-style: normal;">— ${item.source}</div>
                </div>
                <div class="action-box" style="border-left-color: var(--kkm-gold); background: var(--kkm-gold-light); color: var(--kkm-gold);">
                    <strong>🛡️ Asset Protection Strategy:</strong> ${item.strategy}
                </div>
            </div>
        `).join("");
    }
}
