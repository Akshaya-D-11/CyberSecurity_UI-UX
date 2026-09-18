/* ==========================================================================
   SURFACE B: ATTACK PATH MAP WORKSPACE COMPONENT
   ========================================================================== */

import { mockData } from '../data/mockData.js';

export function renderAttackPathMap(state, selectedPathId, selectedNodeId, selectedEdgeId) {
  const currentPath = mockData.attackPaths.find(p => p.id === (selectedPathId || 'AP-01')) || mockData.attackPaths[0];

  return `
    <div class="graph-workspace" id="graph-workspace-container">
      <!-- Toolbar Controls Bar -->
      <div class="graph-controls-bar">
        <!-- View Presets -->
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

        <!-- View Mode Toggles -->
        <button class="toolbar-btn ${state.blastRadiusMode ? 'active' : ''}" id="btn-blast-radius" title="Toggle Blast Radius / Reachable Assets">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>
          <span style="font-size:10px; margin-left:4px; font-weight:700;">Blast Radius</span>
        </button>

        <button class="toolbar-btn ${state.pulseEdges ? 'active' : ''}" id="btn-pulse-traffic" title="Toggle Animated Traffic Pulse">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span style="font-size:10px; margin-left:4px; font-weight:700;">Traffic Pulse</span>
        </button>

        <button class="toolbar-btn" id="btn-toggle-legend" title="Toggle Map Legend Overlay">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span style="font-size:10px; margin-left:4px; font-weight:700;">Legend</span>
        </button>
      </div>

      <!-- SVG Graph Canvas -->
      <svg class="graph-svg-canvas" id="attack-graph-svg" viewBox="0 0 1120 540" preserveAspectRatio="xMidYMid meet">
        <defs>
          <!-- Grid Pattern -->
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" class="graph-grid-pattern" />
          </pattern>

          <!-- Marker Arrowheads -->
          <marker id="arrow-critical" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-critical)" />
          </marker>
          <marker id="arrow-selected" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-orange-primary)" />
          </marker>
        </defs>

        <!-- Grid Background -->
        <rect width="100%" height="100%" fill="url(#grid)" />

        <!-- Purdue Zone Swimlane Backgrounds -->
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

        <!-- Edges Layer -->
        <g class="edges-layer">
          ${currentPath.edges.map(edge => {
            const srcNode = currentPath.nodes.find(n => n.id === edge.source);
            const tgtNode = currentPath.nodes.find(n => n.id === edge.target);
            if (!srcNode || !tgtNode) return '';

            const isSelected = selectedEdgeId === edge.id;
            const markerId = isSelected ? 'url(#arrow-selected)' : 'url(#arrow-critical)';
            const pulseClass = state.pulseEdges ? 'pulse' : '';

            // Precise connection coordinates
            const srcX = srcNode.x + 140; // right edge of source card
            const srcY = srcNode.y + 35;  // vertical center
            const tgtX = tgtNode.x;       // left edge of target card
            const tgtY = tgtNode.y + 35;  // vertical center

            const midX = (srcX + tgtX) / 2;
            const midY = (srcY + tgtY) / 2;

            return `
              <g class="edge-group" data-edge-id="${edge.id}" style="cursor:pointer;">
                <path d="M ${srcX} ${srcY} L ${tgtX} ${tgtY}" 
                      class="graph-edge critical-path ${isSelected ? 'selected' : ''} ${pulseClass}"
                      marker-end="${markerId}" />
                
                <!-- Protocol / Service Label Badge (Centered in the gap) -->
                <rect x="${midX - 42}" y="${midY - 11}" width="84" height="22" rx="4" fill="var(--color-bg-base)" stroke="var(--color-orange-primary)" stroke-width="1.2" />
                <text x="${midX}" y="${midY + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--color-orange-primary)">${edge.protocol}</text>
              </g>
            `;
          }).join('')}
        </g>

        <!-- Nodes Layer -->
        <g class="nodes-layer">
          ${currentPath.nodes.map(node => {
            const isSelected = selectedNodeId === node.id;
            const isBlast = state.blastRadiusMode && (node.role === 'pivot' || node.role === 'target');
            
            let roleColor = 'var(--color-medium)';
            if (node.role === 'source') roleColor = 'var(--color-high)';
            if (node.role === 'pivot') roleColor = 'var(--color-orange-primary)';
            if (node.role === 'target') roleColor = 'var(--color-critical)';

            return `
              <g class="graph-node ${node.role} ${isSelected ? 'selected' : ''} ${isBlast ? 'blast-radius' : ''}" 
                 data-node-id="${node.id}" 
                 transform="translate(${node.x}, ${node.y})">
                
                <!-- Node Outer Card -->
                <rect class="node-card-rect" width="140" height="70" />
                
                <!-- Node Icon Header -->
                <rect x="8" y="8" width="26" height="26" rx="4" fill="${roleColor}" fill-opacity="0.2" stroke="${roleColor}" />
                <text x="21" y="25" text-anchor="middle" font-size="13" fill="${roleColor}">
                  ${node.role === 'target' ? '⚡' : node.role === 'source' ? '🌐' : '💻'}
                </text>

                <!-- Asset Identity -->
                <text x="40" y="21" class="node-text-title">${node.name}</text>
                <text x="40" y="33" class="node-text-sub">${node.ip}</text>

                <!-- Role Badge Footer -->
                <rect x="8" y="46" width="124" height="16" rx="3" fill="rgba(0,0,0,0.5)" />
                <text x="70" y="58" text-anchor="middle" class="node-role-badge" fill="${roleColor}">
                  ${node.roleLabel}
                </text>
              </g>
            `;
          }).join('')}
        </g>
      </svg>

      <!-- Map Legend Overlay (Toggleable) -->
      ${state.showLegend ? `
        <div class="graph-legend-box">
          <div class="legend-title">
            <span>Visual Semantics Legend</span>
            <button id="btn-close-legend" style="color:var(--color-text-muted);">✕</button>
          </div>
          <div class="legend-row">
            <div class="legend-icon-sample" style="border:1.5px solid var(--color-high); background:rgba(245, 158, 11, 0.2);">🌐</div>
            <span>Source / Entry Exposure Node</span>
          </div>
          <div class="legend-row">
            <div class="legend-icon-sample" style="border:1.5px solid var(--color-orange-primary); background:rgba(255, 107, 0, 0.2);">💻</div>
            <span>Intermediate Pivot Node</span>
          </div>
          <div class="legend-row">
            <div class="legend-icon-sample" style="border:2px solid var(--color-critical); background:rgba(239, 68, 68, 0.2);">⚡</div>
            <span>Crown Jewel Target Asset</span>
          </div>
          <div class="legend-row">
            <div style="width:20px; height:2px; background:var(--color-critical);"></div>
            <span>Critical Attack Traversal Edge</span>
          </div>
        </div>
      ` : ''}

      <!-- Bottom Path Summary Bar -->
      <div style="position:absolute; bottom:16px; left:50%; transform:translateX(-50%); background:rgba(14, 19, 31, 0.95); backdrop-filter:blur(12px); border:1px solid var(--color-border-medium); border-radius:var(--border-radius-lg); padding:10px 20px; display:flex; align-items:center; gap:24px; box-shadow:0 8px 30px rgba(0,0,0,0.7); z-index:20;">
        <div>
          <span style="font-size:10px; color:var(--color-text-muted); font-weight:700; text-transform:uppercase;">CURRENT PATH VECTOR:</span>
          <div style="font-weight:700; font-size:13px; color:var(--color-text-primary);">${currentPath.name}</div>
        </div>
        <div style="height:24px; width:1px; background:var(--color-border-subtle);"></div>
        <div>
          <span style="font-size:10px; color:var(--color-text-muted); font-weight:700; text-transform:uppercase;">SEVERITY & IMPACT:</span>
          <div><span class="badge critical">${currentPath.severity}</span> <span style="font-size:12px; margin-left:6px;">${currentPath.estimatedTime}</span></div>
        </div>
        <button class="btn-icon-text btn-primary" id="btn-inspect-current-path" style="padding:6px 14px;">
          Inspect Full Evidence Path
        </button>
      </div>
    </div>
  `;
}
