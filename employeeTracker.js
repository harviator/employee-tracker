const mysql = require('mysql');
const inquirer = require('inquirer');

//connection to MySQL Database
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '',
    database: 'employee_trackerDB',
});

// Initialize the application
//Options for add, view, update, and delete

//Add
//Department, role, or employee

//View
//Department, role, or employee (if time view employees by manager and department by combined salary)

//Update
//Employee role (if time employee managers)

//Delete (if time)
//Department, role, or employee


// Conntect to MySQL server and database
connection.connect((err) => {
    if (err) throw err;
    init();
})