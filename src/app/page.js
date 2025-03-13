"use client";  // Add this at the top

import { useState } from "react";
import Hero from "@/components/Hero";
import AuthForm from "@/app/auth/page";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f4f4f4" }}>
      <Hero /> {/* Hero Section */}
      
      {/* Login Button */}
      <button onClick={() => setShowAuth(true)}>Login</button>

      {/* Show AuthForm Only When Clicked */}
      {showAuth && <AuthForm />}
    </main>
  );
}
