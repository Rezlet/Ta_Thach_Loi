import React, { useState } from "react";
import { Container } from "@mui/material";
import ResourceForm from "../components/ResourceForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BE_SERVER } from "../config/constant";

const ResourceRegisterPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();
  const handleSubmit = async (resourceData: {
    name: string;
    description: string;
    status: string;
    tags: string;
  }) => {
    try {
      const { name, description, status, tags } = resourceData;
      await axios.post(`${BE_SERVER}/api/resources`, {
        name,
        description,
        status,
        tags: tags.split(","),
        createdBy: "userId",
        updatedBy: "userId",
      });
      setMessageType("success");
      setMessage("Resource created successfully!");
      setTimeout(() => {
        navigate("/resources");
      }, 1000);
    } catch (error) {
      setMessageType("error");
      setMessage("Failed to create resource");
      console.error(error);
    }
  };

  return (
    <Container>
      <ResourceForm
        handleSubmit={handleSubmit}
        message={message}
        messageType={messageType}
        initialValues={{name: "", description: "", status: "", tags: ""}}
      />
    </Container>
  );
};

export default ResourceRegisterPage;
