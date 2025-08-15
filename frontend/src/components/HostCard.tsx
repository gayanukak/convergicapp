"use client";
import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HostCard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
        <Typography>Checking your session…</Typography>
      </Paper>
    );
  }

  if (session) {
    return (
      <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Signed in as {session.user?.email}
        </Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => signOut()}>
            Sign Out
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={4} sx={{ p: 4, textAlign: "center" }}>
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
          startIcon={<GoogleIcon />}
          sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Sign in with Google
        </Button>
      </Box>
    </Paper>
  );
}
