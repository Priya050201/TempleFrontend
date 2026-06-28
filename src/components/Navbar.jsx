import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, darkMode, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        ...styles.navbar,
        background: theme.colors.surface,
        color: theme.colors.text
      }}
    >

      <div
        style={{
          ...styles.brand,
          color: theme.colors.text
        }}
      >
        Temple Admin
      </div>

      {/* Desktop links */}
      <div className="nav-links">

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        ><Link
           style={{
             ...styles.link,
             color: theme.colors.text
           }} to="/">Home</Link>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
        <Link
          style={{
            ...styles.link,
            color: theme.colors.text
          }} to="/festivals">Festivals</Link>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
        <Link
          style={{
            ...styles.link,
            color: theme.colors.text
          }} to="/renovation">Renovation</Link>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
        <Link
          style={{
            ...styles.link,
            color: theme.colors.text
          }} to="/donation">Donate</Link>
        </motion.div>
<motion.div
  whileHover={{
    scale: 1.05
  }}
>
        <Link
          style={{
            ...styles.link,
            color: theme.colors.text
          }} to="/admin-login">
          Admin Login
        </Link>
        </motion.div>


      </div>

      {/* Mobile hamburger */}
      <div
        className="hamburger"
        onClick={() => setOpen(!open)}
        style={{
           ...styles.hamburger,
           color: theme.colors.text
        }}
      >
        ☰
      </div>


      {/* Mobile dropdown */}
      {open && (
        <div className="mobile-menu">

          <Link
            style={{
              ...styles.mobileLink,
              color: theme.colors.text
            }} to="/">Home</Link>
          <Link
            style={{
              ...styles.mobileLink,
              color: theme.colors.text
            }} to="/festivals">Festivals</Link>
          <Link
            style={{
              ...styles.mobileLink,
              color: theme.colors.text
            }} to="/renovation">Renovation</Link>
          <Link
            style={{
              ...styles.mobileLink,
              color: theme.colors.text
            }} to="/donation">Donate</Link>

          <Link
            style={{
              ...styles.link,
              color: theme.colors.text
            }} to="/admin-login">
            Admin Login
          </Link>

        </div>
      )}
      <button
        onClick={toggleTheme}
        style={{
          background: "transparent",
          color: theme.colors.text,
          border: "none",
          cursor: "pointer"
        }}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

    </nav>
  );
}

const styles = {
  navbar: {
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  brand: {

    fontWeight: "bold",
    fontSize: "18px"
  },

  link: {
    textDecoration: "none",
    transition: "0.2s ease"
  },

  mobileLink: {
    textDecoration: "none",
    padding: "8px 0"
  },

  adminButton: {
    background: "#334155",
    padding: "8px 14px",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none"
  },

  hamburger: {

    fontSize: "24px",
    cursor: "pointer",
    display: "none"
  }
};

export default Navbar;