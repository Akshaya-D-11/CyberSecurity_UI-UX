/* ==========================================================================
   DESIGN RATIONALE MODAL COMPONENT (Fulfilling Section 8.1 of Challenge Brief)
   ========================================================================== */

export function renderRationaleModal(isOpen, onClose) {
  if (!isOpen) return '';

  return `
    <div class="modal-overlay" id="modal-rationale-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Candidate Design Rationale — Industrial Cybersecurity Platform
          </div>
          <button id="btn-close-rationale-modal" style="font-size:20px; color:var(--color-text-muted); background:none; border:none; cursor:pointer;">✕</button>
        </div>

        <div class="modal-body">
          <div class="callout">
            <strong>Candidate Note:</strong> This rationale explains the product thinking, information architecture, interaction model, and trade-offs made in designing the AETHER OT platform.
          </div>

          <section>
            <h3 style="color:var(--color-orange-primary); font-size:16px;">1. Information Prioritization & 5-10 Second Triage</h3>
            <p>
              In real-world OT/ICS security operations, analysts and executive leadership cannot waste time hunting through crowded dashboards. We prioritized <strong>Environment Posture Score</strong>, <strong>Active Attack Paths</strong>, and <strong>Exposed Crown Jewels</strong> at the top of the dashboard above the fold.
            </p>
            <p style="margin-top:6px;">
              Within 5 seconds, any operator can answer whether the plant is healthy, if an urgent attack vector is actively traversing network boundaries, and which critical PLCs or controllers are at immediate risk.
            </p>
          </section>

          <section>
            <h3 style="color:var(--color-orange-primary); font-size:16px;">2. Serving Both Leadership & Analyst Workflows</h3>
            <p>
              Instead of forcing a single generic view on all users, AETHER OT introduces an explicit <strong>Persona Context Switcher</strong>:
            </p>
            <ul style="padding-left:20px; margin-top:6px;">
              <li><strong>CISO / Leadership:</strong> Focuses on systemic posture, financial/business impact, and high-level attack path summaries.</li>
              <li><strong>SOC Analyst:</strong> Emphasizes triage speed, CVSS metrics, cross-zone lateral movement, and evidence log streams.</li>
              <li><strong>OT Specialist:</strong> Highlights Purdue Model levels (Level 0-4), industrial protocols (Modbus TCP, OPC UA, S7Comm), and PLC firmware versions.</li>
              <li><strong>Plant Operator:</strong> Concentrates on physical safety loops, turbine/distillation loop impact, and uptime status.</li>
            </ul>
          </section>

          <section>
            <h3 style="color:var(--color-orange-primary); font-size:16px;">3. Preventing Attack Path Visual Overload</h3>
            <p>
              Network graphs frequently become unusable "hairballs" when scaled to hundreds of nodes. We solved this with:
            </p>
            <ul style="padding-left:20px; margin-top:6px;">
              <li><strong>Purdue Zone Swimlanes:</strong> Structuring nodes vertically by Purdue Level (Level 4 Enterprise -> Level 3.5 DMZ -> Level 2 SCADA -> Level 1 Control).</li>
              <li><strong>Progressive Disclosure:</strong> Nodes show essential identity, role badge, and risk level on the canvas. Deeper evidence and log traces are offloaded to the smooth slide-out Investigation Panel.</li>
              <li><strong>Blast Radius & Path Presets:</strong> Analysts can toggle between single-path focus, shortest path, and blast radius highlights without cluttering the screen.</li>
            </ul>
          </section>

          <section>
            <h3 style="color:var(--color-orange-primary); font-size:16px;">4. Handling Data Uncertainty & Incomplete Telemetry</h3>
            <p>
              Industrial networks often experience sensor dropouts, SPAN port buffer overflow, or passive-only monitoring gaps. AETHER OT explicitly distinguishes between:
            </p>
            <ul style="padding-left:20px; margin-top:6px;">
              <li><strong>"No issue exists":</strong> Green operational indicator backed by 99.8%+ verified packet capture.</li>
              <li><strong>"Degraded Sensor Data":</strong> Prominent top banner warning users that specific sensors are offline and conclusions may be incomplete.</li>
              <li><strong>Confidence Ratings:</strong> Attack paths display explicit confidence metrics (e.g., <em>HIGH 94%</em> or <em>MEDIUM 65%</em>) so analysts do not misinterpret unverified telemetry as absolute certainty.</li>
            </ul>
          </section>

          <section>
            <h3 style="color:var(--color-orange-primary); font-size:16px;">5. Scaling to Multi-Site Enterprise Environments</h3>
            <p>
              Multi-site scalability is built into the global header. Operators can seamlessly scope data by <em>Global All Sites</em> or drill into individual facilities (e.g., <em>Houston Refinery</em> or <em>Rotterdam Chemical Plant</em>). Global search allows instant navigation to any IP, CVE, or asset name across thousands of managed devices.
            </p>
          </section>
        </div>
      </div>
    </div>
  `;
}
