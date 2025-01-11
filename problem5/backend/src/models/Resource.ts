import mongoose, { Schema } from 'mongoose';
import { IResource } from '../interfaces/IResource';



// Define the schema for the Resource model
const resourceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true }, // User who created the resource
    updatedBy: { type: String, required: true }, // User who last updated the resource
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create the Resource model using the schema
export const Resource = mongoose.model<IResource>('Resource', resourceSchema, 'resources');
