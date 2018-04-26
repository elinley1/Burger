var mysql = require("mysql");

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "Opulent1986",
    database: "burgers_db"
});

connection.connect(function(err) {
    if (err) {
        console.log("Error connecting: " + err.stack)
        return;
    }
    console.log("Connection established as id " = connection.threadId);
});

module.exports = connection;