const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util')

//connection to MySQL Database
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'waverider7',
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
                "View All Employees", // Done
                "View All Employees by Manager", // Bonus
                "Add Employee", // Done
                "Remove Employee", // Bonus
                "Update Employee Role", // Done
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
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager": //Bonus
                    //function
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Remove Role": //Bonus
                    //function
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Remove Department":
                    removeDepartment();
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
    connection.query(`SELECT employeeRole.id, employeeRole.first_name AS "First Name", employeeRole.last_name AS "Last Name", employeeRole.title AS "Title", concat(manager.first_name, " ", manager.last_name) AS "Manager"  FROM (SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id) AS employeeRole LEFT JOIN employee AS manager ON employeeRole.manager_id=manager.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

//Bonus View All Employees by Manager

// Add Employee
const addEmployee = () => {
    let employees;
    let roles;

    connection.query('SELECT * FROM employee').then(result => {

        employees = result;

        connection.query('SELECT * FROM role').then(result => {

            roles = result

            const managerChoices = employees.map(({ first_name, last_name, id }) => {
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
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "firstName",
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "lastName",
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    choices: rolesChoices,
                    name: "roleId",
                },
                {
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: managerChoices,
                    name: "managerId",
                },
            ]).then((response) => {
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
        })
    })
};

// Bonus Remove Employee

// Update Employee Role
const updateEmployeeRole = () => {
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
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    choices: rolesChoices,
                    name: "roleId",
                },
            ]).then((response) => {
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

// Update Employee Manager

// View All Roles
const viewAllRoles = () => {
    connection.query(`SELECT role.id AS "ID", role.title AS "Title", role.salary AS "Salary", role.department_id as "Department ID" FROM employee_trackerDB.role`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

// Add Role
const addRole = () => {
    let departments;

    connection.query('SELECT * FROM department').then(result => {

        departments = result;

        const departmentChoices = departments.map(({ name, id }) => {
            return ({
                name: `${name}`,
                value: id,
            })
        })

        inquirer.prompt([
            {
                type: "input",
                message: "What is the role's title?",
                name: "title",
            },
            {
                type: "number",
                message: "Please enter a salary for this role",
                name: "salary",
            },
            {
                type: "list",
                message: "Please select which department this role is being added to",
                choices: departmentChoices,
                name: "departmentId",
            }
        ]).then((response) => {
            connection.query(`INSERT INTO role SET ?`,
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.departmentId,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log("The role has been added.");
                    init();
                })
        })
    })
};

// Bonus Remove Role

// View All Departments
const viewAllDepartments = () => {
    connection.query(`SELECT department.id AS "ID", department.name AS "Department Name" FROM employee_trackerDB.department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

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

// Remove Department
const removeDepartment = () => {
    let departments;

    connection.query('SELECT * FROM department').then(result => {
        departments = result;

        const departmentChoices = departments.map(({ name, id }) => {
            return ({
                name: `${name}`,
                value: id,
            })
        })

        inquirer.prompt([
            {
                type: "list",
                message: "What department would you like to remove?",
                choices: departmentChoices,
                name: "departmentId",
            }
        ]).then((response) => {
            connection.query(`DELETE FROM employee_trackerDB.department WHERE department.id = ?;`,
                [
                    response.departmentId,
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log("The department has been removed.");
                    init();
                })

        })
    })
};

// Funtion to intitalize the application
init();