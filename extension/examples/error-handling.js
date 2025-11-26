/**
 * Example: Error Handling Patterns
 */

// Try/catch basic
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Parse failed:', error);
    return null;
  }
}

// Result-like pattern
function divide(a, b) {
  if (b === 0) {
    return { error: 'Division by zero' };
  }
  return { success: a / b };
}

// Throw error
function validateUser(user) {
  if (!user.email) {
    throw new Error('Email is required');
  }
  if (!user.name) {
    throw new Error('Name is required');
  }
  return user;
}

// Optional error return
function safeParse(input) {
  try {
    return JSON.parse(input);
  } catch {
    return undefined;
  }
}
