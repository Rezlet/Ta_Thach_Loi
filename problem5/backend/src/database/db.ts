import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/mydatabase'; // Your MongoDB URI
const client = new MongoClient(uri);

async function createCollection() {
  try {
    await client.connect();
    const db = client.db(); // Get database

    // Create collection 'resources' manually
    const collection = await db.createCollection('resources');
    console.log('Collection "resources" created:', collection.collectionName);
  } catch (error) {
    console.error('Error creating collection:', error);
  } finally {
    await client.close();
  }
}
