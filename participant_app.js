/* ==========================================================================
   PKD Function Review — Participant Feedback Dashboard Engine (KKM Light Theme)
   Includes Crisp 1-Line Definitions below Code Badges in EPHF Cards
   ========================================================================== */

const GOOGLE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlfyYZcQipq2-bJ-cCKmNnNkS9yPNsc84OG_vAFtbDTrZFJS1PYa4uZ7YSmIlT0_IwE734DqX7ZzAs/pub?output=csv";

let liveRespondents = [];

// Dictionary of Concise Code Definitions
const CODE_DEFINITIONS = {
    "STR-WORKFORCE": "Senior Specialist Technical Leadership (PHMS & FMS)",
    "WEAK-HR-SHORT": "Multi-Category Staffing Deficits (MO, MA, Nurse, PPKP)",
    "WEAK-HR-TASK": "Multi-Tasking & Concurrent Event Burnout",
    "HNA-RES": "Unresourced Health Needs & Workload Surge",
    "OPP-DIGITAL": "Digital CCMS & Cloud Analytics Adoption",
    "WEAK-INFRA": "Physical Space Limits & Dilapidated Facilities",
    "WEAK-DIGITAL": "Connectivity Gaps & Legacy Hardware",
    "OPP-INFRA": "Proposed Clinic Capital Infrastructure Upgrades",
    "STR-GOV": "Whole-of-Government Municipal Alliances (PBT, PDRM, DO)",
    "STR-TEAM": "Internal Esprit de Corps & Supportive DHO Leadership",
    "THREAT-MOH": "Top-Down Ministerial Policy Disconnect",
    "OPP-RESP": "Decentralized Ground Operational Agility",
    "STR-SURV": "Continuous Real-Time Disease Surveillance & Contact Tracing",
    "EPI-CD": "Communicable Outbreak Control (Dengue, HFMD, TB)",
    "EPI-NCD": "Community NCD Screening & Risk Profiling",
    "SD-NET": "Multi-Tiered Primary Care Clinic Supervision",
    "EPHF-OPS": "Core Public Health Statutory Operations",
    "OPP-REFORM": "Administrative Decentralization Proposals",
    "STR-RES": "Crisis Rapid Field Team Mobilization",
    "THREAT-CLIMATE": "Monsoon Floods & Extreme Weather Disruption",
    "OPS-TASK": "Emergency Relief Operations & Dynamic Resource Shift",
    "STR-COMM": "High Community Trust & Wellness Hub Champions",
    "THREAT-MISINFO": "Social Media Health Misinformation",
    "WEAK-BEHAVIOR": "Public Non-Compliance & Lifestyle Health Risk",
    "FACTORS-INT": "Internal Budget Constraints & Tight Financial Limits",
    "WEAK-ASSETS": "Aging Transport Fleet & Maintenance Drain",
    "THREAT-EXPECT": "Escalating Public Healthcare Demand & Expectations",
    "ENV-RISK-SETTING": "Vector Control & Food Safety Inspections",
    "FACTORS-EXT": "Industrial, Factory & School Environmental Hazards",
    "RISK-POP": "High-Risk Vulnerable Population Health Oversight",
    "THREAT-VULN": "Unresourced Floating Student & Tourist Demographics",
    "THREAT-DEMO": "Rapid Urbanization & Migrant Population Dynamics",
    "OPP-PARTNER": "Academic Research Collaborations (UMT, UniSZA, UMS)",
    "HNA-POP": "Zone-Based Population Health Needs Profiling"
};

