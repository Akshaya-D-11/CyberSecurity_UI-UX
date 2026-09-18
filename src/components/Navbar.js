/* ==========================================================================
   NAVBAR COMPONENT
   ========================================================================== */

import { mockData } from '../data/mockData.js';

export function renderNavbar(state, onTabChange, onPersonaChange, onStateChange, onSiteChange, onOpenRationale, onOpenTokens) {
  const currentPersona = mockData.personas[state.persona];
  const currentStateKey = state.systemState;

  return `
    <header class="navbar">
      <div class="nav-brand">
        <div class="brand-logo">A</div>
        <div class="brand-title">AETHER <span>OT</span></div>
      </div>

      <nav class="nav-tabs" aria-label="Main Navigation">
        <button class="nav-tab ${state.activeTab === 'dashboard' ? 'active' : ''}" id="tab-dashboard" data-tab="dashboard">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Surface A: Dashboard
        </button>

        <button class="nav-tab ${state.activeTab === 'attack-path' ? 'active' : ''}" id="tab-attack-path" data-tab="attack-path">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 8.5l7 7M18 6l-6 6"/></svg>
          Surface B: Attack Path Map
          ${state.systemState === 'highRisk' ? '<span class="badge critical" style="margin-left:4px; font-size:9px;">! CRITICAL</span>' : ''}
        </button>
      </nav>

      <div class="nav-controls">
        <!-- Site Filter -->
        <div class="control-group" title="Global Site Deployment Filter">
          <span class="control-label">Site:</span>
          <select id="select-site" class="select-input">
            ${mockData.sites.map(s => `<option value="${s.id}" ${state.site === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
          </select>
        </div>

        <!-- Persona Context Switcher -->
        <div class="control-group" title="Switch User Persona & Prioritization View">
          <span class="control-label">Persona:</span>
          <select id="select-persona" class="select-input" style="color: var(--color-orange-primary); font-weight:700;">
            <option value="ciso" ${state.persona === 'ciso' ? 'selected' : ''}>CISO / Leadership</option>
            <option value="soc" ${state.persona === 'soc' ? 'selected' : ''}>SOC Analyst</option>
            <option value="ot" ${state.persona === 'ot' ? 'selected' : ''}>OT Security Analyst</option>
            <option value="operator" ${state.persona === 'operator' ? 'selected' : ''}>Plant Operator</option>
          </select>
        </div>

        <!-- System State Simulator -->
        <div class="control-group" title="Simulate Product Functional States">
          <span class="control-label">State:</span>
          <select id="select-state" class="select-input">
            <option value="normal" ${state.systemState === 'normal' ? 'selected' : ''}>🟢 Normal State</option>
            <option value="highRisk" ${state.systemState === 'highRisk' ? 'selected' : ''}>🔴 High Risk Alert</option>
            <option value="degraded" ${state.systemState === 'degraded' ? 'selected' : ''}>🟣 Degraded Sensor Data</option>
            <option value="uncertain" ${state.systemState === 'uncertain' ? 'selected' : ''}>🟡 Uncertain / Low Data</option>
            <option value="empty" ${state.systemState === 'empty' ? 'selected' : ''}>⚪ Empty / Clean State</option>
          </select>
        </div>

        <!-- Action Modals CTA -->
        <button class="btn-icon-text" id="btn-rationale" title="Read candidate design rationale document">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          UX Rationale
        </button>

        <button class="btn-icon-text" id="btn-tokens" title="View design system tokens and accessibility guidelines">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20z"/></svg>
          Tokens
        </button>
      </div>
    </header>

    ${state.systemState === 'degraded' ? `
      <div class="banner-warning" role="alert">
        <div class="banner-warning-content">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span><strong>DEGRADED SENSOR VISIBILITY GAP:</strong> 3 OT packet collectors are offline (Houston L2, Tokyo L1). Security posture score and active attack path conclusions may be incomplete.</span>
        </div>
        <button class="btn-icon-text" id="btn-fix-sensors" style="padding:2px 8px; font-size:11px;">View Sensor Gap Details</button>
      </div>
    ` : ''}

    ${state.systemState === 'uncertain' ? `
      <div class="banner-warning" style="background: linear-gradient(90deg, #451A03, #78350F); border-color: var(--color-high); color: var(--color-high);" role="alert">
        <div class="banner-warning-content">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span><strong>UNCERTAIN DATA CONFIDENCE:</strong> Telemetry confidence is rated MEDIUM (65%) due to unverified third-party asset protocol headers.</span>
        </div>
      </div>
    ` : ''}
  `;
}
