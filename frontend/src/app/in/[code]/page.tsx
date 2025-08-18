"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

interface Topic {
  title: string;
  description?: string;
  deadline?: string;
  max_responses?: number;
  allow_report?: boolean;
  only_logged_in?: boolean;
  code: string;
  created_at: string;
}

export default function GuestPage() {
  const params = useParams();
  const code = params.code as string;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch topic info
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/in/${code}/`
        );
        if (!res.ok) throw new Error("Topic not found");
        const data = await res.json();
        setTopic(data);
      } catch (err: any) {
        setError(err.message || "Failed to load topic");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [code]);

  // Submit guest response
  const handleSubmit = async () => {
    if (!response.trim()) {
      setError("Response cannot be empty");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/in/${code}/responses/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: response }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit response");
      }

      setSuccessMsg("Your response has been submitted!");
      setResponse("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error && !topic) return <Typography color="error">{error}</Typography>;
  if (!topic) return <Typography>No topic data available</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">{topic.title}</Typography>
        {topic.description && (
          <Typography sx={{ mt: 2 }}>{topic.description}</Typography>
        )}
        {topic.deadline && (
          <Typography sx={{ mt: 2 }}>
            Deadline: {new Date(topic.deadline).toLocaleString()}
          </Typography>
        )}
        {topic.max_responses && (
          <Typography>Max Responses: {topic.max_responses}</Typography>
        )}
        {topic.allow_report && (
          <Typography>Report visible to participants</Typography>
        )}
        {topic.only_logged_in && (
          <Typography>Only logged-in users can participate</Typography>
        )}

        {/* Response Form */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Submit Your Response
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Your Response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
