import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'my-shop';

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let cachedClient = null;

export async function dbConnect() {
  if (cachedClient) {
    return cachedClient.db(DB_NAME);
  }

  try {
    const connectedClient = await client.connect();
    await connectedClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    cachedClient = connectedClient;
    return connectedClient.db(DB_NAME);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to the database.");
  }
}