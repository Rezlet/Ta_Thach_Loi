import mongoose from 'mongoose';

export async function createCollection() {
  const db = mongoose.connection.db!;

  try {
    // Create collection 'resources' manually
    await db.createCollection('resources');
    console.log('Collection "resources" created.');
  } catch (error) {
    console.error('Error creating collection:', error);
  }
}