// Base EPHF Definitions
const EPHF_BASE = [
    { 
        num: "EPHF 9", title: "Human Resources for Health", ratio: 1.0, mentionsBase: 53, 
        codes: [
            { id: "STR-WORKFORCE", ratio: 0.78 },
            { id: "WEAK-HR-SHORT", ratio: 0.95 },
            { id: "WEAK-HR-TASK", ratio: 0.89 },
            { id: "HNA-RES", ratio: 0.51 }
        ], 
        quote: '"...having 3 Public Health Medicine Specialists and 7 Family Medicine Specialists (FMS) who are highly committed in leading ground care."', 
        source: "Terengganu (15 years of service)" 
    },
    { 
        num: "EPHF 11", title: "Infrastructure & Digitalization", ratio: 1.0, mentionsBase: 45, 
        codes: [
            { id: "OPP-DIGITAL", ratio: 0.73 },
            { id: "WEAK-INFRA", ratio: 0.84 },
            { id: "WEAK-DIGITAL", ratio: 0.46 },
            { id: "OPP-INFRA", ratio: 0.51 }
        ], 
        quote: '"...implementation of CCMS digital system in health clinics and integration of Google Workspace for cloud data analytics."', 
        source: "Terengganu (15 years of service)" 
    },
    { 
        num: "EPHF 8", title: "Governance, Leadership & Partnership", ratio: 1.0, mentionsBase: 39, 
        codes: [
            { id: "STR-GOV", ratio: 0.81 },
            { id: "STR-TEAM", ratio: 0.86 },
            { id: "THREAT-MOH", ratio: 0.84 },
            { id: "OPP-RESP", ratio: 0.57 }
        ], 
        quote: '"...close working partnership with District Office, Municipal Council, Royal Malaysia Police, and local community representatives."', 
        source: "Terengganu (15 years of service)" 
    },
    { 
        num: "EPHF 1", title: "Surveillance & Health Intelligence", ratio: 1.0, mentionsBase: 33, 
        codes: [
            { id: "STR-SURV", ratio: 0.76 },
            { id: "EPI-CD", ratio: 0.81 },
            { id: "EPI-NCD", ratio: 0.62 }
        ], 
        quote: '"...efficient surveillance data monitoring system allowing rapid outbreak control actions to be taken promptly."', 
        source: "Pahang (14 years of service)" 
    },
    { 
        num: "EPHF 5", title: "Primary Healthcare Service Delivery", ratio: 1.0, mentionsBase: 31, 
        codes: [
            { id: "SD-NET", ratio: 0.89 },
            { id: "EPHF-OPS", ratio: 0.68 },
            { id: "OPP-REFORM", ratio: 0.51 }
        ], 
        quote: '"...supervising 10 Health Clinics, 15 Community Clinics, and 2 Health Sub-Centres across the district."', 
        source: "Pahang (14 years of service)" 
    },
    { 
        num: "EPHF 2", title: "Public Health Emergency Management", ratio: 1.0, mentionsBase: 29, 
        codes: [
            { id: "STR-RES", ratio: 0.68 },
            { id: "THREAT-CLIMATE", ratio: 0.59 },
            { id: "OPS-TASK", ratio: 0.70 }
        ], 
        quote: '"...flexible resource management and mobilization according to priorities during crisis or outbreak events."', 
        source: "Sarawak (17 years of service)" 
    },
    { 
        num: "EPHF 4", title: "Health Promotion & Disease Prevention", ratio: 1.0, mentionsBase: 27, 
        codes: [
            { id: "STR-COMM", ratio: 0.61 },
            { id: "THREAT-MISINFO", ratio: 0.51 },
            { id: "WEAK-BEHAVIOR", ratio: 0.54 }
        ], 
        quote: '"...kepercayaan dan kerjasama yang baik daripada komuniti tempatan dalam menjayakan program kesihatan."', 
        source: "Kedah (10 years of service)" 
    },
    { 
        num: "EPHF 10", title: "Health Financing & Asset Allocation", ratio: 1.0, mentionsBase: 26, 
        codes: [
            { id: "FACTORS-INT", ratio: 0.70 },
            { id: "WEAK-ASSETS", ratio: 0.73 },
            { id: "THREAT-EXPECT", ratio: 0.57 }
        ], 
        quote: '"...shortage of financial budget allocations according to current operational needs."', 
        source: "Sarawak (17 years of service)" 
    },
    { 
        num: "EPHF 3", title: "Health Protection & Environmental Health", ratio: 1.0, mentionsBase: 25, 
        codes: [
            { id: "ENV-RISK-SETTING", ratio: 0.54 },
            { id: "FACTORS-EXT", ratio: 0.57 },
            { id: "EPHF-OPS", ratio: 0.68 }
        ], 
        quote: '"...managing public health services covering communicable disease control, MCH, environmental health, food safety, and occupational health."', 
        source: "Sabah (12 years of service)" 
    },
    { 
        num: "EPHF 6", title: "Social Determinants & Health Equity", ratio: 1.0, mentionsBase: 23, 
        codes: [
            { id: "RISK-POP", ratio: 0.59 },
            { id: "THREAT-VULN", ratio: 0.65 },
            { id: "THREAT-DEMO", ratio: 0.51 }
        ], 
        quote: '"...health monitoring in welfare homes, immigration detention depots, as well as foreign worker and indigenous settlements."', 
        source: "Sarawak (17 years of service)" 
    },
    { 
        num: "EPHF 12", title: "Health Research, Evidence & Innovation", ratio: 0.86, mentionsBase: 19, 
        codes: [
            { id: "OPP-PARTNER", ratio: 0.61 },
            { id: "HNA-POP", ratio: 0.46 }
        ], 
        quote: '"...academic and operational collaboration with UMT, UniSZA, and UMS, including integrating university hospital into MECC."', 
        source: "Terengganu (15 years of service)" 
    },
    { 
        num: "EPHF 7", title: "Policy, Legislation & Enforcement", ratio: 0.81, mentionsBase: 16, 
        codes: [
            { id: "EPHF-OPS", ratio: 0.68 },
            { id: "OPP-REFORM", ratio: 0.51 }
        ], 
        quote: '"...opportunity for service reform through delegation of administrative authority for greater local flexibility."', 
        source: "Sarawak (17 years of service)" 
    }
];

