const express = require('express');
const axios = require('axios');
const app = express();

const serviceBUrl = process.env.SERVICE_B_URL || 'http://service-b.demo-app.svc.cluster.local:3000';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get("http://service-b/");
    res.send(`Service A received now: ${response.data}`);
  } catch (error) {
    console.error('Service A: Error calling Service B:', error.message);
    res.status(500).send('Service B failed, propagating error.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service A running on port ${PORT}`);
});
