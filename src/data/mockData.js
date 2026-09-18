/* ==========================================================================
   MOCK DATASET FOR INDUSTRIAL CYBERSECURITY PLATFORM (AETHER OT)
   ========================================================================== */

export const mockData = {
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
      targetCrownJewel: true,
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
      targetCrownJewel: true,
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
