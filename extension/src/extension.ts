/**
 * ReScript Evangeliser - VS Code Extension Entry Point
 *
 * Philosophy: "Celebrate good, minimize bad, show better"
 * - Never shame developers for not knowing
 * - Always celebrate their existing knowledge
 * - Show how ReScript makes patterns even better
 */

import * as vscode from 'vscode';
import { detectPatterns, getPatternCount, getPatternStats, getPatternById } from './patterns/pattern-library';
import { TransformationPanel } from './webview/transformation-panel';
import { ExtensionConfig, LearningProgress, PatternMatch } from './types';
import { createGlyphLegend } from './glyphs';

/**
 * Extension state
 */
let transformationPanel: TransformationPanel | undefined;
let statusBarItem: vscode.StatusBarItem;
let learningProgress: LearningProgress;

/**
 * Activate the extension
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('🚀 ReScript Evangeliser is now active!');

  // Initialize learning progress
  learningProgress = context.globalState.get('learningProgress') || {
    patternsCompleted: new Set<string>(),
    currentDifficulty: 'beginner',
    totalTransformations: 0,
    favoritePatterns: [],
    customPatterns: [],
    achievements: [],
    startDate: new Date(),
    lastActive: new Date()
  };

  // Create status bar item
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = 'rescript-evangeliser.showPatternLibrary';
  updateStatusBar();
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Register commands
  registerCommands(context);

  // Set up file watchers
  setupFileWatchers(context);

  // Show welcome message on first activation
  const hasShownWelcome = context.globalState.get('hasShownWelcome');
  if (!hasShownWelcome) {
    showWelcomeMessage(context);
  }

  // Performance monitoring
  const startTime = Date.now();
  console.log(`Extension activated in ${Date.now() - startTime}ms`);

  return {
    // Extension API for testing
    detectPatterns,
    getPatternCount,
    getConfig: () => getExtensionConfig()
  };
}

/**
 * Deactivate the extension
 */
export function deactivate() {
  console.log('ReScript Evangeliser is now deactivated');

  // Cleanup
  if (transformationPanel) {
    transformationPanel.dispose();
  }

  if (statusBarItem) {
    statusBarItem.dispose();
  }
}

/**
 * Register all commands
 */
function registerCommands(context: vscode.ExtensionContext) {
  // Transform Selection
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.transformSelection', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('No active editor');
        return;
      }

      const selection = editor.selection;
      const code = editor.document.getText(selection);

      if (!code) {
        vscode.window.showInformationMessage('No code selected');
        return;
      }

      await transformCode(code, context);
    })
  );

  // Show Transformation Panel
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.showTransformationPanel', async () => {
      const editor = vscode.window.activeTextEditor;
      const code = editor?.document.getText() || '';

      if (!transformationPanel) {
        transformationPanel = new TransformationPanel(context.extensionUri);
      }

      transformationPanel.show(code);
    })
  );

  // Analyze Current File
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.analyzeFile', async () => {
      await analyzeCurrentFile(context);
    })
  );

  // Show Pattern Library
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.showPatternLibrary', async () => {
      await showPatternLibraryQuickPick(context);
    })
  );

  // Toggle View
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.toggleView', () => {
      if (transformationPanel) {
        transformationPanel.toggleView();
      } else {
        vscode.window.showInformationMessage('Open transformation panel first');
      }
    })
  );

  // Next Pattern
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.nextPattern', () => {
      if (transformationPanel) {
        transformationPanel.nextPattern();
      }
    })
  );

  // Previous Pattern
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.previousPattern', () => {
      if (transformationPanel) {
        transformationPanel.previousPattern();
      }
    })
  );

  // Show Tutorial
  context.subscriptions.push(
    vscode.commands.registerCommand('rescript-evangeliser.showTutorial', async () => {
      await showTutorial(context);
    })
  );
}

/**
 * Transform code and show results
 */
async function transformCode(code: string, context: vscode.ExtensionContext) {
  const startTime = performance.now();

  // Detect patterns
  const patterns = detectPatterns(code);

  const analysisTime = performance.now() - startTime;

  if (patterns.length === 0) {
    vscode.window.showInformationMessage(
      '🤔 No ReScript patterns detected. Try selecting JavaScript code with common patterns like null checks, async/await, or array operations!'
    );
    return;
  }

  // Show first pattern
  const pattern = patterns[0];

  // Update progress
  learningProgress.patternsCompleted.add(pattern.id);
  learningProgress.totalTransformations++;
  learningProgress.lastActive = new Date();
  await context.globalState.update('learningProgress', learningProgress);

  // Show transformation panel
  if (!transformationPanel) {
    transformationPanel = new TransformationPanel(context.extensionUri);
  }

  transformationPanel.show(code, patterns);

  // Performance feedback
  if (analysisTime < 50) {
    console.log(`✅ Pattern detection: ${analysisTime.toFixed(2)}ms (excellent!)`);
  } else if (analysisTime < 300) {
    console.log(`✅ Pattern detection: ${analysisTime.toFixed(2)}ms (within target)`);
  } else {
    console.warn(`⚠️ Pattern detection: ${analysisTime.toFixed(2)}ms (above 300ms target)`);
  }

  updateStatusBar();
}

