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

// Base paths for links
const GUEST_BASE = "/in/";
const HOST_BASE = "/out/";

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
  const [guestLink, setGuestLink] = useState("");
  const [hostLink, setHostLink] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    const newErrors: typeof errors = {};

    // Frontend validation
    if (!title.trim()) newErrors.title = "Title is required.";

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

      if (!response.ok) {
        const errorData = await response.json();
        const backendErrors: { [key: string]: string } = {};
        for (const key in errorData) {
          backendErrors[key] = Array.isArray(errorData[key])
            ? errorData[key].join(", ")
            : String(errorData[key]);
        }
        setErrors(backendErrors);
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();

      // Set the guest and host links
      setGuestLink(data.guest_link);
      setHostLink(data.host_link);

      // Optionally, redirect after short delay
      // router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrors({ general: "Network error. Make sure the backend is running." });
    }

    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Topic
        </Typography>

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

        <FormControlLabel
          control={<Checkbox checked={allowReport} onChange={(e) => setAllowReport(e.target.checked)} />}
          label="Allow participants to see the report"
        />
        <FormControlLabel
          control={<Checkbox checked={onlyLoggedIn} onChange={(e) => setOnlyLoggedIn(e.target.checked)} />}
          label="Allow only logged-in users to participate"
        />

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Topic"}
          </Button>
        </Box>

        {/* Show the generated links */}
        {guestLink && hostLink && (
          <Box sx={{ mt: 4 }}>
            <Typography>Guest Link: <a href={guestLink}>{guestLink}</a></Typography>
            <Typography>Host Link: <a href={hostLink}>{hostLink}</a></Typography>
          </Box>
        )}

        {errors.general && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.general}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
