"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
   FaTruck,
   FaUserCircle,
   FaHeart,
   FaShoppingBag,
   FaSearch,
   FaBars,
} from "react-icons/fa";
import { useCart } from "@/app/context/CartContext"; // ✅ Import Cart Context
import CartSidebar from "@/components/CartSidebar"; // ✅ Import Cart Sidebar
import styles from "../styles/navbar.module.css";

export default function Navbar() {
   const [search, setSearch] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);
   const { cart, isCartOpen, setIsCartOpen } = useCart(); // ✅ Use Cart Context
   const router = useRouter();

   return (
      <nav className={styles.navbar}>
         {/* Top Bar */}
         <div className={styles.topBar}>
            <span className={styles.shipping}>
               <FaTruck /> Free Shipping for orders over $50
            </span>
            <div className={styles.topLinks}>
               <Link href="#">About</Link>
               <Link href="#">Contact</Link>
               <Link href="#">Help Center</Link>
               <span>
                  Call Us <a href="tel:1234567890">123-456-7890</a>
               </span>
            </div>
         </div>

         {/* Main Navbar */}
         <div className={styles.mainNav}>
            <div className={styles.logoMenuContainer}>
               <h1 className={styles.logo}>Mk Shop</h1>
               <button
                  className={styles.menuButton}
                  onClick={() => setMenuOpen(!menuOpen)}
               >
                  <FaBars />
               </button>
            </div>

            {/* Search Bar */}
            <div className={styles.searchBarContainer}>
               <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
               />
               <button className={styles.searchButton}>
                  <FaSearch />
               </button>
            </div>

            {/* Icons */}
            <div className={styles.icons}>
               {/* Clicking Log In redirects to /auth */}
               <button
                  className={styles.loginButton}
                  onClick={() => router.push("/auth")}
               >
                  <FaUserCircle /> Log In
               </button>

               {/* ✅ Cart Icon: Click to open cart sidebar */}
               <button
                  className={styles.cartIcon}
                  onClick={() => setIsCartOpen(true)}
               >
                  <FaShoppingBag />
                  {cart.length > 0 && (
                     <span className={styles.cartCount}>{cart.length}</span>
                  )}
               </button>
            </div>
         </div>

         {/* Categories (Mobile Toggle) */}
         {menuOpen && (
            <div className={styles.categoriesMobile}>
               {[
                  "Shop All",
                  "Computers",
                  "Tablets",
                  "Drones & Cameras",
                  "Audio",
                  "Mobile",
                  "TV & Home Cinema",
                  "Wearable Tech",
                  "Sale",
               ].map((item, index) => (
                  <Link key={index} href="#" className={styles.categoryItem}>
                     {item}
                  </Link>
               ))}
            </div>
         )}

         {/* Categories (Desktop View) */}
         <div className={styles.categoriesDesktop}>
            {[
               "Shop All",
               "Computers",
               "Tablets",
               "Drones & Cameras",
               "Audio",
               "Mobile",
               "TV & Home Cinema",
               "Wearable Tech",
               "Sale",
            ].map((item, index) => (
               <Link key={index} href="/shop" className={styles.categoryItem}>
                  {item}
               </Link>
            ))}
         </div>

         {/* ✅ Cart Sidebar */}
         <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
         />
      </nav>
   );
}
