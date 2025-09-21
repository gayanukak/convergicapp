"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const GUEST_BASE = "/in/";
const HOST_BASE = "/out/";

export default function CreateTopic() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Dayjs | null>(null); // init null (fix SSR mismatch)
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

  // ✅ Initialize deadline only on client
  useEffect(() => {
    setDeadline(dayjs().add(5, "minute"));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    const newErrors: typeof errors = {};

    // Title validation
    if (!title.trim()) newErrors.title = "Topic / Question is required.";
    if (title.trim().length > 250)
      newErrors.title = "Topic is too long (max 250 characters).";

    // Description validation
    if (description.trim().length > 5000)
      newErrors.description = "Description too long (max 5000 characters).";

    // At least one of deadline or maxResponses
    if (!deadline && !maxResponses) {
      newErrors.general = "Please provide either a deadline or max responses.";
    }

    // Max responses validation
    if (maxResponses && (Number(maxResponses) <= 0 || Number(maxResponses) > 100)) {
      newErrors.maxResponses = "Max responses must be between 1 and 100.";
    }

    // Deadline must be in the future
    if (deadline && deadline.isBefore(dayjs())) {
      newErrors.deadline = "Deadline must be in the future.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const topicData = {
      title: title.trim(),
      description: description.trim() || null,
      // ✅ Always send UTC to backend
      deadline: deadline ? deadline.utc().toISOString() : null,
      max_responses: maxResponses ? Number(maxResponses) : null,
      allow_report: allowReport,
      only_logged_in: onlyLoggedIn,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/topic-create/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(topicData),
        }
      );

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
      setGuestLink(data.guest_link);
      setHostLink(data.host_link);
    } catch (error) {
      console.error(error);
      setErrors({
        general: "Network error. Make sure the backend is running.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/background/nnnoise.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create a New Topic
          </Typography>

          {/* Topic Field */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Topic / Question
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            required
            placeholder="Enter your topic or question here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title || `${title.length}/1000 characters`}
            sx={{ mb: 3 }}
          />

          {/* Description Field */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Description (optional)
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="Enter a description or additional details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description || `${description.length}/5000 characters`}
            sx={{ mb: 3 }}
          />

          {/* Deadline + Max Responses */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Deadline / Max Responses
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Deadline"
                  value={deadline}
                  onChange={(newValue) => {
                    if (newValue && newValue.isBefore(dayjs())) {
                      setDeadline(dayjs().add(5, "minute"));
                    } else {
                      setDeadline(newValue);
                    }
                  }}
                  minDateTime={dayjs().add(5, "minute")}
                  slots={{ textField: TextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.deadline,
                      helperText: errors.deadline,
                    },
                    actionBar: {
                      sx: {
                        "& .MuiButton-root:hover": {
                          color: "#171717",
                        },
                      },
                    },
                  }}
                  enableAccessibleFieldDOMStructure={false}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Max Responses"
                type="number"
                fullWidth
                value={maxResponses}
                onChange={(e) => setMaxResponses(e.target.value)}
                error={!!errors.maxResponses}
                helperText={errors.maxResponses}
                inputProps={{ max: 100 }}
              />
            </Grid>
          </Grid>

          {/* Options */}
          <FormControlLabel
            control={
              <Checkbox
                checked={allowReport}
                onChange={(e) => setAllowReport(e.target.checked)}
              />
            }
            label="Allow participants to see the report"
          />

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

          {/* Links */}
          {guestLink && hostLink && (
            <Box sx={{ mt: 4 }}>
              <Typography>
                Guest Link: <a href={guestLink}>{guestLink}</a>
              </Typography>
              <Typography>
                Host Link: <a href={hostLink}>{hostLink}</a>
              </Typography>
            </Box>
          )}

          {/* General Errors */}
          {errors.general && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errors.general}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
