/* ==========================================================================
   SIDE INVESTIGATION PANEL COMPONENT
   ========================================================================== */

import { mockData } from '../data/mockData.js';

export function renderSidePanel(isOpen, activeTab, selectedNodeId, selectedEdgeId, selectedPathId, onClose, onPanelTabChange) {
  if (!isOpen) {
    return `<div class="side-panel"></div>`;
  }

  const currentPath = mockData.attackPaths.find(p => p.id === (selectedPathId || 'AP-01')) || mockData.attackPaths[0];
  const selectedNode = currentPath.nodes.find(n => n.id === selectedNodeId) || currentPath.nodes[0];
  const selectedEdge = currentPath.edges.find(e => e.id === selectedEdgeId);

  let title = selectedEdge ? `Edge: ${selectedEdge.protocol}` : `Asset: ${selectedNode.name}`;
  let subTitle = selectedEdge ? `Relationship Traversal` : `${selectedNode.type} • IP: ${selectedNode.ip}`;

  return `
    <div class="side-panel open">
      <!-- Panel Header -->
      <div class="panel-header">
        <div>
          <span class="badge ${selectedNode.criticality ? selectedNode.criticality.toLowerCase() : 'high'}">${selectedNode.criticality || 'CRITICAL'} SEVERITY</span>
          <h2 class="panel-title" style="margin-top:4px;">${title}</h2>
          <p style="font-size:12px; color:var(--color-text-secondary);">${subTitle}</p>
        </div>
        <button id="btn-close-sidepanel" style="font-size:18px; color:var(--color-text-muted); background:none; border:none; cursor:pointer;">✕</button>
      </div>

      <!-- Panel Navigation Tabs -->
      <div class="panel-tabs">
        <button class="panel-tab ${activeTab === 'overview' ? 'active' : ''}" data-panel-tab="overview">Overview</button>
        <button class="panel-tab ${activeTab === 'evidence' ? 'active' : ''}" data-panel-tab="evidence">Evidence & Logs</button>
        <button class="panel-tab ${activeTab === 'vulnerabilities' ? 'active' : ''}" data-panel-tab="vulnerabilities">CVEs & Weaknesses</button>
        <button class="panel-tab ${activeTab === 'mitigation' ? 'active' : ''}" data-panel-tab="mitigation">Mitigations</button>
      </div>

      <!-- Panel Content Body -->
      <div class="panel-body">
        ${activeTab === 'overview' ? `
          <div>
            <h4 style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase;">Why It Matters</h4>
            <p style="font-size:13px; color:var(--color-text-primary); margin-top:4px; line-height:1.5;">
              ${selectedEdge ? selectedEdge.reason : `This asset sits directly in the active propagation vector targeting the ${currentPath.targetAsset}. A compromise here permits lateral movement across the IT/OT boundary.`}
            </p>
          </div>

          <div style="background:var(--color-bg-base); border:1px solid var(--color-border-subtle); padding:14px; border-radius:8px;">
            <h4 style="font-size:12px; color:var(--color-orange-primary); font-weight:700;">Asset & Zone Context</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px; font-size:12px;">
              <div><span style="color:var(--color-text-muted);">Purdue Zone:</span><br><strong>${selectedNode.zone}</strong></div>
              <div><span style="color:var(--color-text-muted);">Purdue Level:</span><br><strong>Level ${selectedNode.purdueLevel}</strong></div>
              <div><span style="color:var(--color-text-muted);">Operational State:</span><br><strong>${selectedNode.status}</strong></div>
              <div><span style="color:var(--color-text-muted);">Path Role:</span><br><strong style="color:var(--color-orange-primary);">${selectedNode.roleLabel}</strong></div>
            </div>
          </div>

          <div>
            <h4 style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase;">Associated Attack Traversal Vector</h4>
            <div style="font-size:12px; font-weight:600; color:var(--color-text-primary); margin-top:4px;">
              ${currentPath.name}
            </div>
            <div style="font-size:11px; color:var(--color-text-secondary); margin-top:2px;">
              Traverses 5 zones • Confidence: ${currentPath.confidence}
            </div>
          </div>
        ` : ''}

        ${activeTab === 'evidence' ? `
          <div>
            <h4 style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase;">Observed Traffic & Log Trace</h4>
            <div style="font-family:var(--font-mono); font-size:11px; background:var(--color-bg-base); padding:12px; border-radius:6px; border:1px solid var(--color-border-subtle); margin-top:6px; white-space:pre-wrap; color:#A7F3D0;">
[18:34:12 UTC] MODBUS_TCP_INJECT: Packet from 10.200.5.1 -> 172.16.2.14:502
[18:34:12 UTC] Function Code 0x06 (Write Single Register) Address: 0x0040 Value: 0xFFFF
[18:34:13 UTC] WARN: PLC logic memory boundary anomaly detected on Siemens S7-1500!
[18:34:15 UTC] S7COMM_TRUST: Active unauthenticated Session ID #9914 opened by WinCC Master.
            </div>
          </div>
          <div>
            <span style="font-size:11px; color:var(--color-text-muted);">Data Source Sensor: OT-Sensor-Houston-Refinery-L2 (Confidence 98.4%)</span>
          </div>
        ` : ''}

        ${activeTab === 'vulnerabilities' ? `
          <div>
            <h4 style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase;">Detected Vulnerabilities</h4>
            <div style="margin-top:8px; display:flex; flex-direction:column; gap:10px;">
              <div style="background:var(--color-bg-base); padding:12px; border-radius:6px; border-left:3px solid var(--color-critical);">
                <div style="display:flex; justify-space-between; font-weight:700; font-size:12px; color:var(--color-critical);">
                  <span>${selectedNode.cve}</span>
                  <span>CVSS 9.8</span>
                </div>
                <div style="font-size:12px; margin-top:4px;">Unauthenticated Remote Code Execution & Command Injection in Control Firmware.</div>
              </div>
            </div>
          </div>
        ` : ''}

        ${activeTab === 'mitigation' ? `
          <div>
            <h4 style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase;">Recommended Mitigation Playbook</h4>
            <ol style="font-size:12px; padding-left:16px; margin-top:8px; display:flex; flex-direction:column; gap:8px;">
              <li><strong>Isolate Boundary Port:</strong> Block TCP 502 & 4840 on DMZ Firewall (GW-JUMP-HOU).</li>
              <li><strong>Enforce PLC Key Switch:</strong> Turn physical Siemens S7-1500 key switch from RUN-P to RUN (Disable Remote Programming).</li>
              <li><strong>Revoke Stolen Credentials:</strong> Reset Active Directory Admin token for Workstation 10.200.4.12.</li>
            </ol>
          </div>
        ` : ''}
      </div>

      <!-- Panel Footer Actions -->
      <div class="panel-footer">
        <button class="btn-icon-text btn-primary" id="btn-action-mitigate" style="flex:1;">
          Execute Isolation Playbook
        </button>
        <button class="btn-icon-text" id="btn-action-assign" style="flex:1;">
          Assign to SOC Triage
        </button>
      </div>
    </div>
  `;
}
