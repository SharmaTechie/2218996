// src/pages/ShortenerPage.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Card, CardContent, Box, Alert, Snackbar } from "@mui/material";
import axios from "axios";

const ShortenerPage = () => {
  const [urls, setUrls] = useState([{ url: "", validity: 30, shortcode: "" }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAdd = () => {
    if (urls.length >= 5) return;
    setUrls([...urls, { url: "", validity: 30, shortcode: "" }]);
  };

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const handleSubmit = async () => {
    try {
      const res = await Promise.all(
        urls.map(u =>
          axios.post(`${API_URL}/shorturls`, {
            url: u.url,
            validity: parseInt(u.validity),
            shortcode: u.shortcode || undefined,
          })
        )
      );
      setResults(res.map(r => r.data));
      setSuccess(true);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Shortcode already in use. Please choose another.");
      } else {
        setError("An error occurred: " + err.message);
      }
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6fb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", py: 6 }}>
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: "#1976d2" }}>
            URL Shortener
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            Enter up to 5 URLs to shorten. Optionally set validity (in minutes) and a custom code.
          </Typography>
          {urls.map((u, i) => (
            <Grid container spacing={2} key={i} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Long URL"
                  fullWidth
                  value={u.url}
                  onChange={e => handleChange(i, "url", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  label="Validity (min)"
                  type="number"
                  value={u.validity}
                  onChange={e => handleChange(i, "validity", e.target.value)}
                  variant="outlined"
                  size="small"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Custom Code"
                  value={u.shortcode}
                  onChange={e => handleChange(i, "shortcode", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          ))}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleAdd} disabled={urls.length >= 5} variant="outlined" color="primary">
              Add URL
            </Button>
            <Button variant="contained" onClick={handleSubmit} sx={{ minWidth: 120 }}>
              Shorten
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </CardContent>
        {results.length > 0 && (
          <CardContent sx={{ bgcolor: "#f0f7fa", borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ mb: 1, color: "#1976d2" }}>Shortened Links</Typography>
            {results.map((r, idx) => (
              <Box key={idx} sx={{ mb: 1, p: 1, bgcolor: "white", borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="body1">
                  <b>Short Link:</b> <a href={r.shortLink} target="_blank" rel="noopener noreferrer">{r.shortLink}</a>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Expires at:</b> {r.expiry}
                </Typography>
              </Box>
            ))}
          </CardContent>
        )}
      </Card>
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          URLs shortened successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShortenerPage;
