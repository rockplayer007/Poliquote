var express = require('express');
var router = express.Router();
var conn = require("./database");

router.get("/getlikescount", function (req, res) {
    var targetId = req.body;
    conn.query("SELECT id FROM likes WHERE target = ?", targetId, function (err, rows, fields) {
        if (err) { console.log(err); res.status(500).send("error in database"); }
        else res.status(200).send(rows.lenght);
    });
});

router.post("/addlike", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var target = req.body.target;
    //Check if the provided password is correct;
    conn.query("SELECT id, password FROM users WHERE username = ?", username, function (err, rows, fields) {
        if (err) { console.log(err); res.status(500).send("error in database"); }
        else
            if (rows.length == 0) res.status(400).send("user does not exist");
            else
                if (password == rows[0].password) {
                    //Check if post exists
                    var userId = rows[0].id;
                    conn.query("SELECT id FROM posts WHERE id = ?", target, function (err, rows, fields) {
                        if (err) { console.log(err); res.status(500).send("error in database"); }
                        else
                            if (rows.lenght == 0) res.status(400).send("post does not exist");
                            else {
                                var like = { target: target, user: userId };
                                conn.query("INSERT INTO likes SET ?", like, function (err, result) {
                                    if (err) { console.log(err); res.status(500).send("error in database"); }
                                    else res.status(200).send("ok");
                                });
                            }
                    });
                }
                else res.status(400).send("wrong password");
    });
});

module.exports = router;