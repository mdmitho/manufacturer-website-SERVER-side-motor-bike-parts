const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fsbhm.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



async function run() {
  try {
    await client.connect();
    const partsCollection = client.db("Motor-Bike-parts").collection("parts");
    const orderCollection = client.db("Motor-Bike-parts").collection("order");
    const profileCollection = client.db("Motor-Bike-parts").collection("profile");
    const reviewCollection = client.db("Motor-Bike-parts").collection("review");

    
app.get("/parts", async (req, res) => {
  const query ={}
  const cursor = partsCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
    });

    app.get("/parts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await partsCollection.findOne(query);
      res.send(result);
    }); 


    app.post('/order',async(req,res)=>{
      const order = req.body;
      const result = await orderCollection.insertOne(order);
  res.send( result);
    
    })

    app.get("/order", async (req, res) => {
      const query = {};
      const cursor = orderCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/profile',async(req,res)=>{
      const profile = req.body;
      const result = await profileCollection.insertOne(profile);
      res.send(result);
    
    })


  } 
  finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello my Motor Bike parts ");
});

app.listen(port, () => {
  console.log(`my app listening on port ${port}`);
});
