/* ==========================================================================
   AETHER OT - MAIN APPLICATION STATE & ENTRY MANAGER
   ========================================================================== */

import { renderNavbar } from './components/Navbar.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderAttackPathMap } from './components/AttackPathMap.js';
import { renderSidePanel } from './components/SidePanel.js';
import { renderRationaleModal } from './components/RationaleModal.js';
import { renderDesignTokensModal } from './components/DesignTokensModal.js';

// Global Reactive State
const appState = {
  activeTab: 'dashboard',         // 'dashboard' | 'attack-path'
  persona: 'soc',                 // 'ciso' | 'soc' | 'ot' | 'operator'
  systemState: 'highRisk',        // 'normal' | 'highRisk' | 'degraded' | 'uncertain' | 'empty'
  site: 'all',                    // 'all' | 'houston' | 'rotterdam' | 'tokyo'
  
  selectedPathId: 'AP-01',
  selectedNodeId: 'node-5',       // Default selected crown jewel node
  selectedEdgeId: null,

  sidePanelOpen: false,
  panelActiveTab: 'overview',     // 'overview' | 'evidence' | 'vulnerabilities' | 'mitigation'

  showRationaleModal: false,
  showTokensModal: false,

  blastRadiusMode: false,
  pulseEdges: true,
  showLegend: true
};

// Main Render Loop
function renderApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.innerHTML = `
    ${renderNavbar(appState)}

    <main class="workspace-container">
      ${appState.activeTab === 'dashboard' 
        ? renderDashboard(appState) 
        : renderAttackPathMap(appState, appState.selectedPathId, appState.selectedNodeId, appState.selectedEdgeId)
      }

      ${renderSidePanel(
        appState.sidePanelOpen, 
        appState.panelActiveTab, 
        appState.selectedNodeId, 
        appState.selectedEdgeId, 
        appState.selectedPathId
      )}
    </main>

    ${renderRationaleModal(appState.showRationaleModal)}
    ${renderDesignTokensModal(appState.showTokensModal)}
  `;

  attachEventListeners();
}

