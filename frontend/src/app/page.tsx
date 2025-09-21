"use client";

import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import HostCard from "@/components/HostCard";
import GuestCard from "@/components/GuestCard";

export default function HomePage(): React.ReactElement {
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
      <Container maxWidth="lg" sx={{ py: 8 }} className="main">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Collect. Share. Converge Ideas.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Convergic app helps you gather diverse ideas, spark innovation, and summarize insights — all in one place.
          </Typography>
        </Box>

        {/* Host & Guest Cards */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <HostCard />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <GuestCard />
          </Grid>
        </Grid>

        {/* About Section */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            What is Convergic app?
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}
          >
            Convergic app is a collaborative platform where ideas meet structure.
            Post topics, collect responses, and let AI summarize key points for
            you. Perfect for brainstorming, surveys, and group decision-making.
          </Typography>

          <Typography variant="h4" gutterBottom>
            How it Works
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            1. Hosts create topics with questions.
            <br />
            2. Guests join using a code or link.
            <br />
            3. AI summarizes all input for clear insights.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
