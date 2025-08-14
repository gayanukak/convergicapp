"use client";

import { useRouter, useParams } from "next/navigation";
import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function JoinCodePage() {
  const { code } = useParams();

  // You can add validation here or fetch discussion data by code

  const handleBack = () => {
    // Go back to homepage
    window.history.back();
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Joining discussion with code: {code}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        (This page will load the discussion and input UI soon.)
      </Typography>
      <Button variant="contained" onClick={handleBack}>
        Back
      </Button>
    </Box>
  );
}