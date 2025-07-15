// src/pages/StatsPage.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Card, CardContent, Box, Alert } from "@mui/material";
import axios from "axios";

const StatsPage = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const handleFetch = async () => {
    setError("");
    setStats(null);
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/shorturls/${code}`);
      setStats(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Shortcode not found.");
      } else {
        setError("An error occurred: " + err.message);
      }
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6fb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", py: 6 }}>
      <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: "#1976d2" }}>
            URL Stats
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            Enter a shortcode to view its statistics.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
            <TextField
              label="Shortcode"
              value={code}
              onChange={e => setCode(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button variant="contained" onClick={handleFetch} disabled={loading || !code} sx={{ minWidth: 120 }}>
              {loading ? "Loading..." : "Get Stats"}
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {stats && (
            <Box sx={{ mt: 3, bgcolor: "#f0f7fa", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="body1"><b>Original URL:</b> {stats.originalUrl}</Typography>
              <Typography variant="body2" color="text.secondary"><b>Total Clicks:</b> {stats.totalClicks}</Typography>
              <Typography variant="body2" color="text.secondary"><b>Created At:</b> {stats.createdAt}</Typography>
              <Typography variant="body2" color="text.secondary"><b>Expiry:</b> {stats.expiry}</Typography>
              <Typography variant="subtitle2" sx={{ mt: 2, color: "#1976d2" }}>Click Details:</Typography>
              {stats.clicks.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No clicks yet.</Typography>
              ) : (
                stats.clicks.map((c, i) => (
                  <Box key={i} sx={{ mt: 1, p: 1, bgcolor: "white", borderRadius: 1, boxShadow: 0 }}>
                    <Typography variant="body2">Time: {c.timestamp}</Typography>
                    <Typography variant="body2">Referrer: {c.referrer}</Typography>
                    <Typography variant="body2">Location: {c.location}</Typography>
                  </Box>
                ))
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default StatsPage;
