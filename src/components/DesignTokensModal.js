/* ==========================================================================
   DESIGN TOKENS & ACCESSIBILITY SPECIFICATION MODAL
   ========================================================================== */

export function renderDesignTokensModal(isOpen, onClose) {
  if (!isOpen) return '';

  return `
    <div class="modal-overlay" id="modal-tokens-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20z"/></svg>
            Design System Tokens & Accessibility Standard
          </div>
          <button id="btn-close-tokens-modal" style="font-size:20px; color:var(--color-text-muted); background:none; border:none; cursor:pointer;">✕</button>
        </div>

        <div class="modal-body">
          <section>
            <h3 style="color:var(--color-orange-primary); font-size:15px; margin-bottom:10px;">Primary Color Palette Swatches</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px;">
              <div style="background:#FF6B00; color:#000; padding:14px; border-radius:8px; font-weight:700;">
                Brand Primary Orange<br><span style="font-family:var(--font-mono); font-size:11px;">#FF6B00</span>
              </div>
              <div style="background:#080B10; color:#FFF; padding:14px; border-radius:8px; border:1px solid #333; font-weight:700;">
                Base Dark Canvas<br><span style="font-family:var(--font-mono); font-size:11px;">#080B10</span>
              </div>
              <div style="background:#0E131F; color:#FFF; padding:14px; border-radius:8px; border:1px solid #333; font-weight:700;">
                Surface Glass Panel<br><span style="font-family:var(--font-mono); font-size:11px;">#0E131F</span>
              </div>
              <div style="background:#F8FAFC; color:#000; padding:14px; border-radius:8px; font-weight:700;">
                Primary Text White<br><span style="font-family:var(--font-mono); font-size:11px;">#F8FAFC</span>
              </div>
            </div>
          </section>

          <section>
            <h3 style="color:var(--color-orange-primary); font-size:15px; margin-bottom:10px;">Severity & Status Tokens (WCAG 2.2 Compliant)</h3>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <span class="badge critical" style="padding:6px 12px; font-size:12px;">🔴 Critical (#EF4444)</span>
              <span class="badge high" style="padding:6px 12px; font-size:12px;">🟠 High (#F59E0B)</span>
              <span class="badge medium" style="padding:6px 12px; font-size:12px;">🔵 Medium (#3B82F6)</span>
              <span class="badge low" style="padding:6px 12px; font-size:12px;">🟢 Low (#10B981)</span>
              <span class="state-badge degraded" style="padding:6px 12px; font-size:12px;">🟣 Degraded (#D946EF)</span>
            </div>
          </section>

          <section>
            <h3 style="color:var(--color-orange-primary); font-size:15px; margin-bottom:10px;">Accessibility & Usability Cues</h3>
            <div style="background:var(--color-bg-base); padding:16px; border-radius:8px; border:1px solid var(--color-border-subtle); font-size:13px; line-height:1.6;">
              <ul style="padding-left:18px;">
                <li><strong>Non-color-only communication:</strong> All critical status items pair high-contrast colors with distinct iconography (⚡ for Crown Jewel, 🌐 for Source, ! for Critical).</li>
                <li><strong>Accessible Focus Rings:</strong> High-contrast orange focus outlines (`2px solid #FF6B00`) for all keyboard tab operations (`:focus-visible`).</li>
                <li><strong>Dense Information Hierarchy:</strong> Uses <em>Outfit</em> for headers, <em>Inter</em> for UI controls, and <em>JetBrains Mono</em> for technical IPs, CVEs, and packet traces.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}