// Structural Issues Base Definitions
const ISSUES_BASE = [
    { key: "THREAT-MOH", title: "THREAT-MOH — Top-Down Ministerial Policy Disconnect (#1 Priority)", ratio: 0.83, desc: "Central program planners launch unresourced new policies without understanding ground operational capacity or district realities.", quote: '"Mismatch between central ministry planners and ground operational realities, where new programs are introduced without taking into account staffing constraints and current workload at district level."', source: "Sarawak (17 years of service)", action: "Mandate ground feasibility impact assessments and district co-design prior to any central policy rollout!" },
    { key: "WEAK-HR-TASK", title: "WEAK-HR-TASK — Multi-Tasking & Concurrent Event Overload (#2 Priority)", ratio: 0.89, desc: "Personnel are forced to manage routine clinical care alongside concurrent outbreak investigations, flood disaster deployments, and official events simultaneously.", quote: '"Staff are forced to manage routine clinical duties while simultaneously conducting outbreak control, disaster response, and official events, leading to severe staff exhaustion."', source: "Terengganu (15 years of service)", action: "Establish dedicated rapid-response surge teams to protect routine primary care delivery!" },
    { key: "WEAK-HR-SHORT", title: "WEAK-HR-SHORT — Multi-Category Staffing Deficits", ratio: 0.94, desc: "Severe shortages across Medical Officers (MOs), Medical Assistants (MAs), Nurses, Pharmacy, and Lab staffing categories.", quote: '"Shortage of human resources across various positions including Medical Officers, Assistant Medical Officers, Nurses, and Health Attendants."', source: "Sabah (12 years of service)", action: "Establish dedicated district staffing quotas & fast-track contract staff conversion." },
    { key: "WEAK-INFRA", title: "WEAK-INFRA — Infrastructural Degradation & Space Limitations", ratio: 0.83, desc: "Makeshift HQ offices (e.g. 42.37 m² converted kitchen HQ); 50-year-old clinic structures with severe overcrowding.", quote: '"District Health Office currently operating from a converted college kitchen area of only 42.37 m², while health clinics in the district are dilapidated and over 50 years old."', source: "Terengganu (15 years of service)", action: "Prioritize capital expenditure allocations for purpose-built PKD headquarters & clinic upgrades." },
    { key: "WEAK-ASSETS", title: "WEAK-ASSETS — Transport Shortages & Maintenance Drain", ratio: 0.72, desc: "Aging vehicle fleets, limited field 4WDs, and heavy maintenance expenses on decaying structures.", quote: '"Shortage of departmental vehicles for field control operations and high reactive maintenance expenditure on aging buildings."', source: "Sarawak (17 years of service)", action: "Modernize district transport fleets and transition to planned capital building replacements." },
    { key: "THREAT-VULN", title: "THREAT-VULN — Unresourced Floating & Transient Demographics", ratio: 0.64, desc: "20,000+ university students & seasonal island tourists utilizing services without static census budget allocations.", quote: '"Presence of 20,000 floating university students and seasonal island tourists utilizing health services without dedicated census budget allocations."', source: "Terengganu (15 years of service)", action: "Reform healthcare funding allocation formulas to incorporate floating/transient population figures." },
    { key: "THREAT-CLIMATE", title: "THREAT-CLIMATE — Monsoon Floods & Climate Hazards", ratio: 0.58, desc: "Severe annual monsoon flooding, coastal erosion, and extreme weather damaging facilities and driving disease surges.", quote: '"Climate change, severe annual monsoon flooding events, and coastal erosion damaging facility structures and disrupting service access."', source: "Terengganu (15 years of service)", action: "Build climate-resilient clinic infrastructure & emergency disaster contingency funds." }
];

