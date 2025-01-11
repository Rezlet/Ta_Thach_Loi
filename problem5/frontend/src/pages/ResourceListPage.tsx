import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BE_SERVER } from "../config/constant";

const ResourceListPage: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [filters, setFilters] = useState({ name: "", status: "" });

  const statuses = ["active", "inactive", "archived"]; // Trạng thái mẫu

  useEffect(() => {
    fetchResources();
  }, [filters]);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${BE_SERVER}/api/resources`, {
        params: {
          name: filters.name,
          status: filters.status,
        },
      });
      setResources(response.data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };


  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resource List
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search by Name"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            select
            label="Filter by Status"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource._id}>
                <TableCell>{resource._id}</TableCell>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.description}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{resource.status}</TableCell>
                <TableCell>
                  <Link to={`/resources/update/${resource._id}`}>
                    <Button variant="outlined" color="primary" size="small">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/resources/register">
        <Button variant="contained" sx={{ mt: 3 }}>
          Register New Resource
        </Button>
      </Link>
    </Container>
  );
};

export default ResourceListPage;
