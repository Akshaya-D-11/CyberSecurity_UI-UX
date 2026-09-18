# AETHER OT — Industrial Cybersecurity Platform
> **Frontend + UX Design Challenge Brief Submission**  
> *Dashboard & Attack Path Investigation Workspace*

---

## 📌 Project Overview
**AETHER OT** is an enterprise-grade operational technology (OT) cybersecurity platform interface designed to help security leadership and operational teams monitor asset posture, triage risks in 5–10 seconds, and investigate multi-stage attack paths across Purdue Model network layers.

---

## ⚡ Quick Start (How to Run)

### Option 1: Direct File Launch (Easiest)
Simply double-click **`index.html`** in your file explorer, or run in terminal:
```powershell
start index.html
```

### Option 2: Local HTTP Server (Node.js / Python)
```powershell
# Using Node.js:
npx serve .

# Or using Python:
python -m http.server 8000
```
Then open [http://localhost:3000](http://localhost:3000) or [http://localhost:8000](http://localhost:8000) in your browser.

---

## ✨ Key Features

### 1. Surface A: Main Operational Dashboard
- **5–10 Second Triage Guarantee**: Immediately answers system health, active attack vectors, exposed crown jewels, managed asset counts, and sensor coverage.
- **#1 Priority Attack Vector Preview**: Direct visual preview of critical exposure paths with a 1-click jump to the full graph workspace.
- **Purdue Model Asset Distribution**: Visual breakdown of assets across Level 4 Enterprise IT down to Level 1 PLCs & Safety Systems.
- **Top Priority Risks Table**: Filterable findings list sorted by CVSS & path controllability.
- **Recent Change Stream**: Real-time event log tracking new asset discoveries and logic modifications.

### 2. Surface B: Attack Path Map Workspace
- **Interactive SVG Topology Canvas**: Clean swimlane layout separating assets by Purdue Levels (Level 4 through Level 1).
- **Directed Protocol Edges**: Visualizes connections (`Modbus TCP`, `OPC UA`, `SSH`, `S7Comm`) with animated traffic pulse effects.
- **Toolbar & Graph Controls**: Toggle **Blast Radius Mode** (reachable assets), traffic pulse animations, and map legend overlays.

### 3. Contextual Investigation Panel
- Slide-out drawer opening context on node/edge selection without losing graph position.
- Includes tabs for **Overview & Why It Matters**, **Observed Traffic Logs**, **CVE Vulnerabilities**, and **Mitigation Playbooks**.

### 4. Interactive Persona & System State Simulator
- **Personas**: Instantly switch views between **CISO / Leadership**, **SOC Analyst**, **OT Specialist**, and **Plant Operator**.
- **System States**: Test live UI responses under **Normal State**, **High Risk Alert**, **Degraded Sensor Data** (warning banner), **Uncertain Data**, and **Empty State**.

---

## 🎨 Design System & Color Tokens

- **Primary Base Palette**: Brand Orange (`#FF6B00`), Dark Canvas (`#080B10`), Surface Glass (`#0E131F`), Crisp White (`#F8FAFC`).
- **Severity Tokens**: Critical (`#EF4444`), High (`#F59E0B`), Medium (`#3B82F6`), Low (`#10B981`), Degraded (`#D946EF`).
- **WCAG 2.2 Accessibility**: High contrast focus rings (`:focus-visible`), icon-assisted status indicators (non-color-only communication), and stationary border glow hover states.

---

## 📑 File Structure

```
cybersecurity_project/
├── index.html                # App HTML shell
├── README.md                 # Project README documentation
├── src/
│   ├── app.js                # Self-contained bundled application logic & state engine
│   ├── styles/
│   │   ├── main.css          # Design system, CSS variables & component styling
│   │   └── graph.css         # Attack path canvas, node & edge visual styling
│   ├── data/
│   │   └── mockData.js       # Industrial dataset (Assets, Attack paths, Risks, Personas)
│   └── components/           # Component modules (Navbar, Dashboard, AttackPathMap, etc.)
```

---

## 📄 UX Design Rationale Summary

1. **Information Prioritization**: Placed Posture Score, Active Attack Paths, and Crown Jewel exposure above the fold to guarantee 5-second triage.
2. **Multi-Persona Alignment**: Persona switcher tailors views for executive CISO priorities vs. SOC/OT analyst evidence feeds.
3. **Preventing Visual Overload**: Structured network graphs into vertical Purdue swimlanes and offloaded detailed logs to the side panel.
4. **Data Uncertainty**: Added explicit banner warnings for degraded sensor coverage and telemetry confidence ratings.