// Event Binding Engine
function attachEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab');
      if (targetTab) {
        appState.activeTab = targetTab;
        renderApp();
      }
    });
  });

  // Persona Switcher
  const selectPersona = document.getElementById('select-persona');
  if (selectPersona) {
    selectPersona.addEventListener('change', (e) => {
      appState.persona = e.target.value;
      renderApp();
    });
  }

  // System State Switcher
  const selectState = document.getElementById('select-state');
  if (selectState) {
    selectState.addEventListener('change', (e) => {
      appState.systemState = e.target.value;
      renderApp();
    });
  }

  // Site Filter Switcher
  const selectSite = document.getElementById('select-site');
  if (selectSite) {
    selectSite.addEventListener('change', (e) => {
      appState.site = e.target.value;
      renderApp();
    });
  }

  // Rationale Modal Toggle
  const btnRationale = document.getElementById('btn-rationale');
  if (btnRationale) {
    btnRationale.addEventListener('click', () => {
      appState.showRationaleModal = true;
      renderApp();
    });
  }

  const btnCloseRationale = document.getElementById('btn-close-rationale-modal');
  if (btnCloseRationale) {
    btnCloseRationale.addEventListener('click', () => {
      appState.showRationaleModal = false;
      renderApp();
    });
  }

  // Design Tokens Modal Toggle
  const btnTokens = document.getElementById('btn-tokens');
  if (btnTokens) {
    btnTokens.addEventListener('click', () => {
      appState.showTokensModal = true;
      renderApp();
    });
  }

  const btnCloseTokens = document.getElementById('btn-close-tokens-modal');
  if (btnCloseTokens) {
    btnCloseTokens.addEventListener('click', () => {
      appState.showTokensModal = false;
      renderApp();
    });
  }

  // Open Full Attack Workspace CTA from Dashboard
  const btnOpenAttackMap = document.getElementById('btn-open-attack-map');
  if (btnOpenAttackMap) {
    btnOpenAttackMap.addEventListener('click', () => {
      appState.activeTab = 'attack-path';
      appState.selectedPathId = 'AP-01';
      renderApp();
    });
  }

  // Investigate Specific Risk from Dashboard Table
  document.querySelectorAll('.btn-inspect-risk').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const riskId = e.currentTarget.getAttribute('data-risk-id');
      appState.activeTab = 'attack-path';
      appState.selectedPathId = 'AP-01';
      appState.sidePanelOpen = true;
      renderApp();
    });
  });

  // Graph Node Clicks
  document.querySelectorAll('.graph-node').forEach(nodeElem => {
    nodeElem.addEventListener('click', (e) => {
      const nodeId = e.currentTarget.getAttribute('data-node-id');
      if (nodeId) {
        appState.selectedNodeId = nodeId;
        appState.selectedEdgeId = null;
        appState.sidePanelOpen = true;
        renderApp();
      }
    });
  });

  // Graph Edge Clicks
  document.querySelectorAll('.edge-group').forEach(edgeElem => {
    edgeElem.addEventListener('click', (e) => {
      const edgeId = e.currentTarget.getAttribute('data-edge-id');
      if (edgeId) {
        appState.selectedEdgeId = edgeId;
        appState.sidePanelOpen = true;
        renderApp();
      }
    });
  });

  // Active Path Vector Dropdown in Graph View
  const selectActivePath = document.getElementById('select-active-path');
  if (selectActivePath) {
    selectActivePath.addEventListener('change', (e) => {
      appState.selectedPathId = e.target.value;
      appState.selectedNodeId = e.target.value === 'AP-01' ? 'node-5' : 'node-12';
      renderApp();
    });
  }

  // Graph Toolbar Toggles
  const btnBlastRadius = document.getElementById('btn-blast-radius');
  if (btnBlastRadius) {
    btnBlastRadius.addEventListener('click', () => {
      appState.blastRadiusMode = !appState.blastRadiusMode;
      renderApp();
    });
  }

  const btnPulseTraffic = document.getElementById('btn-pulse-traffic');
  if (btnPulseTraffic) {
    btnPulseTraffic.addEventListener('click', () => {
      appState.pulseEdges = !appState.pulseEdges;
      renderApp();
    });
  }

  const btnToggleLegend = document.getElementById('btn-toggle-legend');
  if (btnToggleLegend) {
    btnToggleLegend.addEventListener('click', () => {
      appState.showLegend = !appState.showLegend;
      renderApp();
    });
  }

  const btnCloseLegend = document.getElementById('btn-close-legend');
  if (btnCloseLegend) {
    btnCloseLegend.addEventListener('click', () => {
      appState.showLegend = false;
      renderApp();
    });
  }

  // Inspect Current Path CTA in Graph Bottom Bar
  const btnInspectCurrentPath = document.getElementById('btn-inspect-current-path');
  if (btnInspectCurrentPath) {
    btnInspectCurrentPath.addEventListener('click', () => {
      appState.sidePanelOpen = true;
      renderApp();
    });
  }

  // Close Side Panel
  const btnCloseSidepanel = document.getElementById('btn-close-sidepanel');
  if (btnCloseSidepanel) {
    btnCloseSidepanel.addEventListener('click', () => {
      appState.sidePanelOpen = false;
      renderApp();
    });
  }

  // Side Panel Navigation Tabs
  document.querySelectorAll('.panel-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetPanelTab = e.currentTarget.getAttribute('data-panel-tab');
      if (targetPanelTab) {
        appState.panelActiveTab = targetPanelTab;
        renderApp();
      }
    });
  });

  // Action Buttons inside Side Panel
  const btnActionMitigate = document.getElementById('btn-action-mitigate');
  if (btnActionMitigate) {
    btnActionMitigate.addEventListener('click', () => {
      alert('🔒 Isolation Playbook Executed: Firewall rule applied to isolate selected asset trajectory.');
      appState.systemState = 'normal';
      appState.sidePanelOpen = false;
      renderApp();
    });
  }

  const btnActionAssign = document.getElementById('btn-action-assign');
  if (btnActionAssign) {
    btnActionAssign.addEventListener('click', () => {
      alert('📋 Assigned to SOC Triage queue. Notification sent to Tier 2 Lead.');
    });
  }
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
