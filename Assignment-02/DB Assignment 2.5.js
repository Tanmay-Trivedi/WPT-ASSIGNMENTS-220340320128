const express = require("express");
const app = express();
app.use(express.static("sf"));
let datab = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "tanmay",
    port: 3306
};
const mysql = require("mysql2");
const con = mysql.createConnection(datab);
app.get("/Accdetails", (req, res) => {
    let input = req.query.accno;
    let datafound = { status: false, data: [] };

    con.query("select * from bank where accno=?", [input], (err, rows) => {
        if (err) {
            console.log("error while fetching data");
        } else {
            if (rows.length > 0) {
                datafound.status = true;
                datafound.data = rows;
            }
        }
        res.send(datafound);
    });
});
app.listen(900, function () {
    console.log("server running at port 900")
});