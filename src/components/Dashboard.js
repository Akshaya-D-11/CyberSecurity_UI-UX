/* ==========================================================================
   SURFACE A: MAIN DASHBOARD COMPONENT
   ========================================================================== */

import { mockData } from '../data/mockData.js';

export function renderDashboard(state, onNavigateToAttackPath, onSelectRisk) {
  const persona = mockData.personas[state.persona];
  const metrics = mockData.kpiMetrics[state.systemState] || mockData.kpiMetrics.normal;

  return `
    <div class="dashboard-grid">
      <!-- Persona Context Banner -->
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

      <!-- KPI Row (Answer 6 core questions in 5-10s) -->
      <div class="kpi-row">
        <!-- KPI 1: Environment Health Score -->
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

        <!-- KPI 2: Active Attack Paths -->
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

        <!-- KPI 3: Exposed Crown Jewel Assets -->
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

        <!-- KPI 4: Total Managed Assets -->
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

        <!-- KPI 5: Sensor Collection Health -->
        <div class="kpi-card" style="--card-accent: var(--color-degraded)">
          <div class="kpi-header">
            <span class="kpi-title">Sensor Health</span>
            <span class="badge ${state.systemState === 'degraded' ? 'critical' : 'low'}">LIVE</span>
          </div>
          <div class="kpi-value" style="font-size:22px;">${metrics.sensorCoverage}</div>
          <div class="kpi-subtext">
            <span>Data recency: 3s ago</span>
          </div>
        </div>
      </div>

      <!-- Row 2: High Risk Attack Path Preview + Risk Breakdown -->
      <div class="dashboard-row-2">
        <!-- Attack Path Quick Preview Card (High Priority) -->
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

          ${state.systemState === 'empty' ? `
            <div style="text-align:center; padding:40px; color: var(--color-text-secondary);">
              <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom:12px; color:var(--color-low);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <h3>No Active Attack Paths Detected</h3>
              <p style="font-size:12px; margin-top:4px;">All perimeter gateways and OT control loops are operating securely within baseline.</p>
            </div>
          ` : `
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="badge critical">CRITICAL EXPOSURE VECTOR</span>
                <span style="font-family:var(--font-mono); font-size:12px; color:var(--color-text-secondary);">PATH ID: AP-01 • CONFIDENCE: HIGH (94%)</span>
              </div>

              <!-- Flow Node Strip -->
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

        <!-- Purdue Model Zone Breakdown -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg class="card-title-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Purdue Model Asset Distribution
            </div>
          </div>

          <p style="font-size:12px; color:var(--color-text-secondary); margin-bottom:8px;">Assets segmented by operational level hierarchy:</p>
          
          <div class="purdue-bar">
            <div class="purdue-segment" style="width: 35%; background: var(--zone-enterprise);" title="Level 4 Enterprise: 420 assets"></div>
            <div class="purdue-segment" style="width: 10%; background: var(--zone-dmz);" title="Level 3.5 DMZ: 48 assets"></div>
            <div class="purdue-segment" style="width: 20%; background: var(--zone-operations);" title="Level 3 Ops: 185 assets"></div>
            <div class="purdue-segment" style="width: 22%; background: var(--zone-control);" title="Level 2 SCADA: 310 assets"></div>
            <div class="purdue-segment" style="width: 13%; background: var(--zone-safety);" title="Level 1/0 PLCs: 164 assets"></div>
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

      <!-- Row 3: Top Priority Unresolved Risks Table + Audit Stream -->
      <div class="dashboard-row-2">
        <!-- Top Unresolved Risks Table -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg class="card-title-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              High-Priority Unresolved Findings & Risks
            </div>
            <span style="font-size:12px; color:var(--color-text-muted);">Sorted by CVSS & Path Controllability</span>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Risk ID</th>
                  <th>Title & Description</th>
                  <th>Severity</th>
                  <th>Affected Zone</th>
                  <th>Target Asset</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.systemState === 'empty' ? `
                  <tr>
                    <td colspan="6" style="text-align:center; padding:20px; color:var(--color-text-muted);">No active security findings.</td>
                  </tr>
                ` : mockData.topRisks.map(r => `
                  <tr>
                    <td style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:var(--color-orange-primary);">${r.id}</td>
                    <td>
                      <div style="font-weight:600;">${r.title}</div>
                      <div style="font-size:11px; color:var(--color-text-muted);">${r.cve} • CVSS ${r.cvss}</div>
                    </td>
                    <td><span class="badge ${r.severity.toLowerCase()}">${r.severity}</span></td>
                    <td style="font-size:12px;">${r.zone}</td>
                    <td style="font-size:12px; font-weight:500;">${r.affectedAsset}</td>
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

        <!-- Audit Stream / Timeline -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg class="card-title-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Recent Change Timeline Stream
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
                <span class="badge ${item.severity.toLowerCase()}" style="font-size:9px; height:max-content;">${item.severity}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
