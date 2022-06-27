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


app.get("/Itemdetails", (req, resp) => {


    let itemno = req.query.itemno;
    console.log(itemno);

    console.log("Fetching from database");

    let Itemdetails = { status: false, item: { itemno: 0, itemname: "", price: 0, catagory: "" } };

    con.query('select itemno,itemname,price,catagory from item where itemno=?', [itemno],
        (error, itemRow) => {
            if (error) {
                console.log("Error hai code dekh firse" + error);
            }
            else if (itemRow.length > 0) {
                Itemdetails.status = true;
                // Itemdetails.item = itemRow[0];
                Itemdetails.item.itemno = itemRow[0].itemno;
                Itemdetails.item.itemname = itemRow[0].itemname;
                Itemdetails.item.price = itemRow[0].price;
                Itemdetails.item.catagory = itemRow[0].catagory;

            }
            resp.send(Itemdetails);
        });

});
app.get("/AddItems", (req, resp) => {
    let itemno = req.query.itemno;
    let itemname = req.query.itemname;
    let itemprice = req.query.itemprice;
    let catagory = req.query.catagory;

    let itemsdetails = { status: false, item: {} };
    con.query('insert into item (itemno ,itemname ,price, catagory) values(?,?,?,?);', [itemno, itemname, itemprice, catagory],
        (error, itemRow) => {

            if (error) {
                console.log("Error hai padhai krke aa." + error);
            }
            else if (itemRow.affectedRows > 0) {
                itemsdetails.status = true;
                console.log("added employee");
            }
            resp.send(itemsdetails);

        });
});

app.get("/UpdateItem", (req, resp) => {
    let itemno = req.query.itemno;
    let itemname = req.query.itemname;
    let itemprice = req.query.itemprice;
    let catagory = req.query.catagory;

    let Idetails = { status: false, item: {} };
    con.query('update item set itemname=?,price=?,catagory=? where itemno=?', [itemname, itemprice, catagory, itemno],
        (error, itemRow) => {
            if (error) {
                console.log("Error bhai padhai kr " + error);
            }
            else if (itemRow.affectedRows > 0) {
                Idetails.status = true;
            }
            else {
                console.log("update failed");
            }

            resp.send(Idetails);
        });
});

app.get("/Singleselect", (req, resp) => {


    let itemno = req.query.itemno;
    console.log(itemno);

    console.log("Fetching from database");

    let Itemdetails = { status: false, item: { itemno: 0, itemname: "", price: 0, catagory: "" } };

    con.query('select itemno,itemname,price,catagory from item where itemno=?', [itemno],
        (error, itemRow) => {
            if (error) {
                console.log("Error hai code dekh firse" + error);
            }
            else if (itemRow.length > 0) {
                Itemdetails.status = true;
                // Itemdetails.item = itemRow[0];
                Itemdetails.item.itemno = itemRow[0].itemno;
                Itemdetails.item.itemname = itemRow[0].itemname;
                Itemdetails.item.price = itemRow[0].price;
                Itemdetails.item.catagory = itemRow[0].catagory;

            }
            resp.send(Itemdetails);
        });

    app.get("/MultiSelect", (req, resp) => {

        // not worked need to check again
        let catagory = req.query.catagory;
        console.log(itemno);

        console.log("Fetching from database");

        let Itemdetails = { status: false, item: "" };

        con.query('select itemno,itemname,price,catagory from item where catagory=?', [catagory],
            (error, itemRow) => {
                if (error) {
                    console.log("Error hai code dekh firse" + error);
                }
                else if (itemRow.length > 0) {
                    Itemdetails.status = true;
                    // Itemdetails.item = itemRow[0];
                    Itemdetails.item = "";
                    for (let i = 0; i < itemRow.length; i++) {
                        Itemdetails.item += itemRow[i].itemno + " " + itemRow[i].itemname + " "
                            + itemRow[i].price + " " + itemRow[i].catagory;
                    }

                }
                resp.send(Itemdetails);
            });
    });
});

app.listen(900, function () {
    console.log("server listening at port 900...");
});