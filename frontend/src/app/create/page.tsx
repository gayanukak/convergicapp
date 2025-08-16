"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

// Use environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/topics/";

export default function CreateTopic() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [maxResponses, setMaxResponses] = useState("");
  const [allowReport, setAllowReport] = useState(false);
  const [onlyLoggedIn, setOnlyLoggedIn] = useState(false);

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    deadline?: string;
    maxResponses?: string;
    general?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Placeholder token; integrate with your auth system
  const authToken = "YOUR_AUTH_TOKEN_HERE";

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    const newErrors: typeof errors = {};

    // Frontend validation
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const topicData = {
      title: title.trim(),
      description: description.trim() || null,
      deadline: deadline || null,
      max_responses: maxResponses ? Number(maxResponses) : null,
      allow_report: allowReport,
      only_logged_in: onlyLoggedIn,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topicData),
      });

      if (response.ok) {
        // On success, redirect to dashboard
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        const backendErrors: { [key: string]: string } = {};
        for (const key in errorData) {
          backendErrors[key] = Array.isArray(errorData[key])
            ? errorData[key].join(", ")
            : String(errorData[key]);
        }
        setErrors(backendErrors);
      }
    } catch (error) {
      setErrors({ general: "Network error. Make sure the backend is running." });
      console.error(error);
    }

    setIsSubmitting(false);
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
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mb: 3 }}
        />

        {/* Description (optional) */}
        <TextField
          label="Description (optional)"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
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
          error={!!errors.deadline}
          helperText={errors.deadline}
          sx={{ mb: 3 }}
        />

        {/* Max Responses */}
        <TextField
          label="Max Responses"
          type="number"
          fullWidth
          value={maxResponses}
          onChange={(e) => setMaxResponses(e.target.value)}
          error={!!errors.maxResponses}
          helperText={errors.maxResponses}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Topic"}
          </Button>
        </Box>

        {/* General errors */}
        {errors.general && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.general}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
