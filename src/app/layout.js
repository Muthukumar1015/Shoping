import Navbar from "@/components/navbar"; // Import Navbar
import Footer from "@/components/footer"; // Import Footer
import "./globals.css"; // Import global styles if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />  {/* Add Navbar here */}
        {children}   {/* Render other page components here */}
        <Footer />   {/* Add Footer here */}
      </body>
    </html>
  );
}
