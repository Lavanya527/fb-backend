import mysql from 'mysql2';
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lavanya1@",
    database: "mydatabase"
});
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE comment (commid INT AUTO_INCREMENT PRIMARY KEY,comment VARCHAR(255),postid int,FOREIGN KEY (postid) REFERENCES facebook5(id))";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("comment table is created");
    });
});*/
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE facebook5 (id INT AUTO_INCREMENT PRIMARY KEY,post VARCHAR(255),postlike int(30))";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});*/
app.get('/api', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        const sql = "SELECT *,date_format(now(),'%d/%m/%Y %h:%i %p') AS date FROM facebook4";
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
app.get('/api/data', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        const sql = "SELECT id,post,postlike,date_format(now(),'%d/%m/%Y %h:%i %p') AS date from facebook5 order by id desc";
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
app.put('/api/data/:id', (req, res) => {
    var rest1 = "";
    con.connect(function(err) {
        if (err) throw err;
        const index = req.params['id'];

        const data = req.body.Lcount;
        let sql = `UPDATE facebook5  SET postlike = ? WHERE id = ?`;
        let values = [data, index];
        con.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            rest1 = result.affectedRows;
            res.send({ "res2": result });
        })
    })
    console.log("after sending data", req.body.Lcount);
    console.log("after sending data", req.params['id']);
})
app.post('/api/post', (req, res) => {
    var rest = "";
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        const data = req.body.msg;

        let sql = "INSERT INTO facebook5 (post,postlike) VALUES ?";
        let values = [
            [data, 0]
        ]; //this is dynamic value that you can create
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            rest = result.affectedRows;
            res.send({ "res1": result });
        });

    });

});
app.post('/api/comm', (req, res) => {
    var rest3 = "";
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        const id3 = req.body.id;
        const com = req.body.comm1;
        let sql = "INSERT INTO comment (comment,postid) VALUES ?";
        let values = [
            [com, id3]
        ]; //this is dynamic value that you can create
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            rest3 = result.affectedRows;
            res.send({ "res4": result });
        });

    });
    console.log(req.body.id);
    console.log(req.body.comm1);


});
app.get('/api/commdata', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        const sql = "SELECT comment,commid from comment order by commid desc";
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
app.get('/api/commdata/:id', (req, res) => {
    var res5 = "";
    con.connect(function(err) {
        if (err) throw err;
        const id4 = req.params['id']
        const sql = "SELECT b.comment from facebook5 AS a inner join comment AS b on a.id=b.postid where b.postid=?  order by b.commid desc ";
        const values = [id4];
        con.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("Number of records " + result);
            res5 = result;
            res.send({ "res5": result });
        })
    })
})
app.listen(4500, () => { console.log('sever is running') });