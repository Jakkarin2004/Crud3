const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

//ประกาศการใช้งาน cors และ express.json()
app.use(cors());
app.use(express.json());


//การสร้าง object เพื่อเชื่อมฐานข้อมูลโดยรระบุ user,host,password,database
const db = mysql.createConnection({
    //เมื่อเชื่อมต่อ api ได้ถูกต้องจะทำการ run คำสั่ง sql 
    user: "root",
    host: "localhost",
    password: "",
    database: "anime"
})
app.get('/animes', (req, res) => {
    db.query("SELECT * FROM anime", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const ep = req.body.ep;
    const watchs = req.body.watchs
    const director = req.body.director;

    db.query("INSERT INTO anime (`name`,`type`,`ep`,`watchs`,`director`) VALUES (?,?,?,?,?)",
        [name,type,ep,watchs,director],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values inserted")
            }
        }
    );
});
app.put('/update', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const ep = req.body.ep;
    const watchs = req.body.watchs
    const director = req.body.director;
    db.query("UPDATE anime SET name = ?,type = ?,ep = ?,watchs = ?,director = ? WHERE id = ?",
     [name,type,ep,watchs,director, id],
      (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM anime WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
});