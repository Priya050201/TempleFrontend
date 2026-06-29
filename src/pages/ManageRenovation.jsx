import { useState, useEffect } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import AnimatedButton from "../components/AnimatedButton";
import { useTheme } from "../context/ThemeContext";
import { dashboardStyles as styles } from "../styles/dashboardStyles";

function ManageRenovation() {
  const { theme } = useTheme();

  const [renovations, setRenovations] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "ONGOING"
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchRenovations = async () => {
    try {
      const response = await axios.get(
        "https://temple-backend-production-07ab.up.railway.app/renovation/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRenovations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRenovations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");

    try {

      await axios.post(
        "https://temple-backend-production-07ab.up.railway.app/renovation/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Renovation Added Successfully");

      resetForm();

      fetchRenovations();

    } catch (error) {

      console.log(error.response);

      if (error.response?.data) {
        setErrors(error.response.data);
      }
    }
  };

  const handleEdit = (renovation) => {
    setEditingId(renovation.id);

    setFormData({
      name: renovation.name,
      description: renovation.description,
      status: renovation.status
    });
  };

  const handleUpdate = async () => {
    await axios.put(
      `https://temple-backend-production-07ab.up.railway.app/renovation/update/${editingId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setMessage("Renovation Updated Successfully");
    resetForm();
    fetchRenovations();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://temple-backend-production-07ab.up.railway.app/renovation/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setMessage("Deleted Successfully");
    fetchRenovations();
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      status: "ONGOING"
    });
  };

  return (
    <PageWrapper>
      <div style={styles.container}>

        <h1 style={styles.pageTitle}>
          🏛 Temple Renovation Dashboard
        </h1>

        <p style={styles.pageSubtitle}>
          Manage Temple Renovation Works
        </p>

        <div style={styles.layout}>

          <Card>
            <h3>
              {editingId ? "✏ Edit Renovation" : "➕ Add Renovation"}
            </h3>

            {message && (
              <p style={styles.successMessage}>
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <input
                style={{
                  ...styles.input,
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
                type="text"
                name="name"
                placeholder="Renovation Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {errors.name}
                </p>
              )}

              <input
                style={{
                  ...styles.input,
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {errors.description}
                </p>
              )}

              <select
                style={{
                  ...styles.input,
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ONGOING">
                  ONGOING
                </option>

                <option value="COMPLETED">
                  COMPLETED
                </option>

                <option value="PLANNED">
                  PLANNED
                </option>
              </select>
              {errors.status && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {errors.status}
                </p>
              )}

              {editingId ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <AnimatedButton type="button" onClick={handleUpdate}>
                    Update
                  </AnimatedButton>

                  <AnimatedButton
                    type="button"
                    variant="danger"
                    onClick={resetForm}
                  >
                    Cancel
                  </AnimatedButton>
                </div>
              ) : (
                <AnimatedButton type="submit">
                  Add Renovation
                </AnimatedButton>
              )}
            </form>
          </Card>

          <div style={styles.listContainer}>
            {renovations.map((renovation) => (
              <Card key={renovation.id}>
                <div style={styles.itemCard}>
                  <div style={styles.itemLeft}>
                    <h3 style={styles.itemTitle}>
                      {renovation.name}
                    </h3>

                    <p>{renovation.description}</p>

                    <span
                      style={{
                        ...styles.statusBadge,
                        background:
                          renovation.status === "ONGOING"
                            ? "#2563eb"
                            : renovation.status === "COMPLETED"
                            ? "#16a34a"
                            : "#9333ea"
                      }}
                    >
                      {renovation.status}
                    </span>
                  </div>

                  <div style={styles.buttonGroup}>
                    <AnimatedButton onClick={() => handleEdit(renovation)}>
                      Edit
                    </AnimatedButton>

                    <AnimatedButton
                      variant="danger"
                      onClick={() => handleDelete(renovation.id)}
                    >
                      Delete
                    </AnimatedButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}

export default ManageRenovation;