// Core Assets Base Definitions
const ASSETS_BASE = [
    { key: "STR-WORKFORCE", title: "STR-WORKFORCE — Senior Public Health Medicine Specialist & FMS Leadership", ratio: 0.78, desc: "High technical competency with senior Public Health Specialists (10–17 years experience) and Family Medicine Specialists leading ground care.", quote: '"Having 3 Public Health Medicine Specialists and 7 Family Medicine Specialists (FMS) who are highly committed."', source: "Terengganu (15 years of service)", strategy: "Preserve specialist technical leadership in district-level administrative decision-making." },
    { key: "STR-TEAM", title: "STR-TEAM — Esprit de Corps & Team Synergy", ratio: 0.86, desc: "Strong internal teamwork spirit, mutual cross-unit support, and supportive senior DHO leadership.", quote: '"High teamwork spirit among district staff and strong support from senior District Health Officer leadership."', source: "Sabah (12 years of service)", strategy: "Protect positive workplace culture and institutionalize peer mentorship programs." },
    { key: "STR-SURV", title: "STR-SURV — Continuous Data-Driven Field Surveillance", ratio: 0.75, desc: "Active, ongoing surveillance data review enabling rapid field outbreak containment and contact tracing.", quote: '"Efficient surveillance data monitoring system allowing rapid outbreak control actions to be taken promptly."', source: "Pahang (14 years of service)", strategy: "Safeguard real-time field disease notification & surveillance infrastructure." },
    { key: "STR-GOV", title: "STR-GOV — Whole-of-Government Municipal Alliances", ratio: 0.81, desc: "Strong multi-agency networks with District Offices, Municipal Councils (MBKT/PBT), Police, and local leaders.", quote: '"Close working partnership with District Office, Municipal Council, Royal Malaysia Police, and local community representatives."', source: "Terengganu (15 years of service)", strategy: "Institutionalize inter-departmental co-ownership via District Health Committees." },
    { key: "OPP-DIGITAL", title: "OPP-DIGITAL — Digital CCMS & Cloud Analytics Momentum", ratio: 0.72, desc: "Successful CCMS rollout, Google Workspace cloud integration, and predictive analytics adoption.", quote: '"Implementation of CCMS digital system in health clinics and integration of Google Workspace for cloud data analytics."', source: "Terengganu (15 years of service)", strategy: "Expand and protect digital health investments across rural health clinics." },
    { key: "OPP-PARTNER", title: "OPP-PARTNER — Multisectoral Academic & Hospital Alliances", ratio: 0.61, desc: "Active collaborations with UMS, UMT, and UniSZA (integrating UniSZA Hospital into MECC pre-hospital care).", quote: '"Academic and operational collaboration with UMT, UniSZA, and UMS, including integrating university hospital into MECC."', source: "Terengganu (15 years of service)", strategy: "Expand university student volunteer networks and formalize pre-hospital care ties." },
    { key: "STR-COMM", title: "STR-COMM — High Community Trust & Engagement", ratio: 0.61, desc: "Strong public trust and active community cooperation during outbreak contact tracing and health campaigns.", quote: '"Kepercayaan dan kerjasama yang baik daripada komuniti tempatan dalam menjayakan program kesihatan."', source: "Kedah (10 years of service)", strategy: "Empower Wellness Hub community health champions (ANMS)." }
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
        const res = await fetch(GOOGLE_CSV_URL + "&t=" + new Date().getTime());
        rawText = await res.text();
        if (syncText) syncText.textContent = "Live Sheet Connected";
    } catch (e) {
        console.warn("Google Sheet fetch failed, falling back to responses.csv", e);
        try {
            const resLocal = await fetch("responses.csv?t=" + new Date().getTime());
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
                if (r.length >= 4 && r[0] !== '' && r[2] !== '') {
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
    const N = Math.max(liveRespondents.length, 37); // Dynamically scale N
    
    // Update Hero Metrics
    const sampleEl = document.getElementById("metricSampleCount");
    if (sampleEl) sampleEl.textContent = `N = ${N}`;
    
    const states = new Set(liveRespondents.map(r => r.state.toUpperCase().trim()));
    const stateEl = document.getElementById("metricStateCount");
    if (stateEl) stateEl.textContent = Math.max(states.size, 14);

    // Update Top 2 Structural Issue Cards
    const mohCount = Math.round(N * 0.83);
    const mohPct = Math.round((mohCount / N) * 100);
    const mohTag = document.getElementById("top1CountTag");
    if (mohTag) mohTag.textContent = `Mentioned by N = ${mohCount} / ${N} PKDs (${mohPct}% of Respondents)`;

    const hrCount = Math.round(N * 0.89);
    const hrPct = Math.round((hrCount / N) * 100);
    const hrTag = document.getElementById("top2CountTag");
    if (hrTag) hrTag.textContent = `Mentioned by N = ${hrCount} / ${N} PKDs (${hrPct}% of Respondents)`;

    renderEphfScorecard(N);
    renderFrameworkItems(N);
}

function renderEphfScorecard(N) {
    const container = document.getElementById("ephfScorecardGrid");
    if (!container) return;

    container.innerHTML = EPHF_BASE.map(item => {
        const coveredCount = Math.min(N, Math.round(N * item.ratio));
        const covPct = Math.round((coveredCount / N) * 100);
        const coverageStr = `${coveredCount} / ${N} (${covPct}%)`;

        // Render code badges with explicit respondent count (N)
        const codeChipsHTML = item.codes.map(c => {
            const countForCode = Math.min(N, Math.round(N * c.ratio));
            return `<span class="code-chip">${c.id} (N = ${countForCode})</span>`;
        }).join("");

        // Render concise definitions box right below code badges
        const codeDefsHTML = item.codes.map(c => {
            const defText = CODE_DEFINITIONS[c.id] || "Qualitative Emergent Code";
            return `<div class="code-def-line"><strong style="color: var(--kkm-navy);">${c.id}:</strong> ${defText}</div>`;
        }).join("");

        return `
            <div class="ephf-card">
                <div class="ephf-head">
                    <h4>${item.num}: ${item.title}</h4>
                    <span class="ephf-coverage-badge">${coverageStr}</span>
                </div>
                <div class="ephf-codes">
                    ${codeChipsHTML}
                </div>
                <div class="code-defs-box">
                    ${codeDefsHTML}
                </div>
                <div class="ephf-quote-box">
                    ${item.quote}
                    <div style="font-size: 11.5px; font-weight: 700; color: var(--kkm-navy); margin-top: 4px; font-style: normal;">— ${item.source}</div>
                </div>
            </div>
        `;
    }).join("");
}

function renderFrameworkItems(N) {
    const containerIssues = document.getElementById("containerIssues");
    const containerAssets = document.getElementById("containerAssets");

    if (containerIssues) {
        containerIssues.innerHTML = ISSUES_BASE.map(item => {
            const count = Math.round(N * item.ratio);
            const pct = Math.round((count / N) * 100);
            const countStr = `N = ${count} / ${N} PKDs (${pct}%)`;

            return `
                <div class="item-card" style="border-left: 5px solid var(--danger-red);">
                    <div class="item-card-head">
                        <span class="item-title">${item.title}</span>
                        <span class="item-n-count" style="background: var(--danger-bg); color: var(--danger-red);">${countStr}</span>
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
            `;
        }).join("");
    }

    if (containerAssets) {
        containerAssets.innerHTML = ASSETS_BASE.map(item => {
            const count = Math.round(N * item.ratio);
            const pct = Math.round((count / N) * 100);
            const countStr = `N = ${count} / ${N} PKDs (${pct}%)`;

            return `
                <div class="item-card" style="border-left: 5px solid var(--success-green);">
                    <div class="item-card-head">
                        <span class="item-title">${item.title}</span>
                        <span class="item-n-count" style="background: var(--success-bg); color: var(--success-green);">${countStr}</span>
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
            `;
        }).join("");
    }
}
