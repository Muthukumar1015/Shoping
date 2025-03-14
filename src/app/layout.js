import Navbar from "@/components/navbar"; // Import Navbar
import Footer from "@/components/footer"; // Import Footer
import { CartProvider } from "@/app/context/CartContext"; // Import Cart Context
import "./globals.css"; // Import global styles if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>  {/* ✅ Wrap the whole app with CartProvider */}
          <Navbar />  {/* Navbar now has access to CartContext */}
          {children}   {/* Render other page components here */}
          <Footer />   {/* Add Footer here */}
        </CartProvider>
      </body>
    </html>
  );
}
