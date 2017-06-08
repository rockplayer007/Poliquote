var express = require('express');
var router = express.Router();
var conn = require("./database");

router.post("/signup", function (req, res) {
    var user = req.body;
    conn.query("SELECT username FROM users WHERE username = ?", user.username, function (err, rows, fields) {
        if (err) res.status(500).send("error in database");
        else
            if (rows.length == 0)
                conn.query("INSERT INTO users SET ?", user, function (err, result) {
                    if (err) res.status(500).send("error in database");
                    else res.send(200).send("ok");
                });
            else res.status(400).send("username not available");
    });
});

module.exports = router;