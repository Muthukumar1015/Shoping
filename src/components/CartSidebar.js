"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import styles from "@/styles/cartSidebar.module.css";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [viewCartPopup, setViewCartPopup] = useState(false); // ✅ View Cart Popup State
  const router = useRouter();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={`${styles.cartSidebar} ${isCartOpen ? styles.open : ""}`}>
      {/* Cart Header */}
      <div className={styles.cartHeader}>
        <h2>Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})</h2>
        <button className={styles.closeButton} onClick={() => setIsCartOpen(false)}>✖</button>
      </div>

      {/* Cart Items */}
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p className={styles.emptyMessage}>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartImage} />
              <div className={styles.cartDetails}>
                <p className={styles.cartTitle}>{item.name}</p>
                <p className={styles.cartPrice}>${item.price}.00</p>
                <div className={styles.quantity}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>🗑</button>
            </div>
          ))
        )}
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div className={styles.cartFooter}>
          <p className={styles.totalPrice}>Subtotal: <strong>${getTotalPrice().toFixed(2)}</strong></p>
          <p className={styles.taxNote}>Taxes and shipping are calculated at checkout.</p>

          {/* ✅ Checkout Button - Shows Popup */}
          <button className={styles.checkoutButton} onClick={() => setShowPopup(true)}>Checkout</button>

          {/* ✅ View Cart Button - Shows Popup for 3s */}
          <button 
            className={styles.viewCartButton} 
            onClick={() => {
              setViewCartPopup(true); // Show popup
              setTimeout(() => setViewCartPopup(false), 3000); // Hide after 3s
            }}
          >
            View Cart
          </button>
        </div>
      )}

      {/* ✅ Checkout Popup */}
      {showPopup && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeModal} onClick={() => setShowPopup(false)}>✖</button>
            <h2>We can't accept online orders right now</h2>
            <p>Please contact us to complete your purchase.</p>
            <p>We will notify you when online orders are available.</p>
            <button className={styles.modalButton} onClick={() => setShowPopup(false)}>Got it</button>
          </div>
        </div>
      )}

      {/* ✅ View Cart Popup */}
      {viewCartPopup && (
        <div className={styles.viewCartPopup}>
          <p>This is your View Cart</p>
        </div>
      )}
    </div>
  );
}
