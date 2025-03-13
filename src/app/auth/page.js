"use client"; 
import { useState } from 'react';
import styles from '@/styles/AuthForm.module.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const requestBody = {
      type: isLogin ? 'login' : 'register',
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        alert(isLogin ? 'Login successful!' : 'Registration successful!');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`${styles.authContainer} ${isLogin ? styles.loginMode : styles.registerMode}`}>
      <div className={styles.authBox}>
        {/* Welcome Section (No Toggle Button Here) */}
        <div className={styles.welcomeSection}>
          <h2>{isLogin ? 'Hello, Welcome!' : 'Welcome Back!'}</h2>
          <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          <h2>{isLogin ? 'Login' : 'Registration'}</h2>
          {message && <p className={styles.message}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <input className={styles.inputField} type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            {!isLogin && <input className={styles.inputField} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />}
            <input className={styles.inputField} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button className={styles.primaryButton} type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <div className={styles.socialLogin}>
            <p>or {isLogin ? 'login' : 'register'} with social platforms</p>
            <div className={styles.socialIcons}>
              <button className={styles.socialButton}>G</button>
              <button className={styles.socialButton}>F</button>
              <button className={styles.socialButton}>Git</button>
              <button className={styles.socialButton}>In</button>
            </div>
          </div>
        </div>
      </div>

      {/* Separate Toggle Buttons Below */}
      <div className={styles.switchButtons}>
        <button className={`${styles.switchButton} ${isLogin ? styles.active : ''}`} onClick={() => setIsLogin(true)}>Login</button>
        <button className={`${styles.switchButton} ${!isLogin ? styles.active : ''}`} onClick={() => setIsLogin(false)}>Register</button>
      </div>
    </div>
  );
}
