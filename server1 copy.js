var mysql = require('mysql2');
var express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lavanya1@",
    database: "mydatabase"
});

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE facebook5 (id INT AUTO_INCREMENT PRIMARY KEY,post VARCHAR(255),date VARCHAR(255))";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});*/
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE facebook4 (id INT AUTO_INCREMENT PRIMARY KEY,post VARCHAR(255),postlike int)";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});*/

app.post('/api/data/like', (req, res) => {
    var rest1 = "";
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        const data1 = req.body.msg1;
        const index = req.body.index;
        let sql = `INSERT INTO facebook5 (postlike) VALUES ? where id=?`;
        let values = [
            [data1, index]
        ]; //this is dynamic value that you can create
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            rest1 = result.affectedRows;
            res.send({ "res2": result });
        });

    });

    console.log("like url worked");
})
app.get('/api', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        const sql = "SELECT * FROM facebook4";
        con.query(sql, (err, result) => {
            if (err) {
                console.log('failed');
                res.sendStatus(500);
                res.end();
            }
            console.log('sucessful');
            res.json(result);
        })
    })
})
app.post('/api/post', (req, res) => {
    /* con.connect(function(err) {
         if (err) throw err;
         const data = req.body.post;
         // const postlike1 = req.body.postlike;
         console.log(data);
         const sql = "INSERT INTO facebook4 (post) VALUES ?";
         const values = [
             [data]
         ];
         con.query(sql, [values], (err, result) => {
             if (err) throw err;
             console.log(result.affectedRows);
             res.json(result);
         });
     });
     res.end();*/
    console.log(req.body.post);
    console.log('hi gud mrng');
});
app.listen(4500, () => { console.log('sever is running') });