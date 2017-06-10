var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "eu-cdbr-azure-west-b.cloudapp.net",
    user: "b7addc4a2506eb",
    password: "f0bbcdfa",
    database: "poliquote"
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;