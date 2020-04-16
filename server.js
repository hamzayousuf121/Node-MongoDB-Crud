const express = require('express')
const app = express()
const port = 3000;
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongo.MongoClient;
let db;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const db_name = 'test';
const col_name = 'products';
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

 app.get('/', (req, res) => res.send('Node js Crud Application'));

 app.get('/products', (req, res) =>{
     db.collection(col_name).find().toArray((err, result )=>{
         if(err) throw err;
         res.status(200).send(result)
     })
 })

 app.post('/addproducts', (req, res) => {
    db.collection(col_name)
    .insertOne(req.body), (err, result ) =>{
        if(err) throw err;
        res.status(200).send('Data Inserted')  
        res.end();
  }
})

app.put('/updateproducts', (req, res) => {
    db.collection(col_name)
    .findOneAndUpdate(
        {'id' : req.body.id},{
            $set : {
                name : req.body.name,
                father : req.body.father,
                Class : req.body.Class
            }
        },(err, result) => {
            if(err) throw err;
            res.status(200).send('Data Updated')  
            res.end()
        })
    })

    app.delete('/deleteuser', (req, res) => {
        db.collection(col_name).findOneAndDelete(
            {"id" : req.body.id}
            ,(err, result ) => {
            if(err) throw err;
            res.status(200).send('Data Deleted SuccessFully')
        })
    })

MongoClient.connect(mongoUrl, (err, clients) =>{
    if(err) throw err;
    db = clients.db('classpractice');
    app.listen(port, (err) =>{
        console.log(`app is running on ${port}`)
    })
})

