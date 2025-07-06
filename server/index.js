const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("zap-shift");
    const parcelCollection = db.collection("parcels");

    // get request
    app.get("/parcels", async (req, res) => {
      try {
        const result = await parcelCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        console.log("error fetching parcel", parcel);
        res
          .status(500)
          .send({ message: "internal server error ", message: error.message });
      }
    });

    // get data by user
    app.get("/parcels", async (req, res) => {
      try {
        const userEmail = req.query.email;
        const query = userEmail ? { senderEmail: userEmail } : {};

        const options = {
          sort: { creation_date: -1 },
        };
        const result = await parcelCollection.find(query, options).toArray();
        res.send(result);
      } catch (error) {
        console.log("error fetching parcel", parcel);
        res
          .status(500)
          .send({ message: "internal server error ", message: error.message });
      }
    });

    app.post("/parcel", async (req, res) => {
      try {
        const parcel = req.body;
        const result = await parcelCollection.insertOne(parcel);

        res.status(201).json({
          success: true,
          message: "Parcel inserted successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error inserting parcel:", error);
        res.status(500).json({
          success: false,
          message: "Failed to insert parcel",
        });
      }
    });

    // delete routes
    app.delete("/parcels/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await parcelCollection.deleteOne(query);
        res.status(200).send(result);
      } catch (error) {
        console.log("Error deleting parcel");
        res
          .status(500)
          .send({ message: "Internal server error", message: error.message });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Parcel is cooking like a hot water");
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
