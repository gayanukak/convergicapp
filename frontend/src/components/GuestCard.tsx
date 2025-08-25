"use client";
import React, { useState } from "react";
import { Paper, Typography, Button, Box, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GuestCard() {
  const [showCodeField, setShowCodeField] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!code.trim()) return;
    setLoading(true);

    const normalized = code.trim();
    setLoading(false);
    router.push(`/in/${encodeURIComponent(normalized)}`);
  };

  return (
    <Paper elevation={4} sx={{ p: 4, textAlign: "center", width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Want to give ideas?
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Join a discussion using the code shared with you.
      </Typography>

      {!showCodeField ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.5 }}
          onClick={() => setShowCodeField(true)}
        >
          Enter Code
        </Button>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Enter your code"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputProps={{ "aria-label": "Join code" }}
            autoFocus
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Joining…" : "Join"}
          </Button>
        </Box>
      )}
    </Paper>
  );
}
