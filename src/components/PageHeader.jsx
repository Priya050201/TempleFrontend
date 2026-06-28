import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        textAlign: "center",
        marginBottom: "30px"
      }}
    >
      <h1>{title}</h1>

      {subtitle && (
        <p style={{ color: "#9ca3af" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}