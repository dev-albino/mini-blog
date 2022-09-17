import React from 'react';

// CSS
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <h3>Escreva sobre o que você tem interesse!</h3>
        <p>Mini <strong>BLOG</strong> &copy; 2022.</p>
    </footer>
  )
}

export default Footer;