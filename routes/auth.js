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
                    else res.status(200).send("ok");
                });
            else res.status(400).send("username not available");
    });
});

router.post("/login", function (req, res) {
    var loginData = req.body;
    var username = loginData.username;
    var password = loginData.password;
    conn.query("SELECT password FROM users WHERE username = ?", username, function (err, rows, fields) {
        if (err) res.status(500).send("error in database");
        else
            if (rows.length == 0) res.status(404).send("user does not exist");
            else
                if (password == rows[0].password) res.status(200).send("ok");
                else res.status(400).send("wrong password");
    });
})

module.exports = router;