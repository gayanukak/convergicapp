"use client";
import React from "react";

interface BackgroundProps {
  mode: "spark" | "nebula";
}

export default function Background({ mode }: BackgroundProps) {
  const image = mode === "spark" ? "/spark-bg.svg" : "/nebula-bg.svg";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
}
