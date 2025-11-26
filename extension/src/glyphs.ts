/**
 * Makaton-inspired glyph system for ReScript Evangeliser
 *
 * Glyphs transcend syntax to show semantic meaning.
 * They help developers understand concepts visually, across language barriers.
 */

import { Glyph } from './types';

/**
 * Core set of 11 glyphs representing fundamental programming concepts
 */
export const GLYPHS: Record<string, Glyph> = {
  TRANSFORM: {
    symbol: '🔄',
    name: 'Transform',
    meaning: 'Data transformation or mapping operation',
    semanticCategory: 'transformation',
    usageExample: 'array.map(x => x * 2) becomes array->Array.map(x => x * 2)'
  },

  TARGET: {
    symbol: '🎯',
    name: 'Target',
    meaning: 'Precise type targeting - no ambiguity',
    semanticCategory: 'safety',
    usageExample: 'Explicit type annotation ensures correctness'
  },

  SHIELD: {
    symbol: '🛡️',
    name: 'Shield',
    meaning: 'Protection from null/undefined errors',
    semanticCategory: 'safety',
    usageExample: 'Option<string> prevents null reference errors'
  },

  FLOW: {
    symbol: '➡️',
    name: 'Flow',
    meaning: 'Pipe operator - data flows naturally left to right',
    semanticCategory: 'flow',
    usageExample: 'data->transform->filter->map reads like English'
  },

  BRANCH: {
    symbol: '🌿',
    name: 'Branch',
    meaning: 'Pattern matching - exhaustive branching',
    semanticCategory: 'flow',
    usageExample: 'switch statement with all cases covered'
  },

  PACKAGE: {
    symbol: '📦',
    name: 'Package',
    meaning: 'Module or encapsulated data structure',
    semanticCategory: 'structure',
    usageExample: 'Module or record type grouping related data'
  },

  LINK: {
    symbol: '🔗',
    name: 'Link',
    meaning: 'Composition - connecting functions or modules',
    semanticCategory: 'structure',
    usageExample: 'Function composition or module composition'
  },

  CRYSTAL: {
    symbol: '💎',
    name: 'Crystal',
    meaning: 'Immutability - unchanging, pure data',
    semanticCategory: 'data',
    usageExample: 'Immutable data structures prevent accidental mutation'
  },

  HOURGLASS: {
    symbol: '⏳',
    name: 'Hourglass',
    meaning: 'Async operation - time-dependent computation',
    semanticCategory: 'flow',
    usageExample: 'async/await or Promise handling'
  },

  CHECKPOINT: {
    symbol: '✅',
    name: 'Checkpoint',
    meaning: 'Result type - explicit success/failure handling',
    semanticCategory: 'safety',
    usageExample: 'Result<success, error> makes error handling explicit'
  },

  LIGHT: {
    symbol: '💡',
    name: 'Light',
    meaning: 'Type inference - compiler figures it out for you',
    semanticCategory: 'safety',
    usageExample: 'ReScript infers types without verbose annotations'
  }
};

/**
 * Additional glyphs for extended patterns
 */
export const EXTENDED_GLYPHS: Record<string, Glyph> = {
  GEAR: {
    symbol: '⚙️',
    name: 'Gear',
    meaning: 'Function - a working mechanism',
    semanticCategory: 'transformation',
    usageExample: 'Pure function that transforms inputs to outputs'
  },

  STACK: {
    symbol: '📚',
    name: 'Stack',
    meaning: 'Collection or sequence of items',
    semanticCategory: 'data',
    usageExample: 'Array, List, or Stack data structure'
  },

  LOCK: {
    symbol: '🔒',
    name: 'Lock',
    meaning: 'Encapsulation - private implementation',
    semanticCategory: 'structure',
    usageExample: 'Private module members or abstract types'
  },

  KEY: {
    symbol: '🔑',
    name: 'Key',
    meaning: 'Access - public API or interface',
    semanticCategory: 'structure',
    usageExample: 'Public module signature or interface'
  },

  RECYCLE: {
    symbol: '♻️',
    name: 'Recycle',
    meaning: 'Recursion - function calls itself',
    semanticCategory: 'flow',
    usageExample: 'Recursive function processing'
  },

  FILTER: {
    symbol: '🔍',
    name: 'Filter',
    meaning: 'Selection or filtering operation',
    semanticCategory: 'transformation',
    usageExample: 'Array.filter or pattern matching with guards'
  },

  MERGE: {
    symbol: '🔀',
    name: 'Merge',
    meaning: 'Combining or merging data',
    semanticCategory: 'transformation',
    usageExample: 'Object spread, record update, or concatenation'
  },

  WARNING: {
    symbol: '⚠️',
    name: 'Warning',
    meaning: 'Potential issue or anti-pattern',
    semanticCategory: 'safety',
    usageExample: 'Code that could be improved for safety'
  },

  ROCKET: {
    symbol: '🚀',
    name: 'Rocket',
    meaning: 'Performance optimization',
    semanticCategory: 'transformation',
    usageExample: 'Fast, optimized code generation'
  },

  PUZZLE: {
    symbol: '🧩',
    name: 'Puzzle',
    meaning: 'Type composition - building complex types from simple ones',
    semanticCategory: 'structure',
    usageExample: 'Variant types, record types, or type composition'
  }
};

