// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResourceListPage from "./pages/ResourceListPage";
import ResourceRegisterPage from "./pages/ResourceRegisterPage";
import ResourceUpdatePage from "./pages/ResourceUpdatePage";
import { Container, CssBaseline } from "@mui/material";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" sx={{margin: "20px"}}>
        <Router>
          <Routes>
            <Route path="/" element={<ResourceListPage />} />
            <Route path="/resources" element={<ResourceListPage />} />
            <Route
              path="/resources/register"
              element={<ResourceRegisterPage />}
            />
            <Route
              path="/resources/update/:id"
              element={<ResourceUpdatePage />}
            />
          </Routes>
        </Router>
      </Container>
    </React.Fragment>
  );
};

export default App;
