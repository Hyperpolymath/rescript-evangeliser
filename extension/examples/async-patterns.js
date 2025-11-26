/**
 * Example: Async/Await Patterns
 *
 * Demonstrates async patterns that transform to ReScript
 */

// Basic async/await
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}

// Async with error handling
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}

// Promise.then chain
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Promise.all for parallel requests
async function fetchMultiple() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);

  return { users, posts, comments };
}

// Promise.race for timeout
async function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), timeout)
  );

  return Promise.race([fetchPromise, timeoutPromise]);
}

// Async iteration
async function processItems(items) {
  for (const item of items) {
    await processItem(item);
  }
}

async function processItem(item) {
  const result = await transform(item);
  await save(result);
  return result;
}

// Sequential async operations
async function sequentialProcess() {
  const step1 = await doStep1();
  const step2 = await doStep2(step1);
  const step3 = await doStep3(step2);
  return step3;
}

// Error-first callback (Node.js style)
const fs = require('fs');

fs.readFile('file.txt', (error, data) => {
  if (error) {
    console.error('Read failed:', error);
    return;
  }
  console.log(data.toString());
});
