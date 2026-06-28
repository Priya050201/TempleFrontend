import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Card({ children, style }) {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -3 }}
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "18px",
        padding: "24px",
        boxShadow:
          theme.colors.background === "#111827"
            ? "0 8px 30px rgba(0,0,0,0.35)"
            : "0 8px 20px rgba(0,0,0,0.08)",
        transition: "0.3s ease",
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}