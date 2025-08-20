// src/app/out/[code]/responses/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

interface Response {
  id: number;
  text: string;
  created_at: string;
}

export default function ResponsesPage() {
  const params = useParams();
  const code = params.code as string;

  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/out/${code}/responses/`
        );
        if (!res.ok) throw new Error("Failed to load responses");
        const data = await res.json();
        setResponses(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [code]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Responses
      </Typography>

      {responses.length === 0 ? (
        <Typography>No responses yet.</Typography>
      ) : (
        <Paper>
          <List>
            {responses.map((response, idx) => (
              <div key={response.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={response.text}
                    secondary={`Submitted on ${new Date(
                      response.created_at
                    ).toLocaleString()}`}
                  />
                </ListItem>
                {idx < responses.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}
