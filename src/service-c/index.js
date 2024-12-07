const express = require('express');
const app = express();

let memoryLeak = []; // Global array for memory leak simulation

app.get('/', (req, res) => {
  const randomValue = Math.random();
  res.send('Service C says hello!');

  // 10% chance to trigger OOM
  if (randomValue < 0.1) {
    console.log('Service C: Triggering OOMKill');
    try {
      setInterval(() => {
        memoryLeak.push(new Array(1e6).fill('*')); // Allocate memory continuously
      }, 100);
    } catch (err) {
      console.error('Service C: Memory allocation failed', err.message);
    }
    res.status(500).send('Service C triggered OOMKill');
    return;
  }

  // 10% chance to return a failure
  if (randomValue < 0.2) {
    console.error('Service C: Simulating an HTTP 500 error');
    res.status(500).send('Service C failed');
    return;
  }

  // 80% chance to return success
  res.send('Service C says hello!');
});

// Endpoint to manually simulate OOMKill
app.get('/oom', (req, res) => {
  console.log('Service C: Manual OOMKill simulation started');
  try {
    setInterval(() => {
      memoryLeak.push(new Array(1e6).fill('*')); // Allocate memory continuously
    }, 100);
  } catch (err) {
    console.error('Service C: Memory allocation failed', err.message);
  }
  res.send('Simulating OOMKill in Service C');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service C running on port ${PORT}`);
});
