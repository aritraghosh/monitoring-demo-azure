const express = require('express');
const axios = require('axios');
const app = express();

const serviceCUrl = process.env.SERVICE_C_URL || 'http://service-c.demo-app.svc.cluster.local:3000';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get("http://service-c/");
    res.send(`Service B received: ${response.data}`);
  } catch (error) {
    console.error('Service B: Error calling Service C:', error.message);
    res.status(500).send('Service C failed, propagating error.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service B running on port ${PORT}`);
});
