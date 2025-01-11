import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import ResourceForm from "../components/ResourceForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BE_SERVER } from "../config/constant";

const ResourceUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    status: "",
    tags: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchResource();
    }
  }, [id]);

  const fetchResource = async () => {
    try {
      const response = await axios.get(`${BE_SERVER}/api/resources/${id}`);
      const { name, description, status, tags } = response.data;
      setInitialValues({
        name,
        description,
        status,
        tags: tags.join(","), // Convert array to comma-separated string
      });
    } catch (error) {
      console.error("Error fetching resource:", error);
    }
  };

  const handleSubmit = async (resourceData: {
    name: string;
    description: string;
    status: string;
    tags: string;
  }) => {
    try {
      const { name, description, status, tags } = resourceData;
      await axios.put(`${BE_SERVER}/api/resources/${id}`, {
        name,
        description,
        status,
        tags: tags.split(","), // Convert comma-separated string to array
      });
      setMessageType("success");
      setMessage("Resource updated successfully!");
      setTimeout(() => {
        navigate("/resources");
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setMessageType("error")
      setMessage("Failed to update resource");
      console.error(error);
    }
  };

  return (
    <Container>
      <ResourceForm
        handleSubmit={handleSubmit}
        message={message}
        messageType={messageType}
        initialValues={initialValues}
      />
    </Container>
  );
};

export default ResourceUpdatePage;
