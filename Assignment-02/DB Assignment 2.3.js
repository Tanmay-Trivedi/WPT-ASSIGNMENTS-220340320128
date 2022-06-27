let datab = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "tanmay",
    port: 3306
};
const mysql = require("mysql2");
const con = mysql.createConnection(datab);

// // insert query
// let resourceId = 111;
// let resourcename = "jkl";
// let status = true;


// con.query("insert into resource (resourceId,resourcename,status) values (?,?,?)",
//     [resourceId, resourcename, status], (err, res) => {
//         if (err) {
//             console.log("Error while inserting");
//         } else {
//             console.log("Inserted Successfully");
//         }
//     });


//update query
// let status = false;
// let resourcename = "abc";
// con.query("update resource set status=? where resourcename=?",
//     [status, resourcename], (err, res) => {
//         if (err) {
//             console.log("Erroe while updating");
//         } else {
//             if (res.affectedRows === 0) {
//                 console.log("Update failed");
//             } else {
//                 console.log("Update successfully");
//             }
//         }
//     });


// Single select
// let resourceid = 111;
// con.query("select resourceid,resourcename,status from resource where resourceid=?", [resourceid], (err, rows) => {

//     if (err) {
//         console.log("Error while fetching data");
//     } else {
//         if (rows.length > 0) {
//             console.log("Succeed: " + rows[0].resourceid + " " + rows[0].resourcename + " " + rows[0].status);
//         } else {
//             console.log("None rows are shown");
//         }
//     }
// });

// multiselect
let status = false;
con.query("select resourceid,resourcename,status from resource where status=?",
    [status], (err, rows) => {
        if (err) {
            console.log("Error occure");
        } else {
            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    console.log(rows[i].resourceid + " " + rows[i].resourcename + " " + rows[i].status);
                }
            } else {
                console.log("No data found");
            }

        }
    });


