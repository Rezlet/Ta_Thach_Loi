// src/components/ResourceCard.tsx

import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

interface ResourceCardProps {
  resource: {
    _id: string;
    name: string;
    description: string;
    status: string;
    tags: string[];
  };
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {resource.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {resource.description}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Status: {resource.status}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Tags: {resource.tags.join(", ")}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/resources/update/${resource._id}`}>
          <Button size="small" variant="outlined">
            Edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ResourceCard;
