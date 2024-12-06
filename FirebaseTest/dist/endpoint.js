const express = require('express');
const app = express();

app.get('/getStudentCount', (req, res) => {
  // Database query (e.g., MongoDB, MySQL)
  Student.countDocuments({}, (err, count) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching student count' });
    } else {
      res.json({ count });
    }
  });
});