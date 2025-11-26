/**
 * Example: Conditional Patterns
 */

// Ternary
const status = isActive ? 'active' : 'inactive';

// Switch statement
function getGrade(score) {
  switch (true) {
    case score >= 90:
      return 'A';
    case score >= 80:
      return 'B';
    case score >= 70:
      return 'C';
    default:
      return 'F';
  }
}

// If/else chain
function categorize(value) {
  if (value < 0) {
    return 'negative';
  } else if (value === 0) {
    return 'zero';
  } else {
    return 'positive';
  }
}

// Early return (guard)
function process(data) {
  if (!data) return null;
  if (data.invalid) return null;

  return transform(data);
}

// Logical OR for default
const name = userName || 'Guest';
