const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./controllers/employeeController');

const app = express();
app.use(bodyParser.json());
app.use('/employees', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});