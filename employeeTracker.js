const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util')

//connection to MySQL Database
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '',
    database: 'employee_trackerDB',
});

connection.connect(err => {
    if (err) throw err
})

connection.query = util.promisify(connection.query)


// Initialize the application
//Options for add, view, update, and delete
const init = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Manager", // Bonus
                "Add Employee",
                "Remove Employee", // Bonus
                "Update Employee Role",
                "Update Employee Manager", // Bonus
                "View All Roles",
                "Add Role",
                "Remove Role", // Bonus
                "View All Departments",
                "Add Department",
                "Remove Department", // Bonus
                "Exit"
            ],
            name: "init",
        }
    ])
        .then((response) => {

            switch (response.init) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Employees by Manager": //Bonus
                    //function
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee": // Bonus
                    //function
                    break;
                case "Update Employee Role":
                    updateEmployeeRole()
                    break;
                case "Update Employee Manager": //Bonus
                    //function
                    break;
                case "View All Roles":
                    //function
                    break;
                case "Add Role":
                    //function
                    break;
                case "Remove Role": //Bonus
                    //function
                    break;
                case "View All Departments":
                    //function
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Remove Department":
                    //function
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                    connection.end();
            }

        })
}


// View All Employees
const viewAllEmployees = () => {
    connection.query(`SELECT employeeRole.id, employeeRole.first_name, employeeRole.last_name, employeeRole.title AS "role_title", concat(manager.first_name, " ", manager.last_name) AS "manager_name"  FROM (SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id) AS employeeRole  LEFT JOIN employee AS manager ON employeeRole.manager_id=manager.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

//Bonus View All Employees by Manager

// Add Employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
        }, {
            type: "number",
            message: "What is the employee's role id?",
            name: "roleId",
        }, {
            type: "number",
            message: "What is the employee's manager id?",
            name: "managerId",
        },
    ])
        .then((response) => {
            connection.query(`INSERT INTO employee SET ?`,
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.roleId,
                    manager_id: response.managerId,
                },

                (err, res) => {
                    if (err) throw err;
                    console.log("The employee has been added.");
                    init();
                })
        })
};

// Bonus Remove Employee




// Update Employee Role
const updateEmployeeRole = () => {
    //make the query to get all employees
    let employees;
    let roles;

    connection.query('SELECT * FROM employee').then(result => {

        employees = result;

        connection.query('SELECT * FROM role').then(result => {

            roles = result

            const employeeChoices = employees.map(({ first_name, last_name, id }) => {
                return ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                })
            })

            const rolesChoices = roles.map(({ title, id }) => {
                return ({
                    name: title,
                    value: id,
                })
            })

            inquirer.prompt([
                {
                    type: "list",
                    message: "Please select an employee?",
                    choices: employeeChoices,
                    name: "employeeId",
                }
                , {
                    type: "list",
                    message: "What is the employee's role id?",
                    choices: rolesChoices,
                    name: "roleId",
                },
            ]).then((response) => {
                //console.log(response)
                connection.query(`UPDATE employee SET role_id = ? WHERE id = ?;`,
                    [
                        response.roleId,
                        response.employeeId,
                    ],

                    (err, res) => {
                        if (err) throw err;
                        console.log("The employee's role has been updated.");
                        init();
                    })
            })

        })
    })
};



//map the results into an array of objects to pass to he inquirer




//     .then ((response) => {
//         connection.query(`INSERT INTO employee SET ?`,
//         {
//             first_name: response.firstName,
//             last_name: response.lastName,
//             role_id: response.roleId,
//             manager_id: response.managerId,
//         },

//         (err, res) => {
//             if (err) throw err;
//             console.log("The employee has been added.");
//             init();
//         })
//     })


// Add Department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "department",
        }
    ])
        .then((response) => {
            connection.query(`INSERT INTO department SET ?`,
                {
                    name: response.department,
                },

                (err, res) => {
                    if (err) throw err;
                    console.log("The department has been added.");
                    init();
                })
        })
};

//View
//Department, role, or employee (if time view employees by manager and department by combined salary)

//Update
//Employee role (if time employee managers)

//Delete (if time)
//Department, role, or employee

// Funtion to intitalize the application
init();

/*

NOTES:


TEST FUNCTIONS:
    -To call all employees to map over them
    const getEmployee=()=>{
        connection.query('SELECT * FROM employee').then(res=>{
            console.log(res)
            return res
        })
    }

    -To call all roles to map over them
    const getRoles= ()=>{
        connection.query('SELECT * FROM role').then(res=>res)

    }

*/