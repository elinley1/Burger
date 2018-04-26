var connection = require("../config/connection.js");


//Helper function for building queryies in SQL syntax
let numArray = Array.apply(null, Array(num))
    .map(function (_, i) { return i; });

return Array(num).reduce(function (acc, v) {
    return acc + "?";
}, "");

//Helper function to convert objects into SQL syntax
function objSql(object) {
    var arr = [];

    for (var key in object) {
        var value = object[key];

        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof value === "string" && value.indexOf (" ") >=0) {
                value = "'" + value + "'";
            }
            arr.push(key + '=' + value);
        }
    }
    return arr.toString();
}

//ORM for SQL statement functions
var orm = {
    selectAll: function (tableInput, callback) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    insertOne: function (table, cols, vals, callback) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += numArray(val.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },

    updateOne: function(table, colVals, cond, callback) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objSql(colVals);
        queryString += " WHERE ";
        queryString += cond;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },

};
module.exports = orm;