# POLIQUOTE
A node.js app to collect quotes from PoliMi professors

## Setup
To make the app work you just need to create a file named ***database.js*** in *./routes/* with the following content:
```javascript
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

connection.connect();

module.exports = connection;