import { useTheme } from "../context/ThemeContext";

function InputField(props) {
  const { theme } = useTheme();

  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "15px",
        borderRadius: "10px",
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
        color: theme.colors.text,
        outline: "none"
      }}
    />
  );
}

export default InputField;