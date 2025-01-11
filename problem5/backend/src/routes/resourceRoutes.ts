import express from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resourceController";

const router = express.Router();

// 1. Create Resource
router.post("/", createResource);

// 2. Get All Resources
router.get("/", getAllResources);

// 3. Get Resource by ID
router.get("/:id", getResourceById);

// 4. Update Resource
router.put("/:id", updateResource);

// 5. Delete Resource
router.delete("/:id", deleteResource);

export default router;