/**
 * Get all available glyphs
 */
export function getAllGlyphs(): Glyph[] {
  return [...Object.values(GLYPHS), ...Object.values(EXTENDED_GLYPHS)];
}

/**
 * Get glyph by symbol
 */
export function getGlyphBySymbol(symbol: string): Glyph | undefined {
  return getAllGlyphs().find(g => g.symbol === symbol);
}

/**
 * Get glyphs by semantic category
 */
export function getGlyphsByCategory(category: Glyph['semanticCategory']): Glyph[] {
  return getAllGlyphs().filter(g => g.semanticCategory === category);
}

/**
 * Annotate code with glyphs based on detected patterns
 */
export function annotateWithGlyphs(code: string, glyphSymbols: string[]): string {
  const glyphBar = glyphSymbols.join(' ');
  return `${glyphBar}\n${code}`;
}

/**
 * Create a glyph legend for educational purposes
 */
export function createGlyphLegend(): string {
  const categories = ['safety', 'transformation', 'flow', 'structure', 'data'] as const;

  let legend = '# Glyph Legend\n\n';
  legend += 'Visual symbols representing programming concepts:\n\n';

  for (const category of categories) {
    const categoryGlyphs = getGlyphsByCategory(category);
    if (categoryGlyphs.length === 0) continue;

    legend += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;

    for (const glyph of categoryGlyphs) {
      legend += `- ${glyph.symbol} **${glyph.name}**: ${glyph.meaning}\n`;
      legend += `  - Example: ${glyph.usageExample}\n\n`;
    }
  }

  return legend;
}

/**
 * Get glyphs for a specific pattern category
 */
export function getGlyphsForPattern(
  patternCategory: string
): string[] {
  const mapping: Record<string, string[]> = {
    'null-safety': ['🛡️', '✅', '💎'],
    'async': ['⏳', '🔄', '➡️'],
    'error-handling': ['✅', '🛡️', '🌿'],
    'array-operations': ['🔄', '📚', '🔍'],
    'conditionals': ['🌿', '🎯', '🧩'],
    'destructuring': ['📦', '🔑', '🔀'],
    'defaults': ['🛡️', '💎', '🎯'],
    'functional': ['⚙️', '🔗', '💎'],
    'templates': ['🔄', '🔀', '➡️'],
    'arrow-functions': ['⚙️', '➡️', '🔄'],
    'variants': ['🧩', '🌿', '🎯'],
    'modules': ['📦', '🔒', '🔑'],
    'type-safety': ['🎯', '🛡️', '💡'],
    'immutability': ['💎', '🔒', '🛡️'],
    'pattern-matching': ['🌿', '🎯', '✅'],
    'pipe-operator': ['➡️', '🔄', '🔗'],
    'oop-to-fp': ['⚙️', '💎', '🔗'],
    'classes-to-records': ['📦', '💎', '🎯'],
    'inheritance-to-composition': ['🔗', '🧩', '📦'],
    'state-machines': ['🌿', '🧩', '✅'],
    'data-modeling': ['🧩', '📦', '🎯']
  };

  return mapping[patternCategory] || ['💡'];
}