/**
 * Analyze current file
 */
async function analyzeCurrentFile(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showInformationMessage('No active editor');
    return;
  }

  const code = editor.document.getText();
  const patterns = detectPatterns(code);

  // Show analysis results
  const panel = vscode.window.createWebviewPanel(
    'rescriptAnalysis',
    'ReScript Pattern Analysis',
    vscode.ViewColumn.Two,
    {}
  );

  const stats = getPatternStats();

  panel.webview.html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pattern Analysis</title>
      <style>
        body {
          font-family: var(--vscode-font-family);
          padding: 20px;
          color: var(--vscode-foreground);
        }
        h1 { color: var(--vscode-textLink-foreground); }
        .pattern {
          border: 1px solid var(--vscode-panel-border);
          padding: 15px;
          margin: 10px 0;
          border-radius: 5px;
        }
        .celebrate { color: #4CAF50; }
        .stats {
          background: var(--vscode-editor-background);
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <h1>📊 Pattern Analysis Results</h1>

      <div class="stats">
        <h2>Statistics</h2>
        <p>✨ Patterns Found: <strong>${patterns.length}</strong></p>
        <p>📚 Total Patterns Available: <strong>${stats.total}</strong></p>
        <p>💪 Your Progress: <strong>${learningProgress.patternsCompleted.size}/${stats.total}</strong></p>
      </div>

      <h2>Detected Patterns</h2>
      ${patterns.map(p => `
        <div class="pattern">
          <h3>${p.glyphs.join(' ')} ${p.name}</h3>
          <p><strong>Category:</strong> ${p.category}</p>
          <p><strong>Difficulty:</strong> ${p.difficulty}</p>
          <p class="celebrate">✨ ${p.narrative.celebrate}</p>
        </div>
      `).join('')}

      ${patterns.length === 0 ? `
        <p>No patterns detected in this file. Try files with:</p>
        <ul>
          <li>Null checks (if x !== null)</li>
          <li>Async/await functions</li>
          <li>Array operations (map, filter, reduce)</li>
          <li>Try/catch error handling</li>
        </ul>
      ` : ''}
    </body>
    </html>
  `;
}

/**
 * Show pattern library quick pick
 */
async function showPatternLibraryQuickPick(context: vscode.ExtensionContext) {
  const config = getExtensionConfig();
  const stats = getPatternStats();

  // Group patterns by category
  const items: vscode.QuickPickItem[] = [
    {
      label: '📊 Pattern Library Statistics',
      description: `${stats.total} total patterns available`,
      kind: vscode.QuickPickItemKind.Separator
    },
    {
      label: '🛡️ Null Safety',
      description: `${stats.byCategory['null-safety'] || 0} patterns`,
      detail: 'Option types, null checks, optional chaining'
    },
    {
      label: '⏳ Async Operations',
      description: `${stats.byCategory['async'] || 0} patterns`,
      detail: 'async/await, Promises, error handling'
    },
    {
      label: '✅ Error Handling',
      description: `${stats.byCategory['error-handling'] || 0} patterns`,
      detail: 'try/catch, Result types, error-first callbacks'
    },
    {
      label: '📚 Array Operations',
      description: `${stats.byCategory['array-operations'] || 0} patterns`,
      detail: 'map, filter, reduce, and more'
    },
    {
      label: '🌿 Conditionals',
      description: `${stats.byCategory['conditionals'] || 0} patterns`,
      detail: 'if/else, switch, ternary, pattern matching'
    },
    {
      label: '⚙️ Functional Programming',
      description: `${stats.byCategory['functional'] || 0} patterns`,
      detail: 'Pure functions, higher-order functions, composition'
    },
    {
      label: '🧩 Variants & Types',
      description: `${stats.byCategory['variants'] || 0} patterns`,
      detail: 'Union types, enums, state machines'
    },
    {
      label: '📦 Destructuring',
      description: `${stats.byCategory['destructuring'] || 0} patterns`,
      detail: 'Object/array destructuring, rest parameters'
    },
    {
      label: '📦 Modules',
      description: `${stats.byCategory['modules'] || 0} patterns`,
      detail: 'Imports, exports, module organization'
    },
    {
      label: '📝 Strings & Templates',
      description: `${stats.byCategory['templates'] || 0} patterns`,
      detail: 'Template literals, string interpolation'
    },
  ];

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Browse pattern library',
    matchOnDescription: true,
    matchOnDetail: true
  });

  if (selected) {
    vscode.window.showInformationMessage(`Selected: ${selected.label}`);
  }
}

/**
 * Show tutorial
 */
async function showTutorial(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'rescriptTutorial',
    'ReScript Tutorial',
    vscode.ViewColumn.One,
    {}
  );

  panel.webview.html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: var(--vscode-font-family);
          padding: 20px;
          line-height: 1.6;
        }
        h1 { color: #4CAF50; }
        .step {
          background: var(--vscode-editor-background);
          padding: 15px;
          margin: 15px 0;
          border-left: 4px solid #4CAF50;
        }
      </style>
    </head>
    <body>
      <h1>🎓 Welcome to ReScript Evangeliser!</h1>

      <div class="step">
        <h2>Step 1: Select JavaScript Code</h2>
        <p>Open a JavaScript or TypeScript file, then select code with patterns like null checks, async/await, or array operations.</p>
      </div>

      <div class="step">
        <h2>Step 2: Transform</h2>
        <p>Press <code>Ctrl+Shift+R</code> (or <code>Cmd+Shift+R</code> on Mac) to see ReScript transformations!</p>
      </div>

      <div class="step">
        <h2>Step 3: Learn & Explore</h2>
        <p>Read the encouraging narrative explaining how ReScript makes your code even better!</p>
      </div>

      <div class="step">
        <h2>Philosophy: "Celebrate Good, Minimize Bad, Show Better"</h2>
        <p>We never shame you for not knowing ReScript. Your JavaScript is good! We just show how ReScript can make some things even better. 💙</p>
      </div>

      <p><strong>Ready?</strong> Try selecting some code and press <code>Ctrl+Shift+R</code>!</p>
    </body>
    </html>
  `;
}

/**
 * Show welcome message
 */
async function showWelcomeMessage(context: vscode.ExtensionContext) {
  const action = await vscode.window.showInformationMessage(
    '🎉 Welcome to ReScript Evangeliser! Learn ReScript through encouraging code transformations.',
    'Show Tutorial',
    'Browse Patterns',
    'Dismiss'
  );

  if (action === 'Show Tutorial') {
    vscode.commands.executeCommand('rescript-evangeliser.showTutorial');
  } else if (action === 'Browse Patterns') {
    vscode.commands.executeCommand('rescript-evangeliser.showPatternLibrary');
  }

  await context.globalState.update('hasShownWelcome', true);
}

/**
 * Set up file watchers
 */
function setupFileWatchers(context: vscode.ExtensionContext) {
  const config = getExtensionConfig();

  if (!config.autoDetectPatterns) {
    return;
  }

  // Watch for active editor changes
  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor && isJavaScriptFile(editor.document)) {
      const patterns = detectPatterns(editor.document.getText());
      updateStatusBar(patterns.length);
    }
  }, null, context.subscriptions);

  // Watch for text document changes
  vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document === event.document && isJavaScriptFile(event.document)) {
      // Debounce pattern detection
      setTimeout(() => {
        const patterns = detectPatterns(editor.document.getText());
        updateStatusBar(patterns.length);
      }, 500);
    }
  }, null, context.subscriptions);
}

/**
 * Check if document is JavaScript/TypeScript
 */
function isJavaScriptFile(document: vscode.TextDocument): boolean {
  return ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'].includes(
    document.languageId
  );
}

/**
 * Update status bar
 */
function updateStatusBar(patternCount?: number) {
  const count = patternCount ?? 0;
  const stats = getPatternStats();

  statusBarItem.text = `$(lightbulb) ReScript: ${learningProgress.patternsCompleted.size}/${stats.total} patterns`;
  statusBarItem.tooltip = `ReScript Evangeliser\n${count} patterns detected in current file\nClick to browse pattern library`;
}

/**
 * Get extension configuration
 */
function getExtensionConfig(): ExtensionConfig {
  const config = vscode.workspace.getConfiguration('rescriptEvangeliser');

  return {
    defaultView: config.get('defaultView', 'RAW'),
    showNarratives: config.get('showNarratives', true),
    autoDetectPatterns: config.get('autoDetectPatterns', true),
    difficultyLevel: config.get('difficultyLevel', 'beginner'),
    enableTelemetry: config.get('enableTelemetry', false),
    performanceMode: config.get('performanceMode', false),
    customPatternPaths: config.get('customPatternPaths', [])
  };
}
