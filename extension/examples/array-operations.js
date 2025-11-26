/**
 * Example: Array Operations
 *
 * Functional array operations that work great in ReScript
 */

const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(n => n * 2);
const squared = numbers.map(n => n ** 2);

// Filter
const evens = numbers.filter(n => n % 2 === 0);
const large = numbers.filter(n => n > 3);

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
const product = numbers.reduce((acc, n) => acc * n, 1);

// Find
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const user = users.find(u => u.id === 2);

// Some & Every
const hasEven = numbers.some(n => n % 2 === 0);
const allPositive = numbers.every(n => n > 0);

// FlatMap
const nested = [[1, 2], [3, 4]];
const flattened = nested.flatMap(arr => arr);

const posts = [
  { title: 'Post 1', tags: ['js', 'web'] },
  { title: 'Post 2', tags: ['react', 'js'] }
];
const allTags = posts.flatMap(post => post.tags);

// Chaining operations
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((sum, n) => sum + n, 0);

// For loop to map conversion
const oldStyle = [];
for (const item of items) {
  oldStyle.push(transform(item));
}

// Better: use map
const newStyle = items.map(transform);

// Complex transformation pipeline
const data = [
  { value: 10, active: true },
  { value: 20, active: false },
  { value: 30, active: true }
];

const processed = data
  .filter(item => item.active)
  .map(item => item.value)
  .filter(value => value > 15)
  .reduce((sum, value) => sum + value, 0);

// Array methods with indices
const indexed = numbers.map((n, i) => ({ value: n, index: i }));

// Sort (mutating - be careful!)
const sorted = [...numbers].sort((a, b) => a - b);

// Slice for immutable operations
const first3 = numbers.slice(0, 3);
const last2 = numbers.slice(-2);
