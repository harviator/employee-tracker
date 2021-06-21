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
const init = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Add (Departments, Roles, and Employees)", "View (Departments, Roles, Employees)", "Update (Employee Roles)", "Exit"],
            name: "init",
        }
    ])
        .then((response) => {

            if (response.init == "Add (Departments, Roles, and Employees)") {
                // Add function
            } else if (response.init == "View (Departments, Roles, Employees)") {
                // View function
            } else if (response.init == "Update (Employee Roles)") {
                // Update function
            }  else if (response.init == "Exit") {
                connection.end();
            }
        })
}

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