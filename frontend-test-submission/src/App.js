import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";

function Navbar() {
  const location = useLocation();
  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2", mb: 4, boxShadow: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          URL Shortener
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ fontWeight: location.pathname === "/" ? 700 : 400, borderBottom: location.pathname === "/" ? "2px solid #fff" : "none" }}
        >
          Shortener
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/stats"
          sx={{ fontWeight: location.pathname === "/stats" ? 700 : 400, borderBottom: location.pathname === "/stats" ? "2px solid #fff" : "none" }}
        >
          Stats
        </Button>
      </Toolbar>
    </AppBar>
  );
}

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<ShortenerPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  </Router>
);

export default App; 