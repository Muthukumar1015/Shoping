"use client"; 
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "../styles/footer.module.css";

export default function Footer() {
   return (
      <footer className={styles.footer}>
         <div className={styles.container}>
            {/* Store Location */}
            <div className={styles.column}>
               <h3>Store Location</h3>
               <p>Market Street</p>
               <p>Ariyalur, Tn</p>
               <p>https://shoping-puce.vercel.app/</p>
               <p>8148835997</p>
               <div className={styles.socialIcons}>
                  <FaFacebookF />
                  <FaInstagram />
                  <FaTwitter />
                  <FaYoutube />
               </div>
            </div>

            {/* Shop */}
            <div className={styles.column}>
               <h3>Shop</h3>
               <Link href="#">Shop All</Link>
               <Link href="#">Computers</Link>
               <Link href="#">Tablets</Link>
               <Link href="#">Drones & Cameras</Link>
               <Link href="#">Audio</Link>
               <Link href="#">Mobile</Link>
               <Link href="#">TV & Home Cinema</Link>
               <Link href="#">Wearable Tech</Link>
               <Link href="#">Sale</Link>
            </div>

            {/* Customer Support */}
            <div className={styles.column}>
               <h3>Customer Support</h3>
               <Link href="#">Contact Us</Link>
               <Link href="#">Help Center</Link>
               <Link href="#">About Us</Link>
               <Link href="#">Careers</Link>
            </div>

            {/* Policy */}
            <div className={styles.column}>
               <h3>Policy</h3>
               <Link href="#">Shipping & Returns</Link>
               <Link href="#">Terms & Conditions</Link>
               <Link href="#">Payment Methods</Link>
               <Link href="#">FAQ</Link>
            </div>
         </div>

         {/* Payment Methods */}
         <div className={styles.paymentSection}>
            <p>We accept the following payment methods</p>
            <div className={styles.paymentIcons}>
               <img src="/visa.png" alt="Visa" />
               <img src="/mastercard.png" alt="Mastercard" />
               <img src="/paypal.png" alt="PayPal" />
               <img src="/discover.png" alt="Discover" />
            </div>
         </div>

         {/* Copyright */}
         <div className={styles.copyright}>
            <p>© 2025 by Mk Shopp</p>
         </div>
      </footer>
   );
}
