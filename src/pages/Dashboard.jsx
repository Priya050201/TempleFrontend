import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Dashboard.css";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import PageWrapper from "../components/PageWrapper";
import AnimatedPage from "../components/AnimatedPage";

function Dashboard() {

    const [darkMode, setDarkMode] = useState(false);

    const theme = darkMode ? darkStyles : lightStyles;

    return (
         <AnimatedPage>
        <PageWrapper>



            <Navbar />


<div style={{
  display: "flex",
  justifyContent: "center"
}}>
            <div style={theme.container}>

                <h1 style={theme.title}>
                    Temple Admin Dashboard
                </h1>

                <p style={theme.subtitle}>
                    Manage all temple operations efficiently
                </p>

                <div style={theme.cardContainer}>
 <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
                    <Link to="/manage-festivals" style={theme.link}>
                        <AnimatedButton>
                            Manage Festivals
                        </AnimatedButton>
                    </Link>
                    </motion.div>
 <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
                    <Link to="/manage-renovation" style={theme.link}>
                        <AnimatedButton>
                            Manage Renovation
                        </AnimatedButton>
                    </Link>
                    </motion.div>
 <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
                    <Link to="/manage-donations" style={theme.link}>
                        <AnimatedButton>
                            Manage Donations
                        </AnimatedButton>
                    </Link>
                    </motion.div>

                </div>

                <br />

                <AnimatedButton variant="danger" onClick={logout}>
                    Logout
                </AnimatedButton>

            </div>

        </div>

        </PageWrapper>
         </AnimatedPage>
    );
}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "/";
}



const lightStyles = {

    page: {
        minHeight: "100vh",
        background: "#f5f7fa"
    },

    container: {
        textAlign: "center",
        marginTop: "40px"
    },

    title: {
        fontSize: "38px",
        color: "#1f2937"
    },

    subtitle: {
        color: "#6b7280",
        marginBottom: "40px"
    },

    cardContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "30px"
    },

    link: {
        textDecoration: "none"
    },

    button: {
        width: "100%",
        maxWidth: "260px",
        padding: "18px",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        background: "#374151",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "0.3s"
    },

    logoutButton: {
        padding: "14px 24px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: "#7f1d1d",
        color: "white",
        fontWeight: "bold"
    }
};


const darkStyles = {

    page: {
        minHeight: "100vh",
        background: "#111827"
    },

    container: {
        textAlign: "center",
        marginTop: "40px"
    },

    title: {
        fontSize: "38px",
        color: "white"
    },

    subtitle: {
        color: "#9ca3af",
        marginBottom: "40px"
    },

    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginTop: "30px",
      padding: "0 10px"
    },

    link: {
        textDecoration: "none"
    },

    button: {
      backgroundColor: "#334155",
      color: "white",
      border: "none",
      padding: "14px 22px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease"
    },

    logoutButton: {
        padding: "14px 24px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: "#7f1d1d",
        color: "white",
        fontWeight: "bold"
    }
};

export default Dashboard;