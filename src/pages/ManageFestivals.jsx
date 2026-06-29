import { useState, useEffect } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import AnimatedButton from "../components/AnimatedButton";
import { useTheme } from "../context/ThemeContext";
import { dashboardStyles as styles } from "../styles/dashboardStyles";

function ManageFestivals() {
  const { theme } = useTheme();

  const [festivals, setFestivals] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    festivalName: "",
    description: "",
    festivalDate: "",
    status: "ACTIVE"
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchFestivals = async () => {
    try {
      const response = await axios.get(
        "https://temple-backend-production-07ab.up.railway.app/festival/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setFestivals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFestivals();
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
        "https://temple-backend-production-07ab.up.railway.app/festival/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Festival Added Successfully");
      resetForm();
      fetchFestivals();

    } catch (error) {

      console.log("Festival Error:", error.response);

      if (error.response?.data) {
        setErrors(error.response.data);
      }
    }
  };

  const handleEdit = (festival) => {
    setEditingId(festival.id);

    setFormData({
      festivalName: festival.festivalName,
      description: festival.description,
      festivalDate: festival.festivalDate,
      status: festival.status
    });
  };

  const handleUpdate = async () => {
    await axios.put(
      `https://temple-backend-production-07ab.up.railway.app/festival/update/${editingId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setMessage("Festival Updated Successfully");
    resetForm();
    fetchFestivals();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://temple-backend-production-07ab.up.railway.app/festival/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setMessage("Festival Deleted Successfully");
    fetchFestivals();
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      festivalName: "",
      description: "",
      festivalDate: "",
      status: "ACTIVE"
    });
  };

  return (
    <PageWrapper>
      <div style={styles.container}>

        <h1 style={styles.pageTitle}>
          🏛 Temple Admin Dashboard
        </h1>

        <p style={styles.pageSubtitle}>
          Manage Temple Festivals
        </p>

        <div style={styles.layout}>

          <Card>
            <h3>
              {editingId ? "✏ Edit Festival" : "➕ Add Festival"}
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
                name="festivalName"
                placeholder="Festival Name"
                value={formData.festivalName}
                onChange={handleChange}
              />
              {errors.festivalName && (
                <p style={{ color: "red" }}>
                  {errors.festivalName}
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
                <p style={{ color: "red" }}>
                  {errors.description}
                </p>
              )}

              <input
                style={{
                  ...styles.input,
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
                type="date"
                name="festivalDate"
                value={formData.festivalDate}
                onChange={handleChange}
              />
              {errors.festivalDate && (
                <p style={{ color: "red" }}>
                  {errors.festivalDate}
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
                  Add Festival
                </AnimatedButton>
              )}
            </form>
          </Card>

          <div style={styles.listContainer}>
            {festivals.map((festival) => (
              <Card key={festival.id}>
                <div style={styles.itemCard}>
                  <div style={styles.itemLeft}>
                    <h3 style={styles.itemTitle}>
                      {festival.festivalName}
                    </h3>

                    <p>📅 {festival.festivalDate}</p>
                    <p>{festival.description}</p>

                    <span
                      style={{
                        ...styles.statusBadge,
                        background:
                          festival.status === "ACTIVE"
                            ? "#2563eb"
                            : "#16a34a"
                      }}
                    >
                      {festival.status}
                    </span>
                  </div>

                  <div style={styles.buttonGroup}>
                    <AnimatedButton onClick={() => handleEdit(festival)}>
                      Edit
                    </AnimatedButton>

                    <AnimatedButton
                      variant="danger"
                      onClick={() => handleDelete(festival.id)}
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

export default ManageFestivals;
