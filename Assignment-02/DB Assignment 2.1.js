let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'tanmay',
    port: 3306
};


const mysql = require('mysql2');
const connection = mysql.createConnection(dbparams);
console.log("connection done...");