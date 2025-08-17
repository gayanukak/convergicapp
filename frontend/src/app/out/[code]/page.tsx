"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";

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

export default function HostPage() {
  const params = useParams();
  const code = params.code as string;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/out/${code}/`);
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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!topic) return <Typography>No topic data available</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">{topic.title}</Typography>
        {topic.description && <Typography sx={{ mt: 2 }}>{topic.description}</Typography>}
        {topic.deadline && <Typography sx={{ mt: 2 }}>Deadline: {new Date(topic.deadline).toLocaleString()}</Typography>}
        {topic.max_responses && <Typography>Max Responses: {topic.max_responses}</Typography>}
        <Typography sx={{ mt: 2 }}>Code: {topic.code}</Typography>
        {topic.allow_report && <Typography>Report visible to participants</Typography>}
        {topic.only_logged_in && <Typography>Only logged-in users can participate</Typography>}
        {/* You can add more host-only controls here */}
      </Paper>
    </Container>
  );
}
