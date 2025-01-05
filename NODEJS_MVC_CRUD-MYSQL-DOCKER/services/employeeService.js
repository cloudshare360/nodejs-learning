const db = require('../db/database');

exports.getAllEmployees = (callback) => {
  db.query('SELECT * FROM employee', callback);
};

exports.getEmployeeById = (id, callback) => {
  db.query('SELECT * FROM employee WHERE id = ?', [id], callback);
};

exports.createEmployee = (employee, callback) => {
  db.query('INSERT INTO employee SET ?', employee, callback);
};

exports.updateEmployee = (id, employee, callback) => {
  db.query('UPDATE employee SET ? WHERE id = ?', [employee, id], callback);
};

exports.deleteEmployee = (id, callback) => {
  db.query('DELETE FROM employee WHERE id = ?', [id], callback);
};