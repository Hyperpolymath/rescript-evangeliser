/**
 * Core type definitions for ReScript Evangeliser
 *
 * Philosophy: "Celebrate good, minimize bad, show better"
 * Never shame developers - show how ReScript enhances their existing patterns
 */

export type ViewLayer = 'RAW' | 'FOLDED' | 'GLYPHED' | 'WYSIWYG';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type PatternCategory =
  | 'null-safety'
  | 'async'
  | 'error-handling'
  | 'array-operations'
  | 'conditionals'
  | 'destructuring'
  | 'defaults'
  | 'functional'
  | 'templates'
  | 'arrow-functions'
  | 'variants'
  | 'modules'
  | 'type-safety'
  | 'immutability'
  | 'pattern-matching'
  | 'pipe-operator'
  | 'oop-to-fp'
  | 'classes-to-records'
  | 'inheritance-to-composition'
  | 'state-machines'
  | 'data-modeling';

/**
 * A Makaton-inspired glyph that represents semantic meaning beyond syntax
 */
export interface Glyph {
  symbol: string;
  name: string;
  meaning: string;
  semanticCategory: 'transformation' | 'safety' | 'flow' | 'structure' | 'state' | 'data';
  usageExample: string;
}

/**
 * Encouraging narrative following "Celebrate, Minimize, Better" philosophy
 */
export interface Narrative {
  celebrate: string;      // What the JS code does well
  minimize: string;       // Downplay the issues (never shame)
  better: string;         // How ReScript makes it even better
  safety: string;         // Type safety benefits
  example: string;        // Concrete example of the improvement
}

/**
 * A transformation pattern from JavaScript to ReScript
 */
export interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  difficulty: DifficultyLevel;

  // Detection
  jsPattern: RegExp | ((code: string) => boolean);
  confidence: number; // 0-1, how confident the match is

  // Examples
  jsExample: string;
  rescriptExample: string;

  // Narrative
  narrative: Narrative;

  // Additional context
  glyphs: string[];       // Which glyphs apply to this pattern
  tags: string[];
  relatedPatterns: string[]; // IDs of related patterns

  // Learning
  learningObjectives: string[];
  commonMistakes: string[];
  bestPractices: string[];

  // Metadata
  timestamp?: number;
  userRating?: number;
}

/**
 * A matched pattern in user's code
 */
export interface PatternMatch {
  pattern: Pattern;
  code: string;
  startLine: number;
  endLine: number;
  confidence: number;
  transformation?: string; // The ReScript transformation
}

/**
 * Analysis result for a file or selection
 */
export interface AnalysisResult {
  matches: PatternMatch[];
  totalPatterns: number;
  coveragePercentage: number;
  difficulty: DifficultyLevel;
  suggestedNextPatterns: Pattern[];
  performance: {
    analysisTime: number; // ms
    memoryUsed: number;   // bytes
  };
}

/**
 * User's learning progress
 */
export interface LearningProgress {
  patternsCompleted: Set<string>;
  currentDifficulty: DifficultyLevel;
  totalTransformations: number;
  favoritePatterns: string[];
  customPatterns: Pattern[];
  achievements: Achievement[];
  startDate: Date;
  lastActive: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

/**
 * Configuration for the extension
 */
export interface ExtensionConfig {
  defaultView: ViewLayer;
  showNarratives: boolean;
  autoDetectPatterns: boolean;
  difficultyLevel: DifficultyLevel | 'all';
  enableTelemetry: boolean;
  performanceMode: boolean;
  customPatternPaths: string[];
}

/**
 * Telemetry event (privacy-preserving)
 */
export interface TelemetryEvent {
  eventType: 'pattern_viewed' | 'pattern_transformed' | 'view_changed' | 'tutorial_completed';
  category?: PatternCategory;
  difficulty?: DifficultyLevel;
  timestamp: number;
  // NO user-identifying information
  // NO code snippets
  // Only aggregate, anonymous usage data
}

/**
 * AST node type for pattern matching
 */
export interface ASTNode {
  type: string;
  start: number;
  end: number;
  loc?: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
}

/**
 * Transformation context
 */
export interface TransformationContext {
  sourceCode: string;
  language: 'javascript' | 'typescript';
  currentView: ViewLayer;
  selectedPattern?: Pattern;
  userPreferences: ExtensionConfig;
}

/**
 * WYSIWYG block for visual editing
 */
export interface WYSIWYGBlock {
  id: string;
  type: 'code' | 'narrative' | 'comparison' | 'interactive';
  content: string;
  rescriptEquivalent?: string;
  editable: boolean;
  collapsed: boolean;
}

/**
 * Tutorial step for guided learning
 */
export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  pattern: Pattern;
  exercise?: {
    task: string;
    startingCode: string;
    solution: string;
    hints: string[];
  };
  completed: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  steps: TutorialStep[];
  estimatedTime: number; // minutes
  prerequisites: string[]; // tutorial IDs
}
