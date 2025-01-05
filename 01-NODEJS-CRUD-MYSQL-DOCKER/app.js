const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'your_database'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// CRUD Operations
// Create Employee
app.post('/employees', (req, res) => {
  const { name, position, salary } = req.body;
  const sql = 'INSERT INTO employee (name, position, salary) VALUES (?, ?, ?)';
  connection.query(sql, [name, position, salary], (error, results) => {
    if (error) throw error;
    res.status(201).send(`Employee added with ID: ${results.insertId}`);
  });
});

// Read All Employees
app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employee';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Read Single Employee
app.get('/employees/:id', (req, res) => {
  console.log("req", req);
  console.log("req.params", req.params);
  const sql = 'SELECT * FROM employee WHERE id = ?';
  connection.query(sql, [req.params.id], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

// Update Employee
app.put('/employees/:id', (req, res) => {
  const { name, position, salary } = req.body;
  const sql = 'UPDATE employee SET name = ?, position = ?, salary = ? WHERE id = ?';
  connection.query(sql, [name, position, salary, req.params.id], (error, result) => {
    if (error) throw error;
    res.send('Employee updated successfully.');
  });
});

// Delete Employee
app.delete('/employees/:id', (req, res) => {
  const sql = 'DELETE FROM employee WHERE id = ?';
  connection.query(sql, [req.params.id], (error, result) => {
    if (error) throw error;
    res.send('Employee deleted successfully.');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});