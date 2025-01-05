const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');

router.get('/', (req, res) => {
  
  employeeService.getAllEmployees((err, results) => {
    if (err) res.status(500).send(err);
    else res.send(results);
  });
});

router.get('/:id', (req, res) => {
  console.log("req", req);
  employeeService.getEmployeeById(req.params.id, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

router.post('/', (req, res) => {
  employeeService.createEmployee(req.body, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(201).send('Employee added with ID: ' + result.insertId);
  });
});

router.put('/:id', (req, res) => {
  employeeService.updateEmployee(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send('Employee updated successfully.');
  });
});

router.delete('/:id', (req, res) => {
  employeeService.deleteEmployee(req.params.id, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send('Employee deleted successfully.');
  });
});

module.exports = router;