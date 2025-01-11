import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { STATUS_RESOURCE } from "../config/constant";

interface ResourceFormProps {
  handleSubmit: (data: {
    name: string;
    description: string;
    status: string;
    tags: string;
  }) => void;
  message: string;
  messageType: string;
  initialValues?: {
    name: string;
    description: string;
    status: string;
    tags: string;
  };
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  handleSubmit,
  message,
  messageType,
  initialValues = { name: "", description: "", status: "", tags: "" },
}) => {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [status, setStatus] = useState(initialValues.status);
  const [tags, setTags] = useState(initialValues.tags);

  useEffect(() => {
    if (
      initialValues.name !== name ||
      initialValues.description !== description ||
      initialValues.status !== status ||
      initialValues.tags !== tags
    ) {
      setName(initialValues.name);
      setDescription(initialValues.description);
      setStatus(initialValues.status);
      setTags(initialValues.tags);
    }
  }, [initialValues]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({ name, description, status, tags });
  };

  return (
    
    <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {initialValues.name ? "Update Resource" : "Create New Resource"}
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Resource Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              fullWidth
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ textTransform: "capitalize" }}
            >
              {STATUS_RESOURCE.map((status) => (
                <MenuItem
                  key={status}
                  value={status}
                  sx={{ textTransform: "capitalize" }}
                >
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {initialValues.name ? "Update Resource" : "Create Resource"}
            </Button>
          </Grid>
        </Grid>
      </form>
      {message && (
        <Typography
          variant="body1"
          color={messageType === "success" ? "success" : "error"}
          mt={2}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ResourceForm;
