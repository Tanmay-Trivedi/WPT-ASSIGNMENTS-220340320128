const express = require('express');
const app = express();

const mysql = require('mysql2');
app.use(express.static("sf"));

let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'tanmay',
    port: 3306
};

const con = mysql.createConnection(dbparams);
app.get("/Location", (req, resp) => {
    let pin = req.query.pin;
    console.log("Fetching from database");

    let Itemdetails = { status: false, place: [] };

    con.query('select place from Locations where pincode=?', [pin],
        (error, itemRow) => {
            if (error) {
                console.log("Error hai code dekh firse" + error);
            }
            else if (itemRow.length > 0) {
                Itemdetails.status = true;
                Itemdetails.place = itemRow;
                console.log(itemRow);
            }
            resp.send(Itemdetails);
        });

});
app.listen(900, function () {
    console.log("server listening at port 900...");
});