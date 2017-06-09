var express = require('express');
var router = express.Router();
var conn = require("./database");

router.get("/getposts", function (req, res) {
    var query = "SELECT * FROM posts WHERE";
    try {
        var options = req.options;
        if (options.search)
            for (var key in options.search)
                if (key)
                    query += util.format(" %s = %s AND", key, options.search[key]);
        if (options.startDate && options.endDate) query += util.format(" datetime >= %s AND datetime <= %s", options.startDate, options.endDate);
        query += ";"; //Add closing semicolon
        //Check if there is an "AND" at the end of the query and remove it
        query = query.replace("AND;", ';').replace("WHERE;", ';');
        //Set a query limit (if present)
        if (options.limit) query = query.replace(';', util.format("LIMIT %s;", options.limit));
    } catch (ex) {
        res.status(400).send("bad query options");
    }
    conn.query(query, function (err, rows, fields) {
        if (err) res.status(500).send("error in database");
        else res.status(200).send(rows);    
    });
});

router.post("/addpost", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var post = JSON.parse(req.body.post);
    // Check if the provided password is correct
    conn.query("SELECT password FROM users WHERE username = ?", username, function (err, rows, fields) {
        if (err) res.status(500).send("error in database");
        else
            if (rows.length == 0) res.status(400).send("user does not exist");
            else
                if (password == rows[0].password)
                    conn.query("INSERT INTO posts SET ?", post, function (err, result) {
                        if (err) res.status(500).send("error in database");
                        else res.status(200).send("ok");
                    });
                else res.status(400).send("wrong password");
    });
});

module.exports = router;