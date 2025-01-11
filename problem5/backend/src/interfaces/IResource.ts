import { Document } from "mongoose";

// Define an interface for a resource document
export interface IResource extends Document {
    name: string;
    description: string;
    createdBy: string; 
    updatedBy: string;
    status: 'active' | 'inactive' | 'archived'; // Enum for resource status
    tags: string[]; 
    createdAt: Date; 
    updatedAt: Date; 
  }