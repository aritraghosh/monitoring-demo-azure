const express = require('express');

const app = express();
const PORT = 3000;

// Simulate error: OOMKill
app.get('/memory', (req, res) => {
  const bigArray = [];
  for (let i = 0; i < 1e8; i++) {
    bigArray.push(i);
  }
  res.send("Simulated memory usage!");
});

// Simulate error: Logs
app.get('/', (req, res) => {
  console.error("Simulated error: Something went wrong!");
  res.status(500).send("Service C encountered an error");
});

app.listen(PORT, () => {
  console.log(`Service C running on port ${PORT}`);
});
