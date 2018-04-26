var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req,res) {
    burger.all(function(data) {
        console.log("All burgers", data);
        var hbObj = {
            burgers: data
        };
        console.log(hbObj);
        res.render("index", hbObj)
    });
});

router.post("/api/burgers", function (req,res) {
    burger.create([
        "burgerName", "devoured"
    ], [
        req.body.burgerName, req.body.devoured
    ], function (result) {
        let newId = result.insertId;
        res.status(200).end();
    });
});

router.put("/api/burgers/:id", function (req,res) {
    var state = "id = " + req.params.id;

    console.log("Status: ", state);

    burger.update({
        devoured: req.body.devoured
    }, state, function(result) {
        console.log(result);
        if (result.affectedRows == 0){
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }    
    });
});

module.exports = router;