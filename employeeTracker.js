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



// Conntect to MySQL server and database
connection.connect((err) => {
    if (err) throw err;
    init()
})