var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req,res) {
    burger.all(function(data) {
        var hbObj = {
            burger: data
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
        res.json({id: result.insertId})
    });
});

router.put("api/cats/:id", function (req,res) {
    var state = "id = " +req.params.id;

    console.log("Status: ", state);

    burger.update({
        devoured: req.body.devoured
    }, state, function(result) {
        if (result.changedRows == 0){
            return res.status(404).end();}
        else {
            res.status(200).end();
        }    
    });
});

module.exports = router;