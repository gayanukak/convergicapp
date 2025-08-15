"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography
} from "@mui/material";

export default function CreateTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [maxResponses, setMaxResponses] = useState("");
  const [allowReport, setAllowReport] = useState(false);
  const [onlyLoggedIn, setOnlyLoggedIn] = useState(false);

  const handleSubmit = async () => {
    const topicData = {
      title,           // This is now the main "question"
      description,
      deadline,
      maxResponses,
      allowReport,
      onlyLoggedIn
    };

    // TODO: Replace with your actual API call
    console.log("Submitting topic:", topicData);
    alert("Topic created! (Check console)");
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Topic
        </Typography>

        {/* Topic Title */}
        <TextField
          label="Topic / Question"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Description */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Deadline */}
        <TextField
          label="Deadline"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Max Responses */}
        <TextField
          label="Max Responses"
          type="number"
          fullWidth
          value={maxResponses}
          onChange={(e) => setMaxResponses(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Options */}
        <FormControlLabel
          control={<Checkbox checked={allowReport} onChange={(e) => setAllowReport(e.target.checked)} />}
          label="Allow participants to see the report"
        />
        <FormControlLabel
          control={<Checkbox checked={onlyLoggedIn} onChange={(e) => setOnlyLoggedIn(e.target.checked)} />}
          label="Allow only logged-in users to participate"
        />

        {/* Submit */}
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Topic
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
