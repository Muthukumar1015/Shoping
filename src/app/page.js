"use client"; // Add this at the top

import { useState } from "react";
import Hero from "@/components/Hero";
import AuthForm from "@/app/auth/page";
import Shop from "@/app/shop/page"; // Import Shop component

export default function Home() {
   const [showAuth, setShowAuth] = useState(false);
   const [showShop, setShowShop] = useState(false); // State to control shop visibility

   return (
      <main
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "#f4f4f4",
         }}
      >
         <Hero /> {/* Hero Section */}
         {/* Login Button */}
         <button onClick={() => setShowAuth(true)}>Login</button>
         {/* Show AuthForm Only When Clicked */}
         {showAuth && <AuthForm />}
         {/* Shop Button */}
         <button onClick={() => setShowShop(true)}>Go to Shop</button>
         {/* Show Shop Only When Clicked */}
         {showShop && <Shop />}
      </main>
   );
}
