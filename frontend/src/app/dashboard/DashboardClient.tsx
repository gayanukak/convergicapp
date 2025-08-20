// src/app/dashboard/DashboardClient.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

interface Topic {
  code: string;
  title: string;
  description?: string;
  created_at: string;
  deadline?: string;
}

export default function DashboardClient() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`
        );
        if (!res.ok) throw new Error("Failed to load topics");
        const data = await res.json();
        setTopics(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {topics.length === 0 ? (
        <Typography>No topics created yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {topics.map((topic) => (
            <Grid size={6} key={topic.code}>
              <Card>
                <CardActionArea onClick={() => router.push(`/out/${topic.code}`)}>
                  <CardContent>
                    <Typography variant="h6">{topic.title}</Typography>
                    {topic.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                        noWrap
                      >
                        {topic.description}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 1 }}
                    >
                      Created: {new Date(topic.created_at).toLocaleDateString()}
                    </Typography>
                    {topic.deadline && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ display: "block", mt: 1 }}
                      >
                        Deadline: {new Date(topic.deadline).toLocaleDateString()}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
