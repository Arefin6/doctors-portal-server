var express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8pkoh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()

app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("doctors-portal").collection("appointments");
//   const ordersCollection = client.db("ema-jhon-simple").collection("orders");
    
   app.post('/addAppointment',(req,res) => {
       const appointment = req.body;
       productsCollection.insertOne(appointment)
       .then(result =>{
           res.send(result.insertedCount>0);
       })
   })

  



});


app.listen(5000)