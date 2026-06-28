import { useTheme } from "../context/ThemeContext";

export default function PageWrapper({ children }) {

  const { theme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.colors.background,
        color: theme.colors.text,
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        {children}
      </div>
    </div>
  );
}