/**
 * Pattern Library for ReScript Evangeliser
 *
 * 50+ transformation patterns from JavaScript/TypeScript to ReScript
 * Organized by category and difficulty level
 */

import { Pattern, PatternCategory, DifficultyLevel } from '../types';
import { getGlyphsForPattern } from '../glyphs';
import { ADVANCED_PATTERNS } from './advanced-patterns';

/**
 * Basic patterns - 29 fundamental transformation patterns
 */
const BASIC_PATTERNS: Pattern[] = [
  // ============================================================================
  // NULL SAFETY PATTERNS (8 patterns)
  // ============================================================================
  {
    id: 'null-check-basic',
    name: 'Basic Null Check',
    category: 'null-safety',
    difficulty: 'beginner',
    jsPattern: /if\s*\(\s*(\w+)\s*!==?\s*null\s*&&\s*\1\s*!==?\s*undefined\s*\)/,
    confidence: 0.9,
    jsExample: `if (user !== null && user !== undefined) {
  console.log(user.name);
}`,
    rescriptExample: `switch user {
| Some(u) => Js.log(u.name)
| None => ()
}`,
    narrative: {
      celebrate: "You're checking for null and undefined - that's great defensive programming!",
      minimize: "The only small thing is that it's easy to forget one of these checks somewhere...",
      better: "ReScript's Option type makes null safety automatic - you literally can't forget a check!",
      safety: "The compiler won't let your code compile until you've handled both Some and None cases.",
      example: "Option types eliminate an entire class of 'Cannot read property of undefined' errors!"
    },
    glyphs: getGlyphsForPattern('null-safety'),
    tags: ['null', 'undefined', 'option', 'safety'],
    relatedPatterns: ['null-check-ternary', 'optional-chaining'],
    learningObjectives: [
      'Understand Option<\'a> type',
      'Pattern matching for null safety',
      'Exhaustiveness checking'
    ],
    commonMistakes: [
      'Forgetting to handle None case',
      'Using null instead of None'
    ],
    bestPractices: [
      'Always use Option for nullable values',
      'Use pattern matching to handle all cases',
      'Prefer Option.map over explicit pattern matching'
    ]
  },

  {
    id: 'null-check-ternary',
    name: 'Null Check Ternary',
    category: 'null-safety',
    difficulty: 'beginner',
    jsPattern: /(\w+)\s*\?\s*(\w+)\.\w+\s*:\s*['"]\w+['"]|null|undefined/,
    confidence: 0.85,
    jsExample: `const name = user ? user.name : 'Guest';`,
    rescriptExample: `let name = user->Option.mapOr("Guest", u => u.name)`,
    narrative: {
      celebrate: "Nice! You're using a ternary to handle the null case - that's concise!",
      minimize: "It works great, though it can get verbose with nested checks...",
      better: "ReScript's Option.mapOr does this in one line with type safety!",
      safety: "The compiler ensures the default value matches the expected type.",
      example: "Option.mapOr handles the None case automatically!"
    },
    glyphs: ['🛡️', '🎯', '➡️'],
    tags: ['ternary', 'default', 'option'],
    relatedPatterns: ['null-check-basic', 'default-params'],
    learningObjectives: ['Option.mapOr function', 'Type-safe defaults'],
    commonMistakes: ['Wrong default type'],
    bestPractices: ['Use Option.mapOr for simple defaults']
  },

  {
    id: 'optional-chaining',
    name: 'Optional Chaining',
    category: 'null-safety',
    difficulty: 'intermediate',
    jsPattern: /\w+\?\.[\w.?]+/,
    confidence: 0.95,
    jsExample: `const city = user?.address?.city;`,
    rescriptExample: `let city = user->Option.flatMap(u => u.address)
  ->Option.map(a => a.city)`,
    narrative: {
      celebrate: "Excellent! You're using optional chaining - you know modern JavaScript!",
      minimize: "It's really nice, though the result can still be undefined...",
      better: "ReScript's Option.flatMap chains safely and the type tells you it's optional!",
      safety: "The type system tracks the optionality through the entire chain.",
      example: "Chain Option operations with flatMap and map!"
    },
    glyphs: ['🛡️', '🔗', '➡️'],
    tags: ['optional-chaining', 'nested', 'option'],
    relatedPatterns: ['null-check-basic'],
    learningObjectives: ['Option.flatMap', 'Chaining optional values'],
    commonMistakes: ['Using map instead of flatMap'],
    bestPractices: ['Use flatMap for nested Options']
  },

  {
    id: 'nullish-coalescing',
    name: 'Nullish Coalescing',
    category: 'null-safety',
    difficulty: 'beginner',
    jsPattern: /\w+\s*\?\?\s*[\w'"]+/,
    confidence: 0.9,
    jsExample: `const name = userName ?? 'Anonymous';`,
    rescriptExample: `let name = userName->Option.getOr("Anonymous")`,
    narrative: {
      celebrate: "Great use of the nullish coalescing operator - modern JavaScript!",
      minimize: "It's perfect for defaults, though the type doesn't capture the optionality...",
      better: "ReScript's Option.getOr is explicit about optionality in the type!",
      safety: "The type signature tells you exactly when a value might be absent.",
      example: "Option.getOr provides type-safe default values!"
    },
    glyphs: ['🛡️', '🎯'],
    tags: ['nullish', 'default', 'option'],
    relatedPatterns: ['default-params'],
    learningObjectives: ['Option.getOr', 'Default values'],
    commonMistakes: ['Confusing with || operator'],
    bestPractices: ['Use getOr for simple defaults']
  },

  {
    id: 'guard-clause',
    name: 'Guard Clause for Null',
    category: 'null-safety',
    difficulty: 'beginner',
    jsPattern: /if\s*\(\s*!\s*\w+\s*\)\s*{\s*return/,
    confidence: 0.8,
    jsExample: `if (!user) {
  return null;
}
// use user`,
    rescriptExample: `switch user {
| None => None
| Some(u) => /* use u */
}`,
    narrative: {
      celebrate: "Good use of guard clauses - you're preventing null reference errors!",
      minimize: "It works, though it's possible to forget a guard somewhere...",
      better: "ReScript's pattern matching makes guards exhaustive - can't forget them!",
      safety: "Compiler ensures all paths are handled.",
      example: "Pattern matching replaces guard clauses with exhaustiveness!"
    },
    glyphs: ['🛡️', '🌿'],
    tags: ['guard', 'early-return', 'option'],
    relatedPatterns: ['null-check-basic'],
    learningObjectives: ['Pattern matching', 'Early returns with Option'],
    commonMistakes: ['Forgetting to handle all cases'],
    bestPractices: ['Use pattern matching over guards']
  },

  {
    id: 'undefined-check',
    name: 'Typeof Undefined Check',
    category: 'null-safety',
    difficulty: 'beginner',
    jsPattern: /typeof\s+\w+\s*!==?\s*['"]undefined['"]/,
    confidence: 0.85,
    jsExample: `if (typeof value !== 'undefined') {
  return value;
}`,
    rescriptExample: `switch value {
| Some(v) => Some(v)
| None => None
}`,
    narrative: {
      celebrate: "You're using typeof to check for undefined - defensive programming!",
      minimize: "It works, but typeof checks are a bit verbose...",
      better: "ReScript's Option type eliminates the need for typeof checks entirely!",
      safety: "The type system prevents undefined values at compile time.",
      example: "No more typeof needed - the type tells you everything!"
    },
    glyphs: ['🛡️', '🎯'],
    tags: ['typeof', 'undefined', 'option'],
    relatedPatterns: ['null-check-basic'],
    learningObjectives: ['Option replaces runtime checks'],
    commonMistakes: ['Mixing null and undefined checks'],
    bestPractices: ['Use Option, not typeof']
  },

  {
    id: 'logical-and-null',
    name: 'Logical AND Null Check',
    category: 'null-safety',
    difficulty: 'beginner',
    jsPattern: /\w+\s*&&\s*\w+\.\w+/,
    confidence: 0.7,
    jsExample: `const name = user && user.name;`,
    rescriptExample: `let name = user->Option.map(u => u.name)`,
    narrative: {
      celebrate: "Smart use of && for short-circuit evaluation!",
      minimize: "It's concise, though the result type isn't always clear...",
      better: "ReScript's Option.map makes the optionality explicit in the type!",
      safety: "The type system tracks when values might be absent.",
      example: "Option.map safely extracts values from Option types!"
    },
    glyphs: ['🛡️', '🔄'],
    tags: ['logical-and', 'short-circuit', 'option'],
    relatedPatterns: ['null-check-basic'],
    learningObjectives: ['Option.map for transformations'],
    commonMistakes: ['Forgetting result might be undefined'],
    bestPractices: ['Prefer Option.map over && chains']
  },

  {
    id: 'default-empty-object',
    name: 'Default Empty Object',
    category: 'null-safety',
    difficulty: 'intermediate',
    jsPattern: /\w+\s*\|\|\s*\{\}/,
    confidence: 0.75,
    jsExample: `const config = userConfig || {};`,
    rescriptExample: `let config = userConfig->Option.getOr(defaultConfig)`,
    narrative: {
      celebrate: "Good use of || for default values - you're preventing errors!",
      minimize: "It works, though empty objects can cause issues elsewhere...",
      better: "ReScript requires explicit defaults with proper types!",
      safety: "The compiler ensures default values have the correct type.",
      example: "Type-safe defaults prevent runtime errors!"
    },
    glyphs: ['🛡️', '📦'],
    tags: ['default', 'object', 'option'],
    relatedPatterns: ['nullish-coalescing'],
    learningObjectives: ['Type-safe default objects'],
    commonMistakes: ['Using || with falsy values'],
    bestPractices: ['Define proper default values']
  },

  // ============================================================================
  // ASYNC PATTERNS (6 patterns)
  // ============================================================================
  {
    id: 'async-await-basic',
    name: 'Async/Await',
    category: 'async',
    difficulty: 'intermediate',
    jsPattern: /async\s+function|\basync\s*\(/,
    confidence: 0.95,
    jsExample: `async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  return await response.json();
}`,
    rescriptExample: `let fetchUser = async (id) => {
  let response = await fetch(\`/api/users/\${id}\`)
  await response->Response.json
}`,
    narrative: {
      celebrate: "Excellent! You're using async/await - much better than callbacks!",
      minimize: "It's great, though error handling can get scattered...",
      better: "ReScript has async/await with type-safe Promises!",
      safety: "Promise types are checked at compile time.",
      example: "Type-safe async operations prevent common Promise mistakes!"
    },
    glyphs: ['⏳', '🔄', '➡️'],
    tags: ['async', 'await', 'promise'],
    relatedPatterns: ['promise-then', 'try-catch-async'],
    learningObjectives: ['Async/await in ReScript', 'Promise types'],
    commonMistakes: ['Forgetting await', 'Missing error handling'],
    bestPractices: ['Always handle Promise rejections']
  },

  {
    id: 'promise-then',
    name: 'Promise Then Chain',
    category: 'async',
    difficulty: 'beginner',
    jsPattern: /\.then\s*\([^)]+\)/,
    confidence: 0.9,
    jsExample: `fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data));`,
    rescriptExample: `fetch("/api/data")
->Promise.then(res => res->Response.json)
->Promise.then(data => {
  Js.log(data)
  Promise.resolve()
})`,
    narrative: {
      celebrate: "Good use of Promise chains - you understand asynchronous flow!",
      minimize: "It works well, though deeply nested thens can be hard to read...",
      better: "ReScript's Promise.then with pipe operator makes chains more readable!",
      safety: "Promise types are tracked through the chain.",
      example: "Type-safe Promise chains with pipe operator!"
    },
    glyphs: ['⏳', '🔗', '➡️'],
    tags: ['promise', 'then', 'chain'],
    relatedPatterns: ['async-await-basic'],
    learningObjectives: ['Promise.then', 'Promise chaining'],
    commonMistakes: ['Forgetting to return Promise'],
    bestPractices: ['Consider async/await for readability']
  },

  {
    id: 'promise-all',
    name: 'Promise.all',
    category: 'async',
    difficulty: 'intermediate',
    jsPattern: /Promise\.all\s*\(/,
    confidence: 0.95,
    jsExample: `const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);`,
    rescriptExample: `let (users, posts) = await Promise.all2((
  fetchUsers(),
  fetchPosts()
))`,
    narrative: {
      celebrate: "Excellent! You're running promises in parallel - that's optimal!",
      minimize: "Perfect approach, ReScript just makes the types more explicit...",
      better: "ReScript's Promise.all2/all3 have type-safe tuple returns!",
      safety: "The compiler knows the exact types of all results.",
      example: "Type-safe parallel async operations!"
    },
    glyphs: ['⏳', '🔀', '🎯'],
    tags: ['promise', 'parallel', 'all'],
    relatedPatterns: ['async-await-basic'],
    learningObjectives: ['Promise.all with types', 'Parallel execution'],
    commonMistakes: ['Using sequential await instead of parallel'],
    bestPractices: ['Use Promise.all for independent operations']
  },

  {
    id: 'try-catch-async',
    name: 'Async Try/Catch',
    category: 'async',
    difficulty: 'intermediate',
    jsPattern: /try\s*{[^}]*await[^}]*}\s*catch/s,
    confidence: 0.85,
    jsExample: `try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error(error);
  return null;
}`,
    rescriptExample: `try {
  let data = await fetchData()
  data
} catch {
| Js.Exn.Error(e) => {
    Js.Console.error(e)
    None
  }
}`,
    narrative: {
      celebrate: "Great error handling with try/catch in async functions!",
      minimize: "It works, though the error type isn't always clear...",
      better: "ReScript's try/catch with pattern matching catches specific errors!",
      safety: "Pattern matching on error types is exhaustive.",
      example: "Type-safe error handling in async code!"
    },
    glyphs: ['⏳', '✅', '🛡️'],
    tags: ['async', 'try-catch', 'error'],
    relatedPatterns: ['error-result-type'],
    learningObjectives: ['Async error handling', 'Exception patterns'],
    commonMistakes: ['Catching all errors without handling'],
    bestPractices: ['Consider Result type for expected errors']
  },

  {
    id: 'promise-catch',
    name: 'Promise Catch',
    category: 'async',
    difficulty: 'beginner',
    jsPattern: /\.catch\s*\([^)]+\)/,
    confidence: 0.9,
    jsExample: `fetchData()
  .then(data => process(data))
  .catch(error => console.error(error));`,
    rescriptExample: `fetchData()
->Promise.then(data => process(data))
->Promise.catch(error => {
  Js.Console.error(error)
  Promise.resolve(defaultValue)
})`,
    narrative: {
      celebrate: "Good! You're handling Promise rejections with catch!",
      minimize: "It works, though error recovery isn't always type-safe...",
      better: "ReScript's Promise.catch ensures recovery values match expected types!",
      safety: "The compiler checks that catch returns the right Promise type.",
      example: "Type-safe error recovery in Promise chains!"
    },
    glyphs: ['⏳', '✅', '🔄'],
    tags: ['promise', 'catch', 'error'],
    relatedPatterns: ['try-catch-async'],
    learningObjectives: ['Promise error handling'],
    commonMistakes: ['Not returning a Promise from catch'],
    bestPractices: ['Always handle Promise rejections']
  },

  {
    id: 'promise-race',
    name: 'Promise.race',
    category: 'async',
    difficulty: 'advanced',
    jsPattern: /Promise\.race\s*\(/,
    confidence: 0.95,
    jsExample: `const result = await Promise.race([
  fetchFromCache(),
  fetchFromNetwork()
]);`,
    rescriptExample: `let result = await Promise.race([
  fetchFromCache(),
  fetchFromNetwork()
])`,
    narrative: {
      celebrate: "Advanced! You're racing promises - great for timeout patterns!",
      minimize: "It works perfectly, ReScript just adds type safety...",
      better: "ReScript's Promise.race ensures all promises have compatible types!",
      safety: "The compiler verifies all promises return the same type.",
      example: "Type-safe Promise racing for performance patterns!"
    },
    glyphs: ['⏳', '🚀', '🎯'],
    tags: ['promise', 'race', 'performance'],
    relatedPatterns: ['promise-all'],
    learningObjectives: ['Promise.race', 'Timeout patterns'],
    commonMistakes: ['Racing incompatible Promise types'],
    bestPractices: ['Use race for timeouts and fallbacks']
  },

  // ============================================================================
  // ERROR HANDLING PATTERNS (5 patterns)
  // ============================================================================
  {
    id: 'try-catch-basic',
    name: 'Basic Try/Catch',
    category: 'error-handling',
    difficulty: 'beginner',
    jsPattern: /try\s*{[^}]+}\s*catch\s*\([^)]*\)\s*{/s,
    confidence: 0.9,
    jsExample: `try {
  const result = riskyOperation();
  return result;
} catch (error) {
  console.error(error);
  return null;
}`,
    rescriptExample: `switch riskyOperation() {
| result => Ok(result)
| exception Js.Exn.Error(e) => Error(e)
}`,
    narrative: {
      celebrate: "Excellent error handling with try/catch - you're thinking defensively!",
      minimize: "It works great, though errors aren't part of the function signature...",
      better: "ReScript's Result type makes errors explicit in the type!",
      safety: "Callers must handle both Ok and Error cases.",
      example: "Result<success, error> makes error handling impossible to ignore!"
    },
    glyphs: ['✅', '🛡️', '🌿'],
    tags: ['try-catch', 'error', 'result'],
    relatedPatterns: ['error-result-type'],
    learningObjectives: ['Result type', 'Explicit error handling'],
    commonMistakes: ['Ignoring error cases'],
    bestPractices: ['Use Result for expected errors']
  },

  {
    id: 'error-result-type',
    name: 'Result Type Pattern',
    category: 'error-handling',
    difficulty: 'intermediate',
    jsPattern: /return\s*{\s*(?:success|ok|error)\s*:/,
    confidence: 0.7,
    jsExample: `function divide(a, b) {
  if (b === 0) {
    return { error: 'Division by zero' };
  }
  return { success: a / b };
}`,
    rescriptExample: `let divide = (a, b) => {
  if b == 0 {
    Error("Division by zero")
  } else {
    Ok(a / b)
  }
}`,
    narrative: {
      celebrate: "Smart! You're using an object to represent success/error - that's Result-like!",
      minimize: "It works, though the shape isn't enforced by types...",
      better: "ReScript's built-in Result type is exactly this, but type-safe!",
      safety: "The compiler ensures you handle both Ok and Error.",
      example: "Result<'a, 'error> is a first-class type!"
    },
    glyphs: ['✅', '🌿', '🎯'],
    tags: ['result', 'error', 'success'],
    relatedPatterns: ['try-catch-basic'],
    learningObjectives: ['Result type usage', 'Error as value'],
    commonMistakes: ['Inconsistent error shapes'],
    bestPractices: ['Always use Result for fallible operations']
  },

  {
    id: 'throw-error',
    name: 'Throw Error',
    category: 'error-handling',
    difficulty: 'beginner',
    jsPattern: /throw\s+new\s+Error\s*\(/,
    confidence: 0.95,
    jsExample: `if (!isValid) {
  throw new Error('Invalid input');
}`,
    rescriptExample: `if !isValid {
  Error("Invalid input")
} else {
  Ok(value)
}`,
    narrative: {
      celebrate: "You're throwing errors for invalid states - good defensive programming!",
      minimize: "It works, but exceptions aren't visible in function signatures...",
      better: "ReScript prefers Result types that make errors explicit!",
      safety: "Errors in the return type can't be ignored by callers.",
      example: "Result types document errors in function signatures!"
    },
    glyphs: ['✅', '🛡️'],
    tags: ['throw', 'error', 'exception'],
    relatedPatterns: ['error-result-type'],
    learningObjectives: ['Errors as values vs exceptions'],
    commonMistakes: ['Throwing exceptions for expected errors'],
    bestPractices: ['Use Result for expected errors, exceptions for bugs']
  },

  {
    id: 'error-first-callback',
    name: 'Error-First Callback',
    category: 'error-handling',
    difficulty: 'intermediate',
    jsPattern: /\(\s*err(?:or)?\s*,\s*\w+\s*\)\s*=>\s*{\s*if\s*\(\s*err/,
    confidence: 0.8,
    jsExample: `readFile(path, (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  process(data);
});`,
    rescriptExample: `readFile(path, result => {
  switch result {
  | Error(err) => Js.Console.error(err)
  | Ok(data) => process(data)
  }
})`,
    narrative: {
      celebrate: "Classic Node.js pattern - you know error-first callbacks!",
      minimize: "It works, though it's easy to forget the error check...",
      better: "ReScript's Result type with pattern matching makes the check mandatory!",
      safety: "Compiler won't let you access data without checking for errors.",
      example: "Pattern matching ensures error handling!"
    },
    glyphs: ['✅', '🌿', '⚙️'],
    tags: ['callback', 'error-first', 'node'],
    relatedPatterns: ['error-result-type'],
    learningObjectives: ['Result in callbacks', 'Error handling patterns'],
    commonMistakes: ['Forgetting to check error parameter'],
    bestPractices: ['Convert callbacks to Promises or Result']
  },

  {
    id: 'optional-error',
    name: 'Optional Error Return',
    category: 'error-handling',
    difficulty: 'intermediate',
    jsPattern: /return\s+(?:null|undefined)\s*;[\s\S]*catch/,
    confidence: 0.6,
    jsExample: `function parse(input) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}`,
    rescriptExample: `let parse = input => {
  try {
    Ok(JSON.parse(input))
  } catch {
  | _ => Error("Parse failed")
  }
}`,
    narrative: {
      celebrate: "You're returning null for errors - a simple error signaling approach!",
      minimize: "It works, though callers might forget to check for null...",
      better: "ReScript's Result type makes the possibility of failure explicit!",
      safety: "The type system forces callers to handle both success and failure.",
      example: "Result types are self-documenting error handling!"
    },
    glyphs: ['✅', '🛡️', 'Option'],
    tags: ['null', 'error', 'result'],
    relatedPatterns: ['error-result-type', 'null-check-basic'],
    learningObjectives: ['Result vs Option for errors'],
    commonMistakes: ['Using null instead of Result'],
    bestPractices: ['Use Result to carry error information']
  },

  // ============================================================================
  // ARRAY OPERATION PATTERNS (8 patterns)
  // ============================================================================
  {
    id: 'array-map',
    name: 'Array.map',
    category: 'array-operations',
    difficulty: 'beginner',
    jsPattern: /\.map\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
    confidence: 0.95,
    jsExample: `const doubled = numbers.map(n => n * 2);`,
    rescriptExample: `let doubled = numbers->Array.map(n => n * 2)`,
    narrative: {
      celebrate: "Perfect! Array.map is functional programming at its best!",
      minimize: "Nothing wrong here, ReScript just adds the pipe operator...",
      better: "ReScript's pipe operator makes data flow left-to-right!",
      safety: "Type inference ensures the transformation is type-safe.",
      example: "The -> operator makes transformations read like sentences!"
    },
    glyphs: ['🔄', '➡️', '📚'],
    tags: ['array', 'map', 'transform'],
    relatedPatterns: ['array-filter', 'array-reduce', 'pipe-operator'],
    learningObjectives: ['Array.map', 'Pipe operator'],
    commonMistakes: ['Side effects in map'],
    bestPractices: ['Keep map pure, use pipe for readability']
  },

  {
    id: 'array-filter',
    name: 'Array.filter',
    category: 'array-operations',
    difficulty: 'beginner',
    jsPattern: /\.filter\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
    confidence: 0.95,
    jsExample: `const evens = numbers.filter(n => n % 2 === 0);`,
    rescriptExample: `let evens = numbers->Array.filter(n => mod(n, 2) == 0)`,
    narrative: {
      celebrate: "Great use of filter - functional programming done right!",
      minimize: "Works perfectly, ReScript adds type-safe predicates...",
      better: "ReScript's type system ensures your predicate always returns bool!",
      safety: "The compiler checks that filter predicates return boolean.",
      example: "Type-safe filtering with pipe operator!"
    },
    glyphs: ['🔍', '➡️', '📚'],
    tags: ['array', 'filter', 'predicate'],
    relatedPatterns: ['array-map'],
    learningObjectives: ['Array.filter', 'Boolean predicates'],
    commonMistakes: ['Predicate returning non-boolean'],
    bestPractices: ['Keep predicates pure and simple']
  },

  {
    id: 'array-reduce',
    name: 'Array.reduce',
    category: 'array-operations',
    difficulty: 'intermediate',
    jsPattern: /\.reduce\s*\(\s*\([^)]*\)\s*=>/,
    confidence: 0.9,
    jsExample: `const sum = numbers.reduce((acc, n) => acc + n, 0);`,
    rescriptExample: `let sum = numbers->Array.reduce(0, (acc, n) => acc + n)`,
    narrative: {
      celebrate: "Excellent! Array.reduce is a powerful functional pattern!",
      minimize: "It's great, though the parameter order can be confusing...",
      better: "ReScript puts the initial value first - more intuitive!",
      safety: "Type inference ensures accumulator and result types match.",
      example: "Type-safe reduce with clear parameter order!"
    },
    glyphs: ['🔄', '➡️', '⚙️'],
    tags: ['array', 'reduce', 'fold'],
    relatedPatterns: ['array-map'],
    learningObjectives: ['Array.reduce', 'Accumulator patterns'],
    commonMistakes: ['Wrong initial value type'],
    bestPractices: ['Consider specialized functions like sum, join']
  },

  {
    id: 'array-find',
    name: 'Array.find',
    category: 'array-operations',
    difficulty: 'beginner',
    jsPattern: /\.find\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
    confidence: 0.9,
    jsExample: `const user = users.find(u => u.id === userId);`,
    rescriptExample: `let user = users->Array.find(u => u.id == userId)`,
    narrative: {
      celebrate: "Good! You're using find to search arrays efficiently!",
      minimize: "It works, though the result can be undefined...",
      better: "ReScript's Array.find returns Option to handle 'not found' safely!",
      safety: "The Option return type forces you to handle the not-found case.",
      example: "Option<'a> makes missing values explicit!"
    },
    glyphs: ['🔍', '🛡️', '📚'],
    tags: ['array', 'find', 'search'],
    relatedPatterns: ['null-check-basic'],
    learningObjectives: ['Array.find with Option'],
    commonMistakes: ['Not checking for undefined'],
    bestPractices: ['Pattern match on find result']
  },

  {
    id: 'array-some',
    name: 'Array.some',
    category: 'array-operations',
    difficulty: 'beginner',
    jsPattern: /\.some\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
    confidence: 0.9,
    jsExample: `const hasAdmin = users.some(u => u.role === 'admin');`,
    rescriptExample: `let hasAdmin = users->Array.some(u => u.role == "admin")`,
    narrative: {
      celebrate: "Perfect use of some for existence checks!",
      minimize: "Nothing to improve here, works great...",
      better: "ReScript's Array.some is identical but fully type-safe!",
      safety: "Predicate must return bool, checked by compiler.",
      example: "Type-safe existence checking!"
    },
    glyphs: ['🔍', '✅', '📚'],
    tags: ['array', 'some', 'exists'],
    relatedPatterns: ['array-every'],
    learningObjectives: ['Array.some for existence'],
    commonMistakes: ['Using find when some is clearer'],
    bestPractices: ['Use some for yes/no questions']
  },

  {
    id: 'array-every',
    name: 'Array.every',
    category: 'array-operations',
    difficulty: 'beginner',
    jsPattern: /\.every\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
    confidence: 0.9,
    jsExample: `const allValid = items.every(item => item.isValid);`,
    rescriptExample: `let allValid = items->Array.every(item => item.isValid)`,
    narrative: {
      celebrate: "Excellent! Using every for validation - clean and functional!",
      minimize: "Perfect approach, ReScript just adds type safety...",
      better: "ReScript ensures your predicate is always boolean!",
      safety: "Type system prevents non-boolean predicates.",
      example: "Type-safe universal quantification!"
    },
    glyphs: ['✅', '🎯', '📚'],
    tags: ['array', 'every', 'validation'],
    relatedPatterns: ['array-some'],
    learningObjectives: ['Array.every for validation'],
    commonMistakes: ['Confusing with some'],
    bestPractices: ['Use every for validation logic']
  },

  {
    id: 'array-flatmap',
    name: 'Array.flatMap',
    category: 'array-operations',
    difficulty: 'intermediate',
    jsPattern: /\.flatMap\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
    confidence: 0.9,
    jsExample: `const allTags = posts.flatMap(post => post.tags);`,
    rescriptExample: `let allTags = posts->Array.flatMap(post => post.tags)`,
    narrative: {
      celebrate: "Advanced! flatMap combines map and flatten - very functional!",
      minimize: "Great pattern, ReScript makes it even more type-safe...",
      better: "ReScript's flatMap ensures nested array types are correct!",
      safety: "Type system tracks the nesting and flattening.",
      example: "Type-safe flattening of nested arrays!"
    },
    glyphs: ['🔄', '🔀', '📚'],
    tags: ['array', 'flatmap', 'flatten'],
    relatedPatterns: ['array-map'],
    learningObjectives: ['Array.flatMap', 'Monadic operations'],
    commonMistakes: ['Using map when flatMap is needed'],
    bestPractices: ['Use flatMap for nested array operations']
  },

  {
    id: 'for-loop-to-map',
    name: 'For Loop to Map',
    category: 'array-operations',
    difficulty: 'beginner',
    jsPattern: /for\s*\(\s*(?:let|const|var)\s+\w+\s+of\s+\w+\s*\)\s*{[\s\S]*?\.push\s*\(/,
    confidence: 0.7,
    jsExample: `const result = [];
for (const item of items) {
  result.push(transform(item));
}`,
    rescriptExample: `let result = items->Array.map(item => transform(item))`,
    narrative: {
      celebrate: "You're transforming arrays systematically - good logic!",
      minimize: "It works, though it's a bit imperative with mutation...",
      better: "ReScript's Array.map does this functionally without mutation!",
      safety: "Immutable by default prevents accidental side effects.",
      example: "Functional transformations are safer and clearer!"
    },
    glyphs: ['🔄', '💎', '➡️'],
    tags: ['for-loop', 'map', 'transform'],
    relatedPatterns: ['array-map'],
    learningObjectives: ['Functional vs imperative', 'Array.map'],
    commonMistakes: ['Mutating in loops'],
    bestPractices: ['Prefer map over imperative loops']
  },

];

/**
 * Complete pattern library - 56+ total patterns
 * Combines basic patterns (29) with advanced patterns (27+)
 */
export const PATTERN_LIBRARY: Pattern[] = [
  ...BASIC_PATTERNS,
  ...ADVANCED_PATTERNS
];

/**
 * Get pattern by ID
 */
export function getPatternById(id: string): Pattern | undefined {
  return PATTERN_LIBRARY.find(p => p.id === id);
}

/**
 * Get patterns by category
 */
export function getPatternsByCategory(category: PatternCategory): Pattern[] {
  return PATTERN_LIBRARY.filter(p => p.category === category);
}

/**
 * Get patterns by difficulty
 */
export function getPatternsByDifficulty(difficulty: DifficultyLevel): Pattern[] {
  return PATTERN_LIBRARY.filter(p => p.difficulty === difficulty);
}

/**
 * Detect patterns in code
 */
export function detectPatterns(code: string): Pattern[] {
  const matches: Pattern[] = [];

  for (const pattern of PATTERN_LIBRARY) {
    if (pattern.jsPattern instanceof RegExp) {
      if (pattern.jsPattern.test(code)) {
        matches.push(pattern);
      }
    } else if (typeof pattern.jsPattern === 'function') {
      if (pattern.jsPattern(code)) {
        matches.push(pattern);
      }
    }
  }

  // Sort by confidence
  return matches.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Get total pattern count
 */
export function getPatternCount(): number {
  return PATTERN_LIBRARY.length;
}

/**
 * Get pattern statistics
 */
export function getPatternStats() {
  const byCategory: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};

  for (const pattern of PATTERN_LIBRARY) {
    byCategory[pattern.category] = (byCategory[pattern.category] || 0) + 1;
    byDifficulty[pattern.difficulty] = (byDifficulty[pattern.difficulty] || 0) + 1;
  }

  return {
    total: PATTERN_LIBRARY.length,
    byCategory,
    byDifficulty
  };
}
