/**
 * Example: Null Safety Patterns
 *
 * This file demonstrates various null checking patterns in JavaScript
 * that can be transformed to ReScript's Option type.
 */

// Basic null check
function getUserName(user) {
  if (user !== null && user !== undefined) {
    return user.name;
  }
  return 'Guest';
}

// Ternary null check
const displayName = user ? user.name : 'Anonymous';

// Optional chaining (ES2020)
const cityName = user?.address?.city;

// Nullish coalescing
const username = user.name ?? 'Default User';

// Guard clause
function processUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

// Typeof check
function getValue(data) {
  if (typeof data !== 'undefined') {
    return data.value;
  }
  return 0;
}

// Logical AND short-circuit
const hasPermission = user && user.role && user.role === 'admin';

// Default with OR operator
const config = userConfig || {};

// Nested null checks
function getNestedValue(obj) {
  if (obj && obj.data && obj.data.items && obj.data.items.length > 0) {
    return obj.data.items[0];
  }
  return null;
}

// Array find with null check
const foundUser = users.find(u => u.id === userId);
if (foundUser) {
  console.log(foundUser.name);
}
