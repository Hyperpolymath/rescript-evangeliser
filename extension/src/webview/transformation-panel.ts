/**
 * Transformation Panel - Four-Layer UI
 *
 * Implements progressive disclosure through four views:
 * 1. RAW - Side-by-side comparison with narrative
 * 2. FOLDED - Collapsible sections organized by concept
 * 3. GLYPHED - Symbol-annotated semantic visualization
 * 4. WYSIWYG - Block-based visual editor (future)
 */

import * as vscode from 'vscode';
import { Pattern, ViewLayer } from '../types';
import { formatNarrative } from '../narrative';
import { annotateWithGlyphs } from '../glyphs';

export class TransformationPanel {
  private panel: vscode.WebviewPanel | undefined;
  private currentView: ViewLayer = 'RAW';
  private currentPatterns: Pattern[] = [];
  private currentPatternIndex = 0;
  private currentCode = '';

  constructor(private readonly extensionUri: vscode.Uri) {}

  /**
   * Show the transformation panel
   */
  public show(code: string, patterns?: Pattern[]) {
    this.currentCode = code;
    if (patterns) {
      this.currentPatterns = patterns;
    }

    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Two);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        'rescriptTransformation',
        'ReScript Transformation',
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [this.extensionUri]
        }
      );

      // Handle disposal
      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });

      // Handle messages from webview
      this.panel.webview.onDidReceiveMessage(message => {
        switch (message.command) {
          case 'toggleView':
            this.toggleView();
            break;
          case 'nextPattern':
            this.nextPattern();
            break;
          case 'previousPattern':
            this.previousPattern();
            break;
          case 'copyReScript':
            this.copyReScriptCode();
            break;
        }
      });
    }

    this.updateContent();
  }

  /**
   * Toggle between view layers
   */
  public toggleView() {
    const views: ViewLayer[] = ['RAW', 'FOLDED', 'GLYPHED', 'WYSIWYG'];
    const currentIndex = views.indexOf(this.currentView);
    this.currentView = views[(currentIndex + 1) % views.length];
    this.updateContent();

    vscode.window.showInformationMessage(`Switched to ${this.currentView} view`);
  }

  /**
   * Show next pattern
   */
  public nextPattern() {
    if (this.currentPatterns.length === 0) return;

    this.currentPatternIndex = (this.currentPatternIndex + 1) % this.currentPatterns.length;
    this.updateContent();
  }

  /**
   * Show previous pattern
   */
  public previousPattern() {
    if (this.currentPatterns.length === 0) return;

    this.currentPatternIndex =
      (this.currentPatternIndex - 1 + this.currentPatterns.length) %
      this.currentPatterns.length;
    this.updateContent();
  }

  /**
   * Copy ReScript code to clipboard
   */
  private async copyReScriptCode() {
    const pattern = this.currentPatterns[this.currentPatternIndex];
    if (pattern) {
      await vscode.env.clipboard.writeText(pattern.rescriptExample);
      vscode.window.showInformationMessage('✅ ReScript code copied to clipboard!');
    }
  }

  /**
   * Dispose the panel
   */
  public dispose() {
    if (this.panel) {
      this.panel.dispose();
    }
  }

  /**
   * Update panel content based on current view
   */
  private updateContent() {
    if (!this.panel) return;

    const pattern = this.currentPatterns[this.currentPatternIndex];

    switch (this.currentView) {
      case 'RAW':
        this.panel.webview.html = this.getRawViewHtml(pattern);
        break;
      case 'FOLDED':
        this.panel.webview.html = this.getFoldedViewHtml(pattern);
        break;
      case 'GLYPHED':
        this.panel.webview.html = this.getGlyphedViewHtml(pattern);
        break;
      case 'WYSIWYG':
        this.panel.webview.html = this.getWysiwygViewHtml(pattern);
        break;
    }
  }

  /**
   * RAW View - Side-by-side comparison with narrative
   */
  private getRawViewHtml(pattern?: Pattern): string {
    if (!pattern) {
      return this.getNoPatternHtml();
    }

    const narrative = formatNarrative(pattern.narrative, 'html');
    const patternInfo = `
      <div class="pattern-info">
        <h3>${pattern.glyphs.join(' ')} ${pattern.name}</h3>
        <div class="badges">
          <span class="badge category">${pattern.category}</span>
          <span class="badge difficulty ${pattern.difficulty}">${pattern.difficulty}</span>
          <span class="badge confidence">${Math.round(pattern.confidence * 100)}% match</span>
        </div>
      </div>
    `;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ReScript Transformation - RAW View</title>
  ${this.getCommonStyles()}
  <style>
    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    .code-block {
      background: var(--vscode-editor-background);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 5px;
      padding: 15px;
    }
    .code-block h4 {
      margin-top: 0;
      color: var(--vscode-textLink-foreground);
    }
    pre {
      background: var(--vscode-textCodeBlock-background);
      padding: 10px;
      border-radius: 3px;
      overflow-x: auto;
    }
    code {
      font-family: var(--vscode-editor-font-family);
      font-size: var(--vscode-editor-font-size);
    }
  </style>
</head>
<body>
  ${this.getHeader('RAW')}

  <div class="container">
    ${patternInfo}

    <div class="narrative">
      ${narrative}
    </div>

    <div class="comparison">
      <div class="code-block">
        <h4>📝 Your JavaScript</h4>
        <pre><code>${this.escapeHtml(pattern.jsExample)}</code></pre>
      </div>

      <div class="code-block">
        <h4>🎯 ReScript</h4>
        <pre><code>${this.escapeHtml(pattern.rescriptExample)}</code></pre>
        <button onclick="copyCode()" class="copy-button">📋 Copy</button>
      </div>
    </div>

    ${this.getNavigationControls()}
    ${this.getLearningSection(pattern)}
  </div>

  ${this.getCommonScripts()}
</body>
</html>
    `;
  }

  /**
   * FOLDED View - Collapsible organized sections
   */
  private getFoldedViewHtml(pattern?: Pattern): string {
    if (!pattern) {
      return this.getNoPatternHtml();
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ReScript Transformation - FOLDED View</title>
  ${this.getCommonStyles()}
  <style>
    .section {
      margin: 15px 0;
      border: 1px solid var(--vscode-panel-border);
      border-radius: 5px;
      overflow: hidden;
    }
    .section-header {
      background: var(--vscode-editor-background);
      padding: 12px 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .section-header:hover {
      background: var(--vscode-list-hoverBackground);
    }
    .section-content {
      padding: 15px;
      display: none;
    }
    .section-content.open {
      display: block;
    }
    .toggle-icon {
      transition: transform 0.2s;
    }
    .toggle-icon.open {
      transform: rotate(90deg);
    }
  </style>
</head>
<body>
  ${this.getHeader('FOLDED')}

  <div class="container">
    <h2>${pattern.glyphs.join(' ')} ${pattern.name}</h2>

    <div class="section">
      <div class="section-header" onclick="toggleSection('celebrate')">
        <span>✨ What You Did Well</span>
        <span class="toggle-icon" id="celebrate-icon">▶</span>
      </div>
      <div class="section-content" id="celebrate-content">
        <p>${pattern.narrative.celebrate}</p>
      </div>
    </div>

    <div class="section">
      <div class="section-header" onclick="toggleSection('better')">
        <span>🚀 How ReScript Makes It Better</span>
        <span class="toggle-icon" id="better-icon">▶</span>
      </div>
      <div class="section-content" id="better-content">
        <p>${pattern.narrative.better}</p>
        <p><strong>Safety:</strong> ${pattern.narrative.safety}</p>
      </div>
    </div>

    <div class="section">
      <div class="section-header" onclick="toggleSection('code')">
        <span>📝 Code Comparison</span>
        <span class="toggle-icon" id="code-icon">▶</span>
      </div>
      <div class="section-content" id="code-content">
        <h4>JavaScript:</h4>
        <pre><code>${this.escapeHtml(pattern.jsExample)}</code></pre>

        <h4>ReScript:</h4>
        <pre><code>${this.escapeHtml(pattern.rescriptExample)}</code></pre>
      </div>
    </div>

    <div class="section">
      <div class="section-header" onclick="toggleSection('learning')">
        <span>🎓 Learning Objectives</span>
        <span class="toggle-icon" id="learning-icon">▶</span>
      </div>
      <div class="section-content" id="learning-content">
        <ul>
          ${pattern.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>

        <h4>Common Mistakes:</h4>
        <ul>
          ${pattern.commonMistakes.map(m => `<li>${m}</li>`).join('')}
        </ul>

        <h4>Best Practices:</h4>
        <ul>
          ${pattern.bestPractices.map(bp => `<li>${bp}</li>`).join('')}
        </ul>
      </div>
    </div>

    ${this.getNavigationControls()}
  </div>

  ${this.getCommonScripts()}
  <script>
    function toggleSection(id) {
      const content = document.getElementById(id + '-content');
      const icon = document.getElementById(id + '-icon');

      content.classList.toggle('open');
      icon.classList.toggle('open');
    }
  </script>
</body>
</html>
    `;
  }

  /**
   * GLYPHED View - Symbol-annotated semantic visualization
   */
  private getGlyphedViewHtml(pattern?: Pattern): string {
    if (!pattern) {
      return this.getNoPatternHtml();
    }

    const annotatedJs = annotateWithGlyphs(pattern.jsExample, pattern.glyphs);
    const annotatedRescript = annotateWithGlyphs(pattern.rescriptExample, pattern.glyphs);

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ReScript Transformation - GLYPHED View</title>
  ${this.getCommonStyles()}
  <style>
    .glyph-legend {
      background: var(--vscode-editor-background);
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
    }
    .glyph-item {
      display: inline-block;
      margin: 5px 10px;
      padding: 5px 10px;
      background: var(--vscode-button-background);
      border-radius: 3px;
    }
    .code-with-glyphs {
      font-size: 1.1em;
      line-height: 1.8;
    }
  </style>
</head>
<body>
  ${this.getHeader('GLYPHED')}

  <div class="container">
    <h2>${pattern.name}</h2>

    <div class="glyph-legend">
      <h3>🔮 Semantic Symbols</h3>
      <p>These glyphs represent concepts that transcend syntax:</p>
      <div>
        ${pattern.glyphs.map(g => `<span class="glyph-item">${g}</span>`).join('')}
      </div>
    </div>

    <div class="narrative">
      <p><strong>✨ Celebration:</strong> ${pattern.narrative.celebrate}</p>
      <p><strong>🚀 Enhancement:</strong> ${pattern.narrative.better}</p>
    </div>

    <h3>📝 JavaScript (with semantic symbols)</h3>
    <pre class="code-with-glyphs"><code>${this.escapeHtml(annotatedJs)}</code></pre>

    <h3>🎯 ReScript (with semantic symbols)</h3>
    <pre class="code-with-glyphs"><code>${this.escapeHtml(annotatedRescript)}</code></pre>

    <div class="info-box">
      <p><strong>🎯 What the glyphs mean:</strong></p>
      <p>The symbols above show the <em>semantic meaning</em> of the code - what it <em>does</em> conceptually, beyond just syntax. This helps you see the patterns across different languages!</p>
    </div>

    ${this.getNavigationControls()}
  </div>

  ${this.getCommonScripts()}
</body>
</html>
    `;
  }

  /**
   * WYSIWYG View - Block-based visual editor (coming soon)
   */
  private getWysiwygViewHtml(pattern?: Pattern): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ReScript Transformation - WYSIWYG View</title>
  ${this.getCommonStyles()}
</head>
<body>
  ${this.getHeader('WYSIWYG')}

  <div class="container">
    <div class="coming-soon">
      <h2>🚧 WYSIWYG View Coming Soon!</h2>
      <p>The block-based visual editor is under development. It will allow you to:</p>
      <ul>
        <li>Drag and drop code blocks</li>
        <li>Visually compose transformations</li>
        <li>Interactive pattern matching</li>
        <li>Real-time type feedback</li>
      </ul>
      <p><strong>For now, try the RAW, FOLDED, or GLYPHED views!</strong></p>
      <button onclick="window.postMessage({ command: 'toggleView' }, '*')">
        Switch View
      </button>
    </div>
  </div>

  ${this.getCommonScripts()}
</body>
</html>
    `;
  }

  /**
   * No pattern detected HTML
   */
  private getNoPatternHtml(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ReScript Transformation</title>
  ${this.getCommonStyles()}
</head>
<body>
  <div class="container">
    <div class="no-pattern">
      <h2>🤔 No Patterns Detected</h2>
      <p>Try selecting JavaScript code with common patterns like:</p>
      <ul>
        <li>✅ Null checks: <code>if (x !== null && x !== undefined)</code></li>
        <li>⏳ Async/await functions</li>
        <li>📚 Array operations: map, filter, reduce</li>
        <li>🛡️ Try/catch error handling</li>
        <li>🌿 Switch statements</li>
      </ul>
      <p><strong>Tip:</strong> Select code and press <code>Ctrl+Shift+R</code> (or <code>Cmd+Shift+R</code>)</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Common HTML header
   */
  private getHeader(viewName: string): string {
    const total = this.currentPatterns.length;
    const current = this.currentPatternIndex + 1;

    return `
      <div class="header">
        <h1>🎯 ReScript Evangeliser</h1>
        <div class="view-info">
          <span class="view-badge">${viewName} View</span>
          ${total > 0 ? `<span class="pattern-counter">Pattern ${current}/${total}</span>` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Navigation controls
   */
  private getNavigationControls(): string {
    const total = this.currentPatterns.length;

    return `
      <div class="navigation">
        ${total > 1 ? `
          <button onclick="previousPattern()" class="nav-button">⬅️ Previous Pattern</button>
          <button onclick="nextPattern()" class="nav-button">Next Pattern ➡️</button>
        ` : ''}
        <button onclick="toggleView()" class="nav-button">🔄 Toggle View</button>
      </div>
    `;
  }

  /**
   * Learning section
   */
  private getLearningSection(pattern: Pattern): string {
    return `
      <div class="learning-section">
        <h3>🎓 Keep Learning</h3>

        <details>
          <summary>Related Patterns</summary>
          <ul>
            ${pattern.relatedPatterns.map(id => `<li>${id}</li>`).join('')}
          </ul>
        </details>

        <details>
          <summary>Tags</summary>
          <div class="tags">
            ${pattern.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </details>
      </div>
    `;
  }

  /**
   * Common CSS styles
   */
  private getCommonStyles(): string {
    return `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--vscode-font-family);
          color: var(--vscode-foreground);
          background: var(--vscode-editor-background);
          padding: 0;
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          background: var(--vscode-editor-background);
          padding: 20px;
          border-bottom: 2px solid var(--vscode-panel-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .view-info {
          display: flex;
          gap: 10px;
        }

        .view-badge {
          background: var(--vscode-button-background);
          color: var(--vscode-button-foreground);
          padding: 5px 15px;
          border-radius: 15px;
          font-weight: bold;
        }

        .pattern-counter {
          background: var(--vscode-badge-background);
          color: var(--vscode-badge-foreground);
          padding: 5px 15px;
          border-radius: 15px;
        }

        .pattern-info {
          margin: 20px 0;
        }

        .badges {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.9em;
          font-weight: 500;
        }

        .badge.category {
          background: #2196F3;
          color: white;
        }

        .badge.difficulty.beginner {
          background: #4CAF50;
          color: white;
        }

        .badge.difficulty.intermediate {
          background: #FF9800;
          color: white;
        }

        .badge.difficulty.advanced {
          background: #F44336;
          color: white;
        }

        .badge.confidence {
          background: var(--vscode-badge-background);
          color: var(--vscode-badge-foreground);
        }

        .narrative {
          background: var(--vscode-textBlockQuote-background);
          border-left: 4px solid #4CAF50;
          padding: 15px;
          margin: 20px 0;
        }

        .narrative p {
          margin: 10px 0;
        }

        .celebrate { color: #4CAF50; }
        .minimize { color: #FF9800; }
        .better { color: #2196F3; }

        button {
          background: var(--vscode-button-background);
          color: var(--vscode-button-foreground);
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        button:hover {
          background: var(--vscode-button-hoverBackground);
        }

        .navigation {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          justify-content: center;
        }

        .nav-button {
          padding: 10px 20px;
        }

        .copy-button {
          margin-top: 10px;
        }

        .learning-section {
          margin: 30px 0;
          padding: 20px;
          background: var(--vscode-editor-background);
          border-radius: 5px;
        }

        details {
          margin: 10px 0;
          padding: 10px;
          border: 1px solid var(--vscode-panel-border);
          border-radius: 4px;
        }

        summary {
          cursor: pointer;
          font-weight: bold;
          padding: 5px;
        }

        summary:hover {
          background: var(--vscode-list-hoverBackground);
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
        }

        .tag {
          background: var(--vscode-badge-background);
          color: var(--vscode-badge-foreground);
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 0.85em;
        }

        .info-box {
          background: var(--vscode-textBlockQuote-background);
          padding: 15px;
          border-left: 4px solid #2196F3;
          margin: 20px 0;
        }

        .coming-soon {
          text-align: center;
          padding: 60px 20px;
        }

        .coming-soon h2 {
          color: var(--vscode-textLink-foreground);
          margin-bottom: 20px;
        }

        .coming-soon ul {
          text-align: left;
          max-width: 400px;
          margin: 20px auto;
        }

        .no-pattern {
          text-align: center;
          padding: 40px 20px;
        }

        .no-pattern ul {
          text-align: left;
          max-width: 500px;
          margin: 20px auto;
        }

        code {
          font-family: var(--vscode-editor-font-family);
          background: var(--vscode-textCodeBlock-background);
          padding: 2px 6px;
          border-radius: 3px;
        }

        pre {
          background: var(--vscode-textCodeBlock-background);
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          margin: 10px 0;
        }

        pre code {
          background: none;
          padding: 0;
        }
      </style>
    `;
  }

  /**
   * Common scripts
   */
  private getCommonScripts(): string {
    return `
      <script>
        const vscode = acquireVsCodeApi();

        function toggleView() {
          vscode.postMessage({ command: 'toggleView' });
        }

        function nextPattern() {
          vscode.postMessage({ command: 'nextPattern' });
        }

        function previousPattern() {
          vscode.postMessage({ command: 'previousPattern' });
        }

        function copyCode() {
          vscode.postMessage({ command: 'copyReScript' });
        }
      </script>
    `;
  }

  /**
   * Escape HTML for safe display
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
