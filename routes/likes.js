var express = require('express');
var router = express.Router();
var conn = require("./database");

router.get("/getlikescount", function (req, res) {
    var targetId = req.body;
    conn.query("SELECT id FROM likes WHERE target = ?", targetId, function (err, rows, fields) {
        if (err) res.status(500).send("error in database");
        else res.status(200).send(rows.lenght);
    });
});

module.exports = router;