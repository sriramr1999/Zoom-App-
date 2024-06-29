import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ZoomIcon from "@mui/icons-material/VideoCall";
import "./App.css";
import logo from "./logo.png";
import zoomLogo from "./zoom-logo.png";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://2675-2401-4900-6296-c834-15f3-c4c4-7cf-8f7a.ngrok-free.app/connect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ meetingLinkUrl: url }),
        }
      );
      const data = await res.json();
      setResponse(data);
      toast.success("Submission successful!");
    } catch (error) {
      toast.error("Error submitting the URL!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <ToastContainer />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={3}
        sx={{ gap: 2 }}
      >
        <img src={logo} alt="Logo" style={{ width: "120px" }} />
        <Typography variant="h6" component="span">
          X
        </Typography>
        <img src={zoomLogo} alt="Zoom Logo" style={{ width: "120px" }} />
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Zoom Meeting URL"
          variant="outlined"
          placeholder="https://us05web.zoom.us/j/xxxxxx?pwd=yyyyy.1"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ZoomIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!url || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Container>
  );
}

export default App;
