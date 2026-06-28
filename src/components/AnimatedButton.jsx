import { motion } from "framer-motion";
//import { theme } from "../theme/theme";
import { useTheme } from "../context/ThemeContext";

export default function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  style,
  type = "button",
  disabled
}) {
    const { theme } = useTheme();
  const baseStyle = {
    padding: "14px 20px",
    borderRadius: theme.radius.md,
    fontWeight: "600",
    fontSize: "15px",
    color: "white",
    border: "none",
    cursor: "pointer",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    backgroundColor:
      variant === "danger"
        ? theme.colors.danger
        : theme.colors.primary,
    boxShadow: theme.shadow.sm
  };

  return (
    <motion.button
      disabled={disabled}
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...style }}
      whileHover={{
          scale: 1.05,
          color: "#cbd5e1",
          boxShadow: theme.shadow.md
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}