import { NextFunction, Request } from "express";
import { Resource } from "../models/Resource";

// 1. Create Resource
export const createResource = async (req: Request, res: any) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }
  const { name, description, createdBy, updatedBy, status, tags } = req.body;

  try {
    const newResource = new Resource({
      name,
      description,
      createdBy,
      updatedBy,
      status,
      tags,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: "Error creating resource", error });
  }
};

// 2. Get All Resources with Filters (Không có Pagination)
export const getAllResources = async (req: Request, res: any, next: NextFunction) => {
  try {
    const filters: any = {};

    // Filter by name
    if (req.query.name) {
      filters.name = { $regex: req.query.name, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa/chữ thường
    }

    // Filter by description
    if (req.query.description) {
      filters.description = { $regex: req.query.description, $options: 'i' };
    }

    // Filter by status
    if (req.query.status) {
      filters.status = req.query.status;
    }

    // Filter by tags
    if (req.query.tags) {
      if (Array.isArray(req.query.tags)) {
        filters.tags = { $in: req.query.tags };
      } else if (typeof req.query.tags === 'string') {
        filters.tags = { $in: req.query.tags.split(',') };
      }
    }

    // Filter by createdBy
    if (req.query.createdBy) {
      filters.createdBy = req.query.createdBy;
    }

    if (req.query.updatedBy) {
      filters.updatedBy = req.query.updatedBy;
    }


    // Filter by startDate and endDate
    if (req.query.startDate && req.query.endDate) {
      const startDate = String(req.query.startDate);
      const endDate = String(req.query.endDate);

      if (!isNaN(new Date(startDate).getTime()) && !isNaN(new Date(endDate).getTime())) {
        filters.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
    }
    const resources = await Resource.find(filters);

    res.status(200).json(resources);
  } catch (error) {
    next(error); 
  }
};
// 3. Get Resource by ID
export const getResourceById = async (req: Request, res: any) => {
  const { id } = req.params;
  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resource", error });
  }
};

// 4. Update Resource
export const updateResource = async (req: Request, res: any) => {
  const { id } = req.params;
  const { name, description, updatedBy, status, tags } = req.body;

  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { name, description, updatedBy, status, tags },
      { new: true } // Return the updated document
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: "Error updating resource", error });
  }
};

// 5. Delete Resource
export const deleteResource = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const deletedResource = await Resource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource", error });
  }
};
