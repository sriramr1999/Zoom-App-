import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://your-endpoint.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom></Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Zoom Meeting URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
      {response && (
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          Response: {JSON.stringify(response)}
        </Typography>
      )}
    </Container>
  );
}

export default App;
