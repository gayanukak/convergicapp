"use client";
import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HostCard() {
  const router = useRouter();

  return (
    <Paper elevation={4} sx={{ p: 4, textAlign: "center", width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Want to collect ideas?
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Start a topic, add questions, and gather input from your team or community.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.5 }}
          onClick={() => router.push("/create")}
        >
          Create Topic
        </Button>
      </Box>
    </Paper>
  );
}
