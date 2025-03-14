"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext"; // ✅ Import Cart Context
import styles from "@/styles/product.module.css";
import { products } from "@/app/data/products";

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart(); // ✅ Get addToCart function
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [orderAvailable, setOrderAvailable] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    if (params?.id) {
      const foundProduct = products.find((p) => p.id === Number(params.id));
      setProduct(foundProduct || false);
    }
  }, [params]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setCartMessage("Added to cart!");
      setTimeout(() => setCartMessage(""), 3000); // Hide message after 3s
    }
  };

  const handleBuyNow = () => {
    if (!orderAvailable) {
      setShowModal(true);
    } else {
      setCartMessage("We will inform you when online orders are available.");
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  if (product === null) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.productPage}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link> / <Link href="/shop">All Products</Link> / {product.name}
      </nav>

      <div className={styles.productContainer}>
        {/* Left Side: Product Image */}
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>

        {/* Right Side: Product Info */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.sku}>SKU: {product.id}</p>

          <p className={styles.price}>
            {product.salePrice && <span className={styles.oldPrice}>${product.price}.00</span>}
            <span className={styles.newPrice}>${product.salePrice || product.price}.00</span>
          </p>

          {/* Quantity Selector */}
          <div className={styles.quantityWrapper}>
            <label className={styles.quantityLabel}>Quantity</label>
            <input
              type="number"
              className={styles.quantityInput}
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button className={styles.addToCart} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className={styles.buyNow} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* ✅ Show Cart Message */}
          {cartMessage && <p className={styles.cartMessage}>{cartMessage}</p>}
        </div>
      </div>

      {/* ✅ Modal Popup */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeModal} onClick={() => setShowModal(false)}>✖</button>
            <h2>We can't accept online orders right now</h2>
            <p>Please contact us to complete your purchase.</p>
            <p>We will notify you when online orders are available.</p>
            <button className={styles.modalButton} onClick={() => setShowModal(false)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
