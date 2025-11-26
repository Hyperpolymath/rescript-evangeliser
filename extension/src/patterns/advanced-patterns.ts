/**
 * Advanced Patterns - Additional 25+ patterns
 * Part 2 of the pattern library
 */

import { Pattern } from '../types';

export const ADVANCED_PATTERNS: Pattern[] = [
  // ============================================================================
  // CONDITIONALS & PATTERN MATCHING (5 patterns)
  // ============================================================================
  {
    id: 'ternary-basic',
    name: 'Ternary Operator',
    category: 'conditionals',
    difficulty: 'beginner',
    jsPattern: /\w+\s*\?\s*[^:]+\s*:\s*[^;]+/,
    confidence: 0.85,
    jsExample: `const status = isActive ? 'active' : 'inactive';`,
    rescriptExample: `let status = isActive ? "active" : "inactive"`,
    narrative: {
      celebrate: "Nice use of ternary - concise conditional logic!",
      minimize: "Works great, though nested ternaries can get confusing...",
      better: "ReScript supports ternary, but also has pattern matching for complex cases!",
      safety: "Both branches must return the same type.",
      example: "Type-safe ternary with guaranteed type consistency!"
    },
    glyphs: ['🌿', '🎯'],
    tags: ['ternary', 'conditional'],
    relatedPatterns: ['switch-statement'],
    learningObjectives: ['Ternary in ReScript', 'Type consistency'],
    commonMistakes: ['Different types in branches'],
    bestPractices: ['Use pattern matching for complex conditions']
  },

  {
    id: 'switch-statement',
    name: 'Switch Statement',
    category: 'conditionals',
    difficulty: 'intermediate',
    jsPattern: /switch\s*\([^)]+\)\s*{[\s\S]*?case\s+/,
    confidence: 0.9,
    jsExample: `switch (status) {
  case 'pending':
    return 'Waiting';
  case 'active':
    return 'Running';
  default:
    return 'Unknown';
}`,
    rescriptExample: `switch status {
| "pending" => "Waiting"
| "active" => "Running"
| _ => "Unknown"
}`,
    narrative: {
      celebrate: "Good use of switch for multiple cases!",
      minimize: "Works well, though it's possible to forget a case...",
      better: "ReScript's switch is an expression with exhaustiveness checking!",
      safety: "Compiler ensures all cases are covered.",
      example: "Exhaustive pattern matching prevents bugs!"
    },
    glyphs: ['🌿', '🎯', '✅'],
    tags: ['switch', 'pattern-matching'],
    relatedPatterns: ['variant-types'],
    learningObjectives: ['Switch expressions', 'Exhaustiveness'],
    commonMistakes: ['Missing cases', 'Forgetting break'],
    bestPractices: ['Use switch expressions, leverage exhaustiveness']
  },

  {
    id: 'if-else-chain',
    name: 'If/Else Chain',
    category: 'conditionals',
    difficulty: 'beginner',
    jsPattern: /if\s*\([^)]+\)\s*{[\s\S]*?}\s*else\s+if\s*\([^)]+\)/,
    confidence: 0.8,
    jsExample: `if (score >= 90) {
  return 'A';
} else if (score >= 80) {
  return 'B';
} else {
  return 'C';
}`,
    rescriptExample: `if score >= 90 {
  "A"
} else if score >= 80 {
  "B"
} else {
  "C"
}`,
    narrative: {
      celebrate: "Clear conditional logic with if/else!",
      minimize: "It works, though pattern matching might be clearer...",
      better: "ReScript's if/else are expressions that return values!",
      safety: "All branches must return the same type.",
      example: "If as expression with type safety!"
    },
    glyphs: ['🌿', '➡️'],
    tags: ['if-else', 'conditional'],
    relatedPatterns: ['switch-statement'],
    learningObjectives: ['If as expression'],
    commonMistakes: ['Inconsistent return types'],
    bestPractices: ['Consider switch for many conditions']
  },

  {
    id: 'early-return',
    name: 'Early Return Pattern',
    category: 'conditionals',
    difficulty: 'intermediate',
    jsPattern: /if\s*\([^)]+\)\s*{\s*return\s+[^}]+}\s*(?!else)/,
    confidence: 0.75,
    jsExample: `function process(data) {
  if (!data) return null;
  if (data.invalid) return null;
  return transform(data);
}`,
    rescriptExample: `let process = data => {
  switch data {
  | None => None
  | Some(d) if d.invalid => None
  | Some(d) => Some(transform(d))
  }
}`,
    narrative: {
      celebrate: "Smart use of early returns to handle edge cases!",
      minimize: "Works well, though guards can be scattered...",
      better: "ReScript's pattern matching with guards consolidates checks!",
      safety: "Exhaustiveness ensures all cases handled.",
      example: "Pattern matching with guards is cleaner!"
    },
    glyphs: ['🌿', '🛡️'],
    tags: ['early-return', 'guard'],
    relatedPatterns: ['guard-clause'],
    learningObjectives: ['Pattern guards', 'When clauses'],
    commonMistakes: ['Missing edge cases'],
    bestPractices: ['Use pattern matching over scattered guards']
  },

  {
    id: 'logical-or-default',
    name: 'Logical OR for Default',
    category: 'conditionals',
    difficulty: 'beginner',
    jsPattern: /\w+\s*\|\|\s*[\w'"]+/,
    confidence: 0.7,
    jsExample: `const name = userName || 'Guest';`,
    rescriptExample: `let name = userName->Option.getOr("Guest")`,
    narrative: {
      celebrate: "Classic JavaScript pattern for defaults!",
      minimize: "Works, but || can be tricky with falsy values (0, '')...",
      better: "ReScript's Option.getOr is explicit about None vs falsy!",
      safety: "Only handles None, not other falsy values.",
      example: "Option.getOr is clearer than ||!"
    },
    glyphs: ['🛡️', '🎯'],
    tags: ['default', 'logical-or'],
    relatedPatterns: ['nullish-coalescing'],
    learningObjectives: ['Option vs falsy values'],
    commonMistakes: ['Using || with 0 or empty string'],
    bestPractices: ['Use Option.getOr or ??']
  },

  // ============================================================================
  // FUNCTIONAL PROGRAMMING PATTERNS (6 patterns)
  // ============================================================================
  {
    id: 'pure-function',
    name: 'Pure Function',
    category: 'functional',
    difficulty: 'intermediate',
    jsPattern: (code: string) => {
      // Simple heuristic: function with no this, no external mutations
      return /function\s+\w+\([^)]*\)\s*{[^}]*return\s+/.test(code) &&
             !/\bthis\./.test(code);
    },
    confidence: 0.6,
    jsExample: `function add(a, b) {
  return a + b;
}`,
    rescriptExample: `let add = (a, b) => a + b`,
    narrative: {
      celebrate: "Perfect! Pure functions are the foundation of FP!",
      minimize: "JavaScript doesn't enforce purity, so mutations can sneak in...",
      better: "ReScript makes immutability default - purity is natural!",
      safety: "Immutable by default prevents accidental mutations.",
      example: "Pure functions with enforced immutability!"
    },
    glyphs: ['⚙️', '💎', '🎯'],
    tags: ['pure', 'function', 'immutable'],
    relatedPatterns: ['immutable-data'],
    learningObjectives: ['Pure functions', 'Immutability'],
    commonMistakes: ['Hidden mutations', 'Side effects'],
    bestPractices: ['Avoid mutations, return new values']
  },

  {
    id: 'higher-order-function',
    name: 'Higher-Order Function',
    category: 'functional',
    difficulty: 'intermediate',
    jsPattern: /function\s+\w+\([^)]*\)\s*{[\s\S]*?return\s+(?:function|\([^)]*\)\s*=>)/,
    confidence: 0.75,
    jsExample: `function multiplier(factor) {
  return (number) => number * factor;
}`,
    rescriptExample: `let multiplier = factor => number => number * factor`,
    narrative: {
      celebrate: "Excellent! Higher-order functions - advanced FP!",
      minimize: "Works great, ReScript just has cleaner syntax...",
      better: "ReScript's concise arrow syntax makes HOFs natural!",
      safety: "Full type inference for nested functions.",
      example: "Type-safe function composition!"
    },
    glyphs: ['⚙️', '🔗', '🎯'],
    tags: ['higher-order', 'closure', 'function'],
    relatedPatterns: ['curry-function'],
    learningObjectives: ['Higher-order functions', 'Closures'],
    commonMistakes: ['Type annotations needed in complex cases'],
    bestPractices: ['Embrace currying and composition']
  },

  {
    id: 'curry-function',
    name: 'Curried Function',
    category: 'functional',
    difficulty: 'advanced',
    jsPattern: /=>\s*(?:\w+|\([^)]*\))\s*=>/,
    confidence: 0.8,
    jsExample: `const add = a => b => a + b;
const add5 = add(5);`,
    rescriptExample: `let add = (a, b) => a + b
let add5 = add(5)`,
    narrative: {
      celebrate: "Advanced! Currying enables partial application!",
      minimize: "Manual currying in JS can be verbose...",
      better: "ReScript automatically curries multi-parameter functions!",
      safety: "Type system understands currying natively.",
      example: "Built-in currying with full type safety!"
    },
    glyphs: ['⚙️', '🔗', '🎯'],
    tags: ['curry', 'partial-application'],
    relatedPatterns: ['higher-order-function'],
    learningObjectives: ['Currying', 'Partial application'],
    commonMistakes: ['Not understanding automatic currying'],
    bestPractices: ['Leverage automatic currying']
  },

  {
    id: 'compose-functions',
    name: 'Function Composition',
    category: 'functional',
    difficulty: 'advanced',
    jsPattern: /compose|pipe/,
    confidence: 0.7,
    jsExample: `const transform = compose(
  trim,
  toLowerCase,
  removeSpaces
);`,
    rescriptExample: `let transform = str =>
  str->trim->toLowerCase->removeSpaces`,
    narrative: {
      celebrate: "Expert level! Function composition for data pipelines!",
      minimize: "Compose utilities work, but pipe operator is clearer...",
      better: "ReScript's -> operator makes composition natural and readable!",
      safety: "Type system ensures pipeline compatibility.",
      example: "Native pipe operator for clean composition!"
    },
    glyphs: ['🔗', '➡️', '⚙️'],
    tags: ['compose', 'pipe', 'pipeline'],
    relatedPatterns: ['pipe-operator'],
    learningObjectives: ['Pipe operator', 'Data pipelines'],
    commonMistakes: ['Type mismatches in pipeline'],
    bestPractices: ['Use -> for left-to-right flow']
  },

  {
    id: 'immutable-data',
    name: 'Immutable Data Patterns',
    category: 'functional',
    difficulty: 'intermediate',
    jsPattern: /\.\.\.[\w.]+/,
    confidence: 0.6,
    jsExample: `const updated = {
  ...user,
  name: newName
};`,
    rescriptExample: `let updated = {
  ...user,
  name: newName
}`,
    narrative: {
      celebrate: "Great! Using spread for immutable updates!",
      minimize: "Spread works, but it's not enforced - mutations still possible...",
      better: "ReScript enforces immutability - updates must use spread!",
      safety: "Can't mutate records without explicit mutation marker.",
      example: "Immutability by default prevents bugs!"
    },
    glyphs: ['💎', '🔄', '📦'],
    tags: ['immutable', 'spread', 'record'],
    relatedPatterns: ['pure-function'],
    learningObjectives: ['Record updates', 'Immutability'],
    commonMistakes: ['Accidental mutations'],
    bestPractices: ['Always use record spread for updates']
  },

  {
    id: 'recursion-pattern',
    name: 'Recursion',
    category: 'functional',
    difficulty: 'advanced',
    jsPattern: /function\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?\1\s*\(/,
    confidence: 0.8,
    jsExample: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    rescriptExample: `let rec factorial = n =>
  if n <= 1 {
    1
  } else {
    n * factorial(n - 1)
  }`,
    narrative: {
      celebrate: "Excellent recursion! FP at its core!",
      minimize: "Works great, ReScript just requires 'rec' keyword...",
      better: "ReScript's 'rec' makes recursion explicit and optimized!",
      safety: "Tail-call optimization when possible.",
      example: "Explicit recursion with optimizations!"
    },
    glyphs: ['♻️', '⚙️', '🔄'],
    tags: ['recursion', 'tail-call'],
    relatedPatterns: ['array-reduce'],
    learningObjectives: ['Recursion', 'Tail-call optimization'],
    commonMistakes: ['Stack overflow without TCO'],
    bestPractices: ['Use tail-recursion when possible']
  },

  // ============================================================================
  // VARIANT & TYPE PATTERNS (5 patterns)
  // ============================================================================
  {
    id: 'union-type-simulation',
    name: 'Union Type with Discriminator',
    category: 'variants',
    difficulty: 'intermediate',
    jsPattern: /type\s*:\s*['"][\w-]+['"]/,
    confidence: 0.7,
    jsExample: `const result = { type: 'success', data: value };
// or
const error = { type: 'error', message: msg };`,
    rescriptExample: `type result<'a, 'e> =
  | Ok('a)
  | Error('e)

let result = Ok(value)`,
    narrative: {
      celebrate: "Smart! Using type tags to simulate union types!",
      minimize: "Works, but TypeScript can't enforce all cases are handled...",
      better: "ReScript's variant types are native with exhaustiveness checking!",
      safety: "Compiler ensures switch handles all variants.",
      example: "First-class variant types with safety!"
    },
    glyphs: ['🧩', '🌿', '🎯'],
    tags: ['variant', 'union', 'discriminated'],
    relatedPatterns: ['error-result-type'],
    learningObjectives: ['Variant types', 'Pattern matching'],
    commonMistakes: ['Misspelling type tags', 'Missing cases'],
    bestPractices: ['Use variant types for tagged unions']
  },

  {
    id: 'enum-pattern',
    name: 'Enum Simulation',
    category: 'variants',
    difficulty: 'beginner',
    jsPattern: /const\s+\w+\s*=\s*{\s*[\w\s:'"]+,/,
    confidence: 0.6,
    jsExample: `const Status = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DONE: 'done'
};`,
    rescriptExample: `type status =
  | Pending
  | Active
  | Done`,
    narrative: {
      celebrate: "Good! Using objects as enums - a common JS pattern!",
      minimize: "Works, but values are just strings - no type safety...",
      better: "ReScript's variant types are true enums with compiler support!",
      safety: "Can't use invalid enum values - compile error.",
      example: "Type-safe enums with exhaustive matching!"
    },
    glyphs: ['🧩', '🎯', '🔒'],
    tags: ['enum', 'variant', 'constant'],
    relatedPatterns: ['union-type-simulation'],
    learningObjectives: ['Variant types as enums'],
    commonMistakes: ['Using string constants instead of variants'],
    bestPractices: ['Use variant types for enums']
  },

  {
    id: 'state-machine',
    name: 'State Machine Pattern',
    category: 'state-machines',
    difficulty: 'advanced',
    jsPattern: /state|transition|setState/,
    confidence: 0.5,
    jsExample: `let state = 'idle';
function transition(event) {
  if (state === 'idle' && event === 'start') {
    state = 'running';
  }
}`,
    rescriptExample: `type state = Idle | Running | Done

type event = Start | Stop | Reset

let transition = (state, event) =>
  switch (state, event) {
  | (Idle, Start) => Running
  | (Running, Stop) => Done
  | (_, Reset) => Idle
  | _ => state
  }`,
    narrative: {
      celebrate: "Advanced! You're building a state machine!",
      minimize: "Works, but invalid transitions aren't prevented...",
      better: "ReScript's variants make state machines type-safe!",
      safety: "Impossible states are impossible to represent.",
      example: "Type-safe state machines with variants!"
    },
    glyphs: ['🧩', '🌿', '🎯'],
    tags: ['state-machine', 'variant', 'fsm'],
    relatedPatterns: ['union-type-simulation'],
    learningObjectives: ['State machines', 'Impossible states'],
    commonMistakes: ['Invalid state transitions'],
    bestPractices: ['Model states as variants']
  },

  {
    id: 'option-type-pattern',
    name: 'Optional Values Pattern',
    category: 'type-safety',
    difficulty: 'intermediate',
    jsPattern: (code) => code.includes('| undefined') || code.includes('| null'),
    confidence: 0.6,
    jsExample: `function findUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}`,
    rescriptExample: `let findUser = (id: int): option<user> => {
  users->Array.find(u => u.id == id)
}`,
    narrative: {
      celebrate: "Good TypeScript! Using union with undefined for optionals!",
      minimize: "Works, but | undefined must be in every signature...",
      better: "ReScript's Option type is built-in and automatic!",
      safety: "Option is the standard way to represent optionality.",
      example: "First-class Option type for all nullable values!"
    },
    glyphs: ['🛡️', '🧩', '💡'],
    tags: ['option', 'type-safety', 'nullable'],
    relatedPatterns: ['null-check-basic'],
    learningObjectives: ['Option type', 'Type-safe optionality'],
    commonMistakes: ['Forgetting | undefined'],
    bestPractices: ['Always use Option for nullable values']
  },

  {
    id: 'type-guard',
    name: 'Type Guard',
    category: 'type-safety',
    difficulty: 'intermediate',
    jsPattern: /function\s+is\w+\([^)]+\):\s*\w+\s+is\s+\w+/,
    confidence: 0.85,
    jsExample: `function isString(value: unknown): value is string {
  return typeof value === 'string';
}`,
    rescriptExample: `// ReScript has structural typing
// Type guards aren't needed - pattern matching suffices
switch value {
| String(s) => /* use s as string */
| _ => /* other types */
}`,
    narrative: {
      celebrate: "TypeScript type guards - you know advanced typing!",
      minimize: "They work, but you need a function for each type check...",
      better: "ReScript's pattern matching does type narrowing automatically!",
      safety: "Pattern matching narrows types without explicit guards.",
      example: "Built-in type narrowing through patterns!"
    },
    glyphs: ['🎯', '🛡️', '🌿'],
    tags: ['type-guard', 'type-safety', 'narrowing'],
    relatedPatterns: ['switch-statement'],
    learningObjectives: ['Pattern matching for types'],
    commonMistakes: ['Unnecessary type guards'],
    bestPractices: ['Use pattern matching over type guards']
  },

  // ============================================================================
  // DESTRUCTURING & DATA ACCESS PATTERNS (4 patterns)
  // ============================================================================
  {
    id: 'object-destructuring',
    name: 'Object Destructuring',
    category: 'destructuring',
    difficulty: 'beginner',
    jsPattern: /(?:const|let|var)\s*{\s*[\w,\s]+}\s*=/,
    confidence: 0.9,
    jsExample: `const { name, age } = user;`,
    rescriptExample: `let {name, age} = user`,
    narrative: {
      celebrate: "Great! Destructuring is clean and modern!",
      minimize: "Works perfectly, ReScript syntax is nearly identical...",
      better: "ReScript's destructuring is fully type-checked!",
      safety: "Compiler ensures destructured fields exist.",
      example: "Type-safe destructuring with compile-time checks!"
    },
    glyphs: ['📦', '🔑', '🎯'],
    tags: ['destructuring', 'object', 'record'],
    relatedPatterns: ['array-destructuring'],
    learningObjectives: ['Record destructuring'],
    commonMistakes: ['Destructuring non-existent fields'],
    bestPractices: ['Use destructuring for clean code']
  },

  {
    id: 'array-destructuring',
    name: 'Array Destructuring',
    category: 'destructuring',
    difficulty: 'beginner',
    jsPattern: /(?:const|let|var)\s*\[\s*[\w,\s]+\]\s*=/,
    confidence: 0.9,
    jsExample: `const [first, second] = items;`,
    rescriptExample: `let [first, second] = items`,
    narrative: {
      celebrate: "Perfect array destructuring!",
      minimize: "Works great, ReScript adds pattern matching power...",
      better: "ReScript's destructuring integrates with pattern matching!",
      safety: "Type system ensures correct number of elements.",
      example: "Destructuring with exhaustive patterns!"
    },
    glyphs: ['📚', '🔑', '🎯'],
    tags: ['destructuring', 'array', 'pattern'],
    relatedPatterns: ['object-destructuring'],
    learningObjectives: ['Array patterns'],
    commonMistakes: ['Wrong number of bindings'],
    bestPractices: ['Match against array length']
  },

  {
    id: 'rest-parameters',
    name: 'Rest Parameters',
    category: 'destructuring',
    difficulty: 'intermediate',
    jsPattern: /\.\.\.\w+/,
    confidence: 0.8,
    jsExample: `function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}`,
    rescriptExample: `// ReScript doesn't have rest params
// Use array directly
let sum = numbers => {
  numbers->Array.reduce(0, (a, b) => a + b)
}`,
    narrative: {
      celebrate: "Good use of rest parameters for variadic functions!",
      minimize: "Works, but rest params can obscure the API...",
      better: "ReScript prefers explicit arrays - clearer and type-safe!",
      safety: "Explicit array types are clearer than rest params.",
      example: "Explicit arrays over implicit rest!"
    },
    glyphs: ['📚', '🔄', '⚙️'],
    tags: ['rest', 'variadic', 'parameters'],
    relatedPatterns: ['array-reduce'],
    learningObjectives: ['Arrays vs rest parameters'],
    commonMistakes: ['Overusing rest params'],
    bestPractices: ['Use explicit array parameters']
  },

  {
    id: 'nested-destructuring',
    name: 'Nested Destructuring',
    category: 'destructuring',
    difficulty: 'intermediate',
    jsPattern: /{\s*\w+\s*:\s*{/,
    confidence: 0.7,
    jsExample: `const { user: { name, email } } = response;`,
    rescriptExample: `let {user: {name, email}} = response`,
    narrative: {
      celebrate: "Advanced destructuring - very clean!",
      minimize: "Works, but can fail if nested value is undefined...",
      better: "ReScript's destructuring with Option handles missing nested values!",
      safety: "Compiler tracks nested optional values.",
      example: "Safe nested destructuring with Option!"
    },
    glyphs: ['📦', '🔗', '🛡️'],
    tags: ['destructuring', 'nested', 'record'],
    relatedPatterns: ['object-destructuring'],
    learningObjectives: ['Nested patterns', 'Optional fields'],
    commonMistakes: ['Not handling undefined nested values'],
    bestPractices: ['Use Option for nested optionals']
  },

  // ============================================================================
  // MODULES & ORGANIZATION PATTERNS (3 patterns)
  // ============================================================================
  {
    id: 'es6-import',
    name: 'ES6 Import',
    category: 'modules',
    difficulty: 'beginner',
    jsPattern: /import\s+.*\s+from\s+['"]/,
    confidence: 0.95,
    jsExample: `import { useState } from 'react';`,
    rescriptExample: `// ReScript modules are automatic
// Each file is a module
// Use module name directly: React.useState`,
    narrative: {
      celebrate: "Modern ES6 imports - you know module systems!",
      minimize: "Works great, though import paths can be fragile...",
      better: "ReScript's modules are automatic - no import needed!",
      safety: "Compiler ensures all modules exist.",
      example: "Automatic modules with compile-time verification!"
    },
    glyphs: ['📦', '🔗', '🎯'],
    tags: ['import', 'module', 'es6'],
    relatedPatterns: ['es6-export'],
    learningObjectives: ['Automatic modules', 'Module references'],
    commonMistakes: ['Unnecessary imports'],
    bestPractices: ['Each file is a module automatically']
  },

  {
    id: 'es6-export',
    name: 'ES6 Export',
    category: 'modules',
    difficulty: 'beginner',
    jsPattern: /export\s+(?:default|const|function|class)/,
    confidence: 0.95,
    jsExample: `export const add = (a, b) => a + b;`,
    rescriptExample: `// All top-level bindings are exported
let add = (a, b) => a + b`,
    narrative: {
      celebrate: "Clean exports - good module design!",
      minimize: "Works well, though managing exports can be tedious...",
      better: "ReScript exports everything by default - simpler!",
      safety: "Use .resi files to control public API.",
      example: "Exports by default with interface files for privacy!"
    },
    glyphs: ['📦', '🔑', '🎯'],
    tags: ['export', 'module', 'public'],
    relatedPatterns: ['es6-import'],
    learningObjectives: ['Module exports', 'Interface files'],
    commonMistakes: ['Forgetting exports'],
    bestPractices: ['Use .resi for public API control']
  },

  {
    id: 'namespace-pattern',
    name: 'Namespace Pattern',
    category: 'modules',
    difficulty: 'intermediate',
    jsPattern: /const\s+\w+\s*=\s*{\s*[\w\s:,()=>{}]+};/,
    confidence: 0.5,
    jsExample: `const Utils = {
  format: (str) => str.trim(),
  parse: (num) => parseInt(num)
};`,
    rescriptExample: `module Utils = {
  let format = str => String.trim(str)
  let parse = num => Int.fromString(num)
}`,
    narrative: {
      celebrate: "Good namespacing to organize related functions!",
      minimize: "Works, but object namespaces aren't true modules...",
      better: "ReScript's module system is first-class!",
      safety: "Modules are checked at compile time.",
      example: "First-class modules with type safety!"
    },
    glyphs: ['📦', '🔒', '🎯'],
    tags: ['namespace', 'module', 'organization'],
    relatedPatterns: ['es6-export'],
    learningObjectives: ['Module syntax', 'Module nesting'],
    commonMistakes: ['Using objects instead of modules'],
    bestPractices: ['Use proper modules, not object namespaces']
  },

  // ============================================================================
  // STRING & TEMPLATE PATTERNS (2 patterns)
  // ============================================================================
  {
    id: 'template-literals',
    name: 'Template Literals',
    category: 'templates',
    difficulty: 'beginner',
    jsPattern: /`[^`]*\$\{[^}]+\}[^`]*`/,
    confidence: 0.95,
    jsExample: `const greeting = \`Hello, \${name}!\`;`,
    rescriptExample: `let greeting = \`Hello, \${name}!\``,
    narrative: {
      celebrate: "Perfect! Template literals are so much better than concatenation!",
      minimize: "Works exactly the same in ReScript...",
      better: "ReScript supports template literals with full type safety!",
      safety: "Interpolated values are type-checked.",
      example: "Type-safe string interpolation!"
    },
    glyphs: ['🔄', '➡️'],
    tags: ['template', 'string', 'interpolation'],
    relatedPatterns: ['string-concatenation'],
    learningObjectives: ['Template literals in ReScript'],
    commonMistakes: ['Complex expressions in templates'],
    bestPractices: ['Keep template expressions simple']
  },

  {
    id: 'string-concatenation',
    name: 'String Concatenation',
    category: 'templates',
    difficulty: 'beginner',
    jsPattern: /['"].*['"]\s*\+\s*\w+\s*\+/,
    confidence: 0.8,
    jsExample: `const message = 'Hello, ' + name + '!';`,
    rescriptExample: `let message = "Hello, " ++ name ++ "!"
// or better:
let message = \`Hello, \${name}!\``,
    narrative: {
      celebrate: "Classic string building - it works!",
      minimize: "Concatenation can get verbose with many parts...",
      better: "ReScript has ++ for concat, but template literals are cleaner!",
      safety: "Type system ensures you're concatenating strings.",
      example: "Type-safe string operations!"
    },
    glyphs: ['🔗', '🔄'],
    tags: ['string', 'concatenation'],
    relatedPatterns: ['template-literals'],
    learningObjectives: ['String operators', 'Template literals'],
    commonMistakes: ['Using + instead of ++'],
    bestPractices: ['Prefer template literals over ++ chains']
  },

];
