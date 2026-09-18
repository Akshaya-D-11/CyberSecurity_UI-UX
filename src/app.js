/* ==========================================================================
   AETHER OT - BUNDLED SELF-CONTAINED APPLICATION (CORS & FILE:// COMPATIBLE)
   ========================================================================== */

(function() {
  'use strict';

  // ==========================================================================
  // 1. MOCK DATASET
  // ==========================================================================
  const mockData = {
    sites: [
      { id: 'all', name: 'Global All Sites (3 Plants)' },
      { id: 'houston', name: 'Plant 01 - Houston Refining' },
      { id: 'rotterdam', name: 'Plant 02 - Rotterdam Chemical' },
      { id: 'tokyo', name: 'Plant 03 - Tokyo Substation' }
    ],

    personas: {
      ciso: {
        id: 'ciso',
        name: 'Security Leadership / CISO',
        focus: 'High-level posture, business impact, compliance, & systemic risk trends',
        bannerText: 'Showing posture metrics, financial exposure estimate, and strategic attack path summaries.'
      },
      soc: {
        id: 'soc',
        name: 'SOC / Security Analyst',
        focus: 'Triage speed, alert evidence, cross-zone lateral movement, & active investigation',
        bannerText: 'Showing rapid triage layout, evidence log feeds, and active attack path traversal graph.'
      },
      ot: {
        id: 'ot',
        name: 'OT Security Analyst',
        focus: 'Asset inventory, industrial protocols (Modbus, OPC UA, S7Comm), & Purdue model zones',
        bannerText: 'Showing Purdue level hierarchy, ICS protocol distribution, and SCADA/PLC operational states.'
      },
      operator: {
        id: 'operator',
        name: 'Site / Plant Operator',
        focus: 'Operational safety, physical plant impact, affected controllers, & uptime status',
        bannerText: 'Showing affected physical loops, safety instrumented systems impact, and site-level alert flags.'
      }
    },

    purdueLevels: [
      { level: 4, name: 'Level 4: Enterprise IT', color: 'var(--zone-enterprise)', count: 420 },
      { level: 3.5, name: 'Level 3.5: Industrial DMZ', color: 'var(--zone-dmz)', count: 48 },
      { level: 3, name: 'Level 3: Plant Operations', color: 'var(--zone-operations)', count: 185 },
      { level: 2, name: 'Level 2: SCADA & HMI Control', color: 'var(--zone-control)', count: 310 },
      { level: 1, name: 'Level 1/0: PLCs & Safety (SIS)', color: 'var(--zone-safety)', count: 164 }
    ],

    kpiMetrics: {
      normal: { postureScore: 88, postureScoreStatus: 'HEALTHY', activePaths: 1, criticalAssetsExposed: 0, totalAssets: 1127, activeFindings: 14, sensorCoverage: '99.8%' },
      highRisk: { postureScore: 42, postureScoreStatus: 'CRITICAL', activePaths: 3, criticalAssetsExposed: 4, totalAssets: 1127, activeFindings: 58, sensorCoverage: '98.4%' },
      degraded: { postureScore: '--', postureScoreStatus: 'DEGRADED', activePaths: 2, criticalAssetsExposed: '2 (?)', totalAssets: 1127, activeFindings: 31, sensorCoverage: '64.2% (3 SENSORS OFFLINE)' },
      uncertain: { postureScore: 65, postureScoreStatus: 'UNCERTAIN', activePaths: 2, criticalAssetsExposed: 'Unknown', totalAssets: 1127, activeFindings: 22, sensorCoverage: '81.0%' },
      empty: { postureScore: 100, postureScoreStatus: 'NO ISSUES', activePaths: 0, criticalAssetsExposed: 0, totalAssets: 1127, activeFindings: 0, sensorCoverage: '100%' }
    },

    topRisks: [
      { id: 'RISK-801', title: 'Unauthenticated Modbus TCP Command Injection to Main Distillation PLC', severity: 'CRITICAL', zone: 'Purdue Level 1 (Control)', affectedAsset: 'Siemens S7-1500 (PLC-HOU-01)', cve: 'CVE-2024-38102', cvss: 9.8, pathAssociated: 'AP-01' },
      { id: 'RISK-802', title: 'Dual-Homed Jump Host IT/OT Boundary Firewall Rule Misconfiguration', severity: 'CRITICAL', zone: 'Level 3.5 DMZ', affectedAsset: 'DMZ Jump Station (JUMP-HOU-04)', cve: 'CVE-2023-4109', cvss: 9.1, pathAssociated: 'AP-01' },
      { id: 'RISK-803', title: 'OPC UA Server Buffer Overflow in Plant Historian Engine', severity: 'HIGH', zone: 'Level 3 Operations', affectedAsset: 'OPC Historian Server (HIST-02)', cve: 'CVE-2024-2190', cvss: 8.4, pathAssociated: 'AP-03' },
      { id: 'RISK-804', title: 'Third-Party Vendor Remote Access VPN Session Active Without MFA', severity: 'HIGH', zone: 'Level 4 Enterprise IT', affectedAsset: 'VPN Gateway (GW-EXT-01)', cve: 'POLICY-VIOLATION', cvss: 7.9, pathAssociated: 'AP-02' }
    ],

    attackPaths: [
      {
        id: 'AP-01',
        name: 'IT Boundary Breach -> SCADA HMI -> Main Siemens S7 PLC',
        severity: 'CRITICAL',
        confidence: 'HIGH (94%)',
        status: 'ACTIVE EXPOSURE',
        sourceAsset: 'External VPN Gateway (GW-EXT-01)',
        targetAsset: 'Distillation Process PLC (Siemens S7-1500)',
        estimatedTime: '< 15 mins traversal',
        impact: 'Physical refinery shutdown, pressure valve trip, safety override risk',
        nodes: [
          { id: 'node-1', name: 'GW-EXT-01', role: 'source', roleLabel: 'Entry / Exposure', type: 'VPN Gateway', ip: '192.168.10.4', zone: 'Level 4 Enterprise IT', purdueLevel: 4, criticality: 'MEDIUM', status: 'Exposed', cve: 'CVE-2024-21887', x: 60, y: 220 },
          { id: 'node-2', name: 'ENG-WORKSTATION-08', role: 'pivot', roleLabel: 'Intermediate Pivot', type: 'Windows Workstation', ip: '10.200.4.12', zone: 'Level 4 Enterprise IT', purdueLevel: 4, criticality: 'HIGH', status: 'Compromised Credentials', cve: 'CVE-2023-36884', x: 275, y: 220 },
          { id: 'node-3', name: 'JUMP-HOST-DMZ', role: 'pivot', roleLabel: 'DMZ Boundary Pivot', type: 'Dual-Homed Server', ip: '10.200.5.1', zone: 'Level 3.5 DMZ', purdueLevel: 3.5, criticality: 'HIGH', status: 'Unfiltered RDP Trust', cve: 'MISCONFIG-RULE', x: 485, y: 220 },
          { id: 'node-4', name: 'SCADA-MASTER-HMI', role: 'pivot', roleLabel: 'SCADA Master HMI', type: 'WinCC Operator HMI', ip: '172.16.2.100', zone: 'Level 2 SCADA Control', purdueLevel: 2, criticality: 'CRITICAL', status: 'Hardcoded Admin Token', cve: 'CVE-2023-4109', x: 695, y: 220 },
          { id: 'node-5', name: 'PLC-DISTILL-S71500', role: 'target', roleLabel: 'Crown Jewel Target', type: 'Siemens S7-1500 PLC', ip: '172.16.2.14', zone: 'Level 1 PLC & Safety', purdueLevel: 1, criticality: 'CRITICAL', status: 'Unauthenticated Modbus', cve: 'CVE-2024-38102', x: 910, y: 220 }
        ],
        edges: [
          { id: 'edge-1-2', source: 'node-1', target: 'node-2', protocol: 'SSH / Port 22', suspicious: true, reason: 'Unusual off-hours remote login from external VPN IP directly into internal engineering workstation.' },
          { id: 'edge-2-3', source: 'node-2', target: 'node-3', protocol: 'RDP / Port 3389', suspicious: true, reason: 'Cached domain admin token reused to establish desktop session across IT/DMZ boundary.' },
          { id: 'edge-3-4', source: 'node-3', target: 'node-4', protocol: 'OPC UA / Port 4840', suspicious: true, reason: 'DMZ jump host has unrestricted network access into Level 2 SCADA Master VLAN.' },
          { id: 'edge-4-5', source: 'node-4', target: 'node-5', protocol: 'S7Comm / Modbus TCP', suspicious: true, reason: 'Master HMI holds direct unauthenticated write permission to modify PLC logic and stop safety loops.' }
        ]
      },
      {
        id: 'AP-02',
        name: 'Vendor Maintenance Laptop -> Modbus Gateway -> Emerson Ovation Controller',
        severity: 'HIGH',
        confidence: 'MEDIUM (78%)',
        status: 'SUSPICIOUS TRAFFIC',
        sourceAsset: 'Vendor Maintenance Laptop (VENDOR-LAPTOP-02)',
        targetAsset: 'Turbine Controller (Emerson Ovation)',
        estimatedTime: '< 45 mins traversal',
        impact: 'Power generation loop trip, turbine frequency oscillation',
        nodes: [
          { id: 'node-10', name: 'VENDOR-LAPTOP-02', role: 'source', roleLabel: 'External Vendor Source', type: 'Cellular Modded Laptop', ip: '10.10.1.88', zone: 'Level 4 External', purdueLevel: 4, criticality: 'LOW', status: 'Bypassing Firewalls', cve: 'UNAUTHORIZED-ACCESS', x: 60, y: 350 },
          { id: 'node-11', name: 'MODBUS-GATEWAY-01', role: 'pivot', roleLabel: 'Protocol Gateway', type: 'Moxa MB3170 Gateway', ip: '172.16.3.1', zone: 'Level 2 Control', purdueLevel: 2, criticality: 'HIGH', status: 'Cleartext Passwords', cve: 'CVE-2022-2533', x: 695, y: 350 },
          { id: 'node-12', name: 'EMERSON-OVATION-PLC', role: 'target', roleLabel: 'Crown Jewel Controller', type: 'Emerson DCS Controller', ip: '172.16.3.50', zone: 'Level 1 Control', purdueLevel: 1, criticality: 'CRITICAL', status: 'Modbus Command Injected', cve: 'CVE-2023-1194', x: 910, y: 350 }
        ],
        edges: [
          { id: 'edge-10-11', source: 'node-10', target: 'node-11', protocol: 'Cellular / Modbus TCP', suspicious: true, reason: 'Vendor laptop plugged into cellular dongle bypassing corporate IT perimeter inspection.' },
          { id: 'edge-11-12', source: 'node-11', target: 'node-12', protocol: 'Serial / Modbus RTU', suspicious: true, reason: 'Moxa gateway translates inbound Modbus TCP directly to serial DCS bus without authorization check.' }
        ]
      }
    ],

    changeTimeline: [
      { id: 'EVT-109', time: '18:34:12', title: 'New Unidentified Asset Detected on Level 2 Control Subnet', desc: 'IP 172.16.2.189 sending ARP requests on Modbus TCP port 502.', severity: 'HIGH' },
      { id: 'EVT-108', time: '18:21:05', title: 'PLC Logic Write Operation Executed Outside Maintenance Window', desc: 'Siemens S7-1500 (PLC-HOU-01) ladder logic modified by 10.200.5.1.', severity: 'CRITICAL' },
      { id: 'EVT-107', time: '17:55:40', title: 'OT DMZ Sensor #03 Data Rate Drop Detected (Degraded State)', desc: 'Packet collection recency increased to > 45s. Mirror port saturation.', severity: 'DEGRADED' },
      { id: 'EVT-106', time: '17:10:15', title: 'Firewall Rule Modified on IT/OT Boundary Jump Host', desc: 'Port 3389 (RDP) opened from Enterprise IT subnet 10.200.4.0/24.', severity: 'HIGH' }
    ]
  };

  // ==========================================================================
  // 2. STATE MANAGER
  // ==========================================================================
  const appState = {
    activeTab: 'dashboard',
    persona: 'soc',
    systemState: 'highRisk',
    site: 'all',
    selectedPathId: 'AP-01',
    selectedNodeId: 'node-5',
    selectedEdgeId: null,
    sidePanelOpen: false,
    panelActiveTab: 'overview',
    showRationaleModal: false,
    showTokensModal: false,
    blastRadiusMode: false,
    pulseEdges: true,
    showLegend: true
  };

  // ==========================================================================
  // 3. RENDER FUNCTIONS
  // ==========================================================================
  function renderNavbar() {
    return `
      <header class="navbar">
        <div class="nav-brand">
          <div class="brand-logo">A</div>
          <div class="brand-title">AETHER <span>OT</span></div>
        </div>

        <nav class="nav-tabs" aria-label="Main Navigation">
          <button class="nav-tab ${appState.activeTab === 'dashboard' ? 'active' : ''}" id="tab-dashboard" data-tab="dashboard">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Surface A: Dashboard
          </button>

          <button class="nav-tab ${appState.activeTab === 'attack-path' ? 'active' : ''}" id="tab-attack-path" data-tab="attack-path">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 8.5l7 7M18 6l-6 6"/></svg>
            Surface B: Attack Path Map
            ${appState.systemState === 'highRisk' ? '<span class="badge critical" style="margin-left:4px; font-size:9px;">! CRITICAL</span>' : ''}
          </button>
        </nav>

        <div class="nav-controls">
          <div class="control-group">
            <span class="control-label">Site:</span>
            <select id="select-site" class="select-input">
              ${mockData.sites.map(s => `<option value="${s.id}" ${appState.site === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
          </div>

          <div class="control-group">
            <span class="control-label">Persona:</span>
            <select id="select-persona" class="select-input" style="color: var(--color-orange-primary); font-weight:700;">
              <option value="ciso" ${appState.persona === 'ciso' ? 'selected' : ''}>CISO / Leadership</option>
              <option value="soc" ${appState.persona === 'soc' ? 'selected' : ''}>SOC Analyst</option>
              <option value="ot" ${appState.persona === 'ot' ? 'selected' : ''}>OT Security Analyst</option>
              <option value="operator" ${appState.persona === 'operator' ? 'selected' : ''}>Plant Operator</option>
            </select>
          </div>

          <div class="control-group">
            <span class="control-label">State:</span>
            <select id="select-state" class="select-input">
              <option value="normal" ${appState.systemState === 'normal' ? 'selected' : ''}>🟢 Normal State</option>
              <option value="highRisk" ${appState.systemState === 'highRisk' ? 'selected' : ''}>🔴 High Risk Alert</option>
              <option value="degraded" ${appState.systemState === 'degraded' ? 'selected' : ''}>🟣 Degraded Sensor Data</option>
              <option value="uncertain" ${appState.systemState === 'uncertain' ? 'selected' : ''}>🟡 Uncertain / Low Data</option>
              <option value="empty" ${appState.systemState === 'empty' ? 'selected' : ''}>⚪ Empty / Clean State</option>
            </select>
          </div>

          <button class="btn-icon-text" id="btn-rationale">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            UX Rationale
          </button>

          <button class="btn-icon-text" id="btn-tokens">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20z"/></svg>
            Tokens
          </button>
        </div>
      </header>

      ${appState.systemState === 'degraded' ? `
        <div class="banner-warning" role="alert">
          <div class="banner-warning-content">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span><strong>DEGRADED SENSOR VISIBILITY GAP:</strong> 3 OT packet collectors are offline (Houston L2, Tokyo L1). Security posture score and active attack path conclusions may be incomplete.</span>
          </div>
        </div>
      ` : ''}

      ${appState.systemState === 'uncertain' ? `
        <div class="banner-warning" style="background: linear-gradient(90deg, #451A03, #78350F); border-color: var(--color-high); color: var(--color-high);" role="alert">
          <div class="banner-warning-content">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span><strong>UNCERTAIN DATA CONFIDENCE:</strong> Telemetry confidence is rated MEDIUM (65%) due to unverified third-party asset protocol headers.</span>
          </div>
        </div>
      ` : ''}
    `;
  }

  function renderDashboard() {
    const persona = mockData.personas[appState.persona];
    const metrics = mockData.kpiMetrics[appState.systemState] || mockData.kpiMetrics.normal;

    return `
      <div class="dashboard-grid">
        <div class="callout" style="display:flex; justify-content:space-between; align-items:center; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-left: 4px solid var(--color-orange-primary);">
          <div>
            <span style="color: var(--color-orange-primary); font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">ACTIVE VIEW PERSONA: ${persona.name}</span>
            <h3 style="font-size: 15px; margin-top: 2px;">${persona.focus}</h3>
            <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">${persona.bannerText}</p>
          </div>
          <div style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted); background: var(--color-bg-base); padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border-subtle);">
            5-10 SEC TRIAGE GUARANTEE ACTIVE
          </div>
        </div>

        <div class="kpi-row">
          <div class="kpi-card" style="--card-accent: ${metrics.postureScoreStatus === 'CRITICAL' ? 'var(--color-critical)' : 'var(--color-orange-primary)'}">
            <div class="kpi-header">
              <span class="kpi-title">Environment Posture Score</span>
              <span class="state-badge ${metrics.postureScoreStatus === 'CRITICAL' ? 'high-risk' : metrics.postureScoreStatus === 'DEGRADED' ? 'degraded' : 'normal'}">${metrics.postureScoreStatus}</span>
            </div>
            <div class="kpi-value">${metrics.postureScore}</div>
            <div class="kpi-subtext">
              <span class="trend-badge ${metrics.postureScoreStatus === 'CRITICAL' ? 'up-bad' : 'down-good'}">
                ${metrics.postureScoreStatus === 'CRITICAL' ? '▼ -46% Drop' : '▲ Healthy'}
              </span>
              <span>Target threshold: > 85/100</span>
            </div>
          </div>

          <div class="kpi-card" style="--card-accent: var(--color-critical)">
            <div class="kpi-header">
              <span class="kpi-title">Active Attack Paths</span>
              <svg width="18" height="18" fill="none" stroke="var(--color-critical)" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div class="kpi-value" style="color: ${metrics.activePaths > 0 ? 'var(--color-critical)' : 'var(--color-low)'}">
              ${metrics.activePaths}
            </div>
            <div class="kpi-subtext">
              <span class="badge ${metrics.activePaths > 0 ? 'critical' : 'low'}">
                ${metrics.activePaths > 0 ? 'URGENT INVESTIGATION' : 'No Valid Vectors'}
              </span>
            </div>
          </div>

          <div class="kpi-card" style="--card-accent: var(--color-high)">
            <div class="kpi-header">
              <span class="kpi-title">Exposed Crown Jewels</span>
              <svg width="18" height="18" fill="none" stroke="var(--color-high)" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <div class="kpi-value">${metrics.criticalAssetsExposed}</div>
            <div class="kpi-subtext">
              <span>PLCs & DCS Controllers in reachable path</span>
            </div>
          </div>

          <div class="kpi-card" style="--card-accent: var(--color-medium)">
            <div class="kpi-header">
              <span class="kpi-title">Managed OT/IT Assets</span>
              <svg width="18" height="18" fill="none" stroke="var(--color-medium)" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div class="kpi-value">${metrics.totalAssets}</div>
            <div class="kpi-subtext">
              <span>Across 4 Purdue Model Layers</span>
            </div>
          </div>

          <div class="kpi-card" style="--card-accent: var(--color-degraded)">
            <div class="kpi-header">
              <span class="kpi-title">Sensor Health</span>
              <span class="badge ${appState.systemState === 'degraded' ? 'critical' : 'low'}">LIVE</span>
            </div>
            <div class="kpi-value" style="font-size:22px;">${metrics.sensorCoverage}</div>
            <div class="kpi-subtext">
              <span>Data recency: 3s ago</span>
            </div>
          </div>
        </div>

        <div class="dashboard-row-2">
          <div class="card attack-path-preview-card">
            <div class="card-header">
              <div class="card-title">
                <svg class="card-title-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 8.5l7 7M18 6l-6 6"/></svg>
                #1 Priority Attack Traversal Preview
              </div>
              <button class="btn-icon-text btn-primary" id="btn-open-attack-map">
                Open Full Attack Workspace
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>

            ${appState.systemState === 'empty' ? `
              <div style="text-align:center; padding:40px; color: var(--color-text-secondary);">
                <h3>No Active Attack Paths Detected</h3>
                <p style="font-size:12px; margin-top:4px;">All perimeter gateways and OT control loops are operating securely within baseline.</p>
              </div>
            ` : `
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span class="badge critical">CRITICAL EXPOSURE VECTOR</span>
                  <span style="font-family:var(--font-mono); font-size:12px; color:var(--color-text-secondary);">PATH ID: AP-01 • CONFIDENCE: HIGH (94%)</span>
                </div>

                <div class="preview-graph-flow">
                  <div class="preview-node">
                    <div class="node-icon-box source">🌐</div>
                    <span style="font-weight:700; font-size:11px; margin-top:4px;">GW-EXT-01</span>
                    <span style="font-size:9px; color:var(--color-text-muted);">External VPN</span>
                  </div>

                  <div class="preview-edge"></div>

                  <div class="preview-node">
                    <div class="node-icon-box pivot">💻</div>
                    <span style="font-weight:700; font-size:11px; margin-top:4px;">ENG-WS-08</span>
                    <span style="font-size:9px; color:var(--color-text-muted);">IT Workstation</span>
                  </div>

                  <div class="preview-edge"></div>

                  <div class="preview-node">
                    <div class="node-icon-box pivot">🖥️</div>
                    <span style="font-weight:700; font-size:11px; margin-top:4px;">SCADA-HMI</span>
                    <span style="font-size:9px; color:var(--color-text-muted);">Level 2 Master</span>
                  </div>

                  <div class="preview-edge"></div>

                  <div class="preview-node">
                    <div class="node-icon-box target">⚡</div>
                    <span style="font-weight:700; font-size:11px; margin-top:4px; color:var(--color-critical);">S7-1500 PLC</span>
                    <span style="font-size:9px; color:var(--color-critical);">Crown Jewel</span>
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; font-size:12px; background:var(--color-bg-base); padding:10px 14px; border-radius:6px;">
                  <span><strong>Impact:</strong> Physical refinery shutdown, main pressure valve override risk</span>
                  <span style="color:var(--color-orange-primary); font-weight:600;">Traversal speed: < 15 minutes</span>
                </div>
              </div>
            `}
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <svg class="card-title-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                Purdue Model Asset Distribution
              </div>
            </div>

            <div class="purdue-bar">
              <div class="purdue-segment" style="width: 35%; background: var(--zone-enterprise);"></div>
              <div class="purdue-segment" style="width: 10%; background: var(--zone-dmz);"></div>
              <div class="purdue-segment" style="width: 20%; background: var(--zone-operations);"></div>
              <div class="purdue-segment" style="width: 22%; background: var(--zone-control);"></div>
              <div class="purdue-segment" style="width: 13%; background: var(--zone-safety);"></div>
            </div>

            <div class="purdue-legend">
              ${mockData.purdueLevels.map(lvl => `
                <div class="legend-item">
                  <div class="legend-color-dot" style="background: ${lvl.color}"></div>
                  <span>${lvl.name} (<strong>${lvl.count}</strong>)</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="dashboard-row-2">
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <svg class="card-title-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                High-Priority Unresolved Findings & Risks
              </div>
            </div>

            <div class="data-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Risk ID</th>
                    <th>Title</th>
                    <th>Severity</th>
                    <th>Zone</th>
                    <th>Asset</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${appState.systemState === 'empty' ? `
                    <tr><td colspan="6" style="text-align:center; padding:20px;">No active findings.</td></tr>
                  ` : mockData.topRisks.map(r => `
                    <tr>
                      <td style="font-family:var(--font-mono); font-weight:700; color:var(--color-orange-primary);">${r.id}</td>
                      <td><strong>${r.title}</strong><br><span style="font-size:11px; color:var(--color-text-muted);">${r.cve} • CVSS ${r.cvss}</span></td>
                      <td><span class="badge ${r.severity.toLowerCase()}">${r.severity}</span></td>
                      <td>${r.zone}</td>
                      <td>${r.affectedAsset}</td>
                      <td>
                        <button class="btn-icon-text btn-inspect-risk" data-risk-id="${r.id}" style="padding:4px 8px; font-size:11px;">
                          Investigate
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <svg class="card-title-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Recent Change Stream
              </div>
            </div>

            <div class="timeline-list">
              ${mockData.changeTimeline.map(item => `
                <div class="timeline-item">
                  <span class="timeline-time">${item.time}</span>
                  <div class="timeline-content">
                    <div class="timeline-title">${item.title}</div>
                    <div class="timeline-desc">${item.desc}</div>
                  </div>
                  <span class="badge ${item.severity.toLowerCase()}" style="font-size:9px;">${item.severity}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAttackPathMap() {
    const currentPath = mockData.attackPaths.find(p => p.id === appState.selectedPathId) || mockData.attackPaths[0];

    return `
      <div class="graph-workspace" id="graph-workspace-container">
        <div class="graph-controls-bar">
          <div style="display:flex; align-items:center; gap:6px;">
            <span class="control-label">Path Vector:</span>
            <select id="select-active-path" class="select-input" style="font-weight:700; color:var(--color-orange-primary);">
              ${mockData.attackPaths.map(p => `
                <option value="${p.id}" ${p.id === currentPath.id ? 'selected' : ''}>
                  ${p.id}: ${p.name} (${p.severity})
                </option>
              `).join('')}
            </select>
          </div>

          <div class="toolbar-divider"></div>

          <button class="toolbar-btn ${appState.blastRadiusMode ? 'active' : ''}" id="btn-blast-radius" title="Toggle Blast Radius">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>
            <span style="font-size:10px; margin-left:4px; font-weight:700;">Blast Radius</span>
          </button>

          <button class="toolbar-btn ${appState.pulseEdges ? 'active' : ''}" id="btn-pulse-traffic" title="Toggle Traffic Pulse">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span style="font-size:10px; margin-left:4px; font-weight:700;">Traffic Pulse</span>
          </button>
        </div>

        <svg class="graph-svg-canvas" viewBox="0 0 1120 540" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" class="graph-grid-pattern" />
            </pattern>
            <marker id="arrow-critical" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-critical)" />
            </marker>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          <g class="zone-swimlanes">
            <rect x="30" y="100" width="200" height="380" class="zone-band" />
            <text x="130" y="125" text-anchor="middle" class="zone-label">Level 4: Enterprise IT</text>
            <rect x="250" y="100" width="190" height="380" class="zone-band" />
            <text x="345" y="125" text-anchor="middle" class="zone-label">Level 3.5: Industrial DMZ</text>
            <rect x="460" y="100" width="190" height="380" class="zone-band" />
            <text x="555" y="125" text-anchor="middle" class="zone-label">Level 3: Plant Operations</text>
            <rect x="670" y="100" width="190" height="380" class="zone-band" />
            <text x="765" y="125" text-anchor="middle" class="zone-label">Level 2: SCADA Control</text>
            <rect x="880" y="100" width="200" height="380" class="zone-band" />
            <text x="980" y="125" text-anchor="middle" class="zone-label">Level 1: PLCs & Safety (SIS)</text>
          </g>

          <g class="edges-layer">
            ${currentPath.edges.map(edge => {
              const srcNode = currentPath.nodes.find(n => n.id === edge.source);
              const tgtNode = currentPath.nodes.find(n => n.id === edge.target);
              if (!srcNode || !tgtNode) return '';

              const isSelected = appState.selectedEdgeId === edge.id;
              const pulseClass = appState.pulseEdges ? 'pulse' : '';
              
              const srcX = srcNode.x + 140;
              const srcY = srcNode.y + 35;
              const tgtX = tgtNode.x;
              const tgtY = tgtNode.y + 35;

              const midX = (srcX + tgtX) / 2;
              const midY = (srcY + tgtY) / 2;

              return `
                <g class="edge-group" data-edge-id="${edge.id}" style="cursor:pointer;">
                  <path d="M ${srcX} ${srcY} L ${tgtX} ${tgtY}" 
                        class="graph-edge critical-path ${isSelected ? 'selected' : ''} ${pulseClass}"
                        marker-end="url(#arrow-critical)" />
                  <rect x="${midX - 42}" y="${midY - 11}" width="84" height="22" rx="4" fill="var(--color-bg-base)" stroke="var(--color-orange-primary)" stroke-width="1.2" />
                  <text x="${midX}" y="${midY + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--color-orange-primary)">${edge.protocol}</text>
                </g>
              `;
            }).join('')}
          </g>

          <g class="nodes-layer">
            ${currentPath.nodes.map(node => {
              const isSelected = appState.selectedNodeId === node.id;
              const isBlast = appState.blastRadiusMode && (node.role === 'pivot' || node.role === 'target');
              let roleColor = node.role === 'target' ? 'var(--color-critical)' : node.role === 'source' ? 'var(--color-high)' : 'var(--color-orange-primary)';

              return `
                <g class="graph-node ${node.role} ${isSelected ? 'selected' : ''} ${isBlast ? 'blast-radius' : ''}" 
                   data-node-id="${node.id}" transform="translate(${node.x}, ${node.y})">
                  <rect class="node-card-rect" width="140" height="70" />
                  <rect x="8" y="8" width="26" height="26" rx="4" fill="${roleColor}" fill-opacity="0.2" stroke="${roleColor}" />
                  <text x="21" y="25" text-anchor="middle" font-size="13" fill="${roleColor}">
                    ${node.role === 'target' ? '⚡' : node.role === 'source' ? '🌐' : '💻'}
                  </text>
                  <text x="40" y="21" class="node-text-title">${node.name}</text>
                  <text x="40" y="33" class="node-text-sub">${node.ip}</text>
                  <rect x="8" y="46" width="124" height="16" rx="3" fill="rgba(0,0,0,0.5)" />
                  <text x="70" y="58" text-anchor="middle" class="node-role-badge" fill="${roleColor}">${node.roleLabel}</text>
                </g>
              `;
            }).join('')}
          </g>
        </svg>

        <div style="position:absolute; bottom:16px; left:50%; transform:translateX(-50%); background:rgba(14, 19, 31, 0.95); border:1px solid var(--color-border-medium); border-radius:12px; padding:10px 20px; display:flex; align-items:center; gap:24px;">
          <div>
            <span style="font-size:10px; color:var(--color-text-muted); font-weight:700;">CURRENT PATH VECTOR:</span>
            <div style="font-weight:700; font-size:13px;">${currentPath.name}</div>
          </div>
          <button class="btn-icon-text btn-primary" id="btn-inspect-current-path">Inspect Evidence Path</button>
        </div>
      </div>
    `;
  }

  function renderSidePanel() {
    if (!appState.sidePanelOpen) return `<div class="side-panel"></div>`;

    const currentPath = mockData.attackPaths.find(p => p.id === appState.selectedPathId) || mockData.attackPaths[0];
    const selectedNode = currentPath.nodes.find(n => n.id === appState.selectedNodeId) || currentPath.nodes[0];
    const selectedEdge = currentPath.edges.find(e => e.id === appState.selectedEdgeId);

    let title = selectedEdge ? `Edge: ${selectedEdge.protocol}` : `Asset: ${selectedNode.name}`;
    let subTitle = selectedEdge ? `Relationship Traversal` : `${selectedNode.type} • IP: ${selectedNode.ip}`;

    return `
      <div class="side-panel open">
        <div class="panel-header">
          <div>
            <span class="badge ${selectedNode.criticality ? selectedNode.criticality.toLowerCase() : 'high'}">${selectedNode.criticality || 'CRITICAL'} SEVERITY</span>
            <h2 class="panel-title" style="margin-top:4px;">${title}</h2>
            <p style="font-size:12px; color:var(--color-text-secondary);">${subTitle}</p>
          </div>
          <button id="btn-close-sidepanel" style="font-size:18px; color:var(--color-text-muted); background:none; border:none; cursor:pointer;">✕</button>
        </div>

        <div class="panel-tabs">
          <button class="panel-tab ${appState.panelActiveTab === 'overview' ? 'active' : ''}" data-panel-tab="overview">Overview</button>
          <button class="panel-tab ${appState.panelActiveTab === 'evidence' ? 'active' : ''}" data-panel-tab="evidence">Evidence & Logs</button>
          <button class="panel-tab ${appState.panelActiveTab === 'vulnerabilities' ? 'active' : ''}" data-panel-tab="vulnerabilities">CVEs</button>
          <button class="panel-tab ${appState.panelActiveTab === 'mitigation' ? 'active' : ''}" data-panel-tab="mitigation">Mitigations</button>
        </div>

        <div class="panel-body">
          ${appState.panelActiveTab === 'overview' ? `
            <div>
              <h4 style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase;">Why It Matters</h4>
              <p style="font-size:13px; margin-top:4px;">
                ${selectedEdge ? selectedEdge.reason : `This asset sits directly in the active propagation vector targeting the ${currentPath.targetAsset}. A compromise here permits lateral movement across the IT/OT boundary.`}
              </p>
            </div>
            <div style="background:var(--color-bg-base); padding:14px; border-radius:8px; border:1px solid var(--color-border-subtle);">
              <h4 style="font-size:12px; color:var(--color-orange-primary); font-weight:700;">Asset & Zone Context</h4>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px; font-size:12px;">
                <div><span style="color:var(--color-text-muted);">Purdue Zone:</span><br><strong>${selectedNode.zone}</strong></div>
                <div><span style="color:var(--color-text-muted);">Operational State:</span><br><strong>${selectedNode.status}</strong></div>
              </div>
            </div>
          ` : ''}

          ${appState.panelActiveTab === 'evidence' ? `
            <div style="font-family:var(--font-mono); font-size:11px; background:var(--color-bg-base); padding:12px; border-radius:6px; color:#A7F3D0;">
[18:34:12 UTC] MODBUS_TCP_INJECT: Packet from 10.200.5.1 -> 172.16.2.14:502
[18:34:12 UTC] Function Code 0x06 (Write Single Register) Address: 0x0040 Value: 0xFFFF
[18:34:13 UTC] WARN: PLC logic memory boundary anomaly detected on Siemens S7-1500!
            </div>
          ` : ''}

          ${appState.panelActiveTab === 'vulnerabilities' ? `
            <div style="background:var(--color-bg-base); padding:12px; border-radius:6px; border-left:3px solid var(--color-critical);">
              <div style="font-weight:700; color:var(--color-critical);">${selectedNode.cve} • CVSS 9.8</div>
              <div style="font-size:12px; margin-top:4px;">Unauthenticated Remote Code Execution & Command Injection in Control Firmware.</div>
            </div>
          ` : ''}

          ${appState.panelActiveTab === 'mitigation' ? `
            <ol style="font-size:12px; padding-left:16px;">
              <li><strong>Isolate Boundary Port:</strong> Block TCP 502 & 4840 on DMZ Firewall.</li>
              <li><strong>Enforce PLC Key Switch:</strong> Turn physical key switch to RUN.</li>
            </ol>
          ` : ''}
        </div>

        <div class="panel-footer">
          <button class="btn-icon-text btn-primary" id="btn-action-mitigate" style="flex:1;">Execute Playbook</button>
          <button class="btn-icon-text" id="btn-action-assign" style="flex:1;">Assign SOC Triage</button>
        </div>
      </div>
    `;
  }

  function renderRationaleModal() {
    if (!appState.showRationaleModal) return '';
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">Candidate Design Rationale — Industrial Cybersecurity Platform</div>
            <button id="btn-close-rationale-modal" style="font-size:20px; color:#FFF; background:none; border:none; cursor:pointer;">✕</button>
          </div>
          <div class="modal-body">
            <h3 style="color:var(--color-orange-primary);">1. Information Prioritization & 5-10 Second Triage</h3>
            <p>Prioritized Posture Score, Active Attack Paths, and Crown Jewel exposure at the top so analysts answer system health within 5 seconds.</p>
            <h3 style="color:var(--color-orange-primary); margin-top:16px;">2. Multi-Persona Support</h3>
            <p>Explicit persona context switcher for CISO, SOC Analyst, OT Security Specialist, and Plant Operator.</p>
            <h3 style="color:var(--color-orange-primary); margin-top:16px;">3. Graph Overload Prevention</h3>
            <p>Purdue zone swimlanes and offloading evidence logs to the slide-out investigation panel.</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderDesignTokensModal() {
    if (!appState.showTokensModal) return '';
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">Design Tokens & Accessibility Standard</div>
            <button id="btn-close-tokens-modal" style="font-size:20px; color:#FFF; background:none; border:none; cursor:pointer;">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:flex; gap:12px;">
              <div style="background:#FF6B00; color:#000; padding:12px; border-radius:6px; font-weight:700;">Orange (#FF6B00)</div>
              <div style="background:#080B10; color:#FFF; padding:12px; border-radius:6px; font-weight:700;">Dark (#080B10)</div>
              <div style="background:#F8FAFC; color:#000; padding:12px; border-radius:6px; font-weight:700;">White (#F8FAFC)</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderApp() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    appContainer.innerHTML = `
      ${renderNavbar()}
      <main class="workspace-container">
        ${appState.activeTab === 'dashboard' ? renderDashboard() : renderAttackPathMap()}
        ${renderSidePanel()}
      </main>
      ${renderRationaleModal()}
      ${renderDesignTokensModal()}
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        appState.activeTab = e.currentTarget.getAttribute('data-tab');
        renderApp();
      });
    });

    const selectPersona = document.getElementById('select-persona');
    if (selectPersona) selectPersona.addEventListener('change', (e) => { appState.persona = e.target.value; renderApp(); });

    const selectState = document.getElementById('select-state');
    if (selectState) selectState.addEventListener('change', (e) => { appState.systemState = e.target.value; renderApp(); });

    const btnRationale = document.getElementById('btn-rationale');
    if (btnRationale) btnRationale.addEventListener('click', () => { appState.showRationaleModal = true; renderApp(); });

    const btnCloseRationale = document.getElementById('btn-close-rationale-modal');
    if (btnCloseRationale) btnCloseRationale.addEventListener('click', () => { appState.showRationaleModal = false; renderApp(); });

    const btnTokens = document.getElementById('btn-tokens');
    if (btnTokens) btnTokens.addEventListener('click', () => { appState.showTokensModal = true; renderApp(); });

    const btnCloseTokens = document.getElementById('btn-close-tokens-modal');
    if (btnCloseTokens) btnCloseTokens.addEventListener('click', () => { appState.showTokensModal = false; renderApp(); });

    const btnOpenAttackMap = document.getElementById('btn-open-attack-map');
    if (btnOpenAttackMap) btnOpenAttackMap.addEventListener('click', () => { appState.activeTab = 'attack-path'; appState.selectedPathId = 'AP-01'; renderApp(); });

    document.querySelectorAll('.btn-inspect-risk').forEach(btn => {
      btn.addEventListener('click', () => {
        appState.activeTab = 'attack-path';
        appState.sidePanelOpen = true;
        renderApp();
      });
    });

    document.querySelectorAll('.graph-node').forEach(nodeElem => {
      nodeElem.addEventListener('click', (e) => {
        appState.selectedNodeId = e.currentTarget.getAttribute('data-node-id');
        appState.selectedEdgeId = null;
        appState.sidePanelOpen = true;
        renderApp();
      });
    });

    document.querySelectorAll('.edge-group').forEach(edgeElem => {
      edgeElem.addEventListener('click', (e) => {
        appState.selectedEdgeId = e.currentTarget.getAttribute('data-edge-id');
        appState.sidePanelOpen = true;
        renderApp();
      });
    });

    const btnCloseSidepanel = document.getElementById('btn-close-sidepanel');
    if (btnCloseSidepanel) btnCloseSidepanel.addEventListener('click', () => { appState.sidePanelOpen = false; renderApp(); });

    document.querySelectorAll('.panel-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        appState.panelActiveTab = e.currentTarget.getAttribute('data-panel-tab');
        renderApp();
      });
    });

    const btnActionMitigate = document.getElementById('btn-action-mitigate');
    if (btnActionMitigate) btnActionMitigate.addEventListener('click', () => {
      alert('🔒 Isolation Playbook Executed: Firewall rule applied to isolate selected asset trajectory.');
      appState.systemState = 'normal';
      appState.sidePanelOpen = false;
      renderApp();
    });

    const btnActionAssign = document.getElementById('btn-action-assign');
    if (btnActionAssign) btnActionAssign.addEventListener('click', () => { alert('📋 Assigned to SOC Triage queue.'); });
  }

  // Boot App
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();
