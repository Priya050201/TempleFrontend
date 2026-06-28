import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import AnimatedButton from "../components/AnimatedButton";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import InputField from "../components/InputField";

function Donation() {

    const { theme } = useTheme();
  const [formData, setFormData] = useState({
    donorName: "",
    amount: "",
    phoneNumber: "",
    purpose: ""
  });

  const [contact, setContact] = useState({});
  const [message, setMessage] = useState("");
 const [errors, setErrors] = useState({});
 useEffect(() => {
   console.log("ERRORS CHANGED:", errors);
 }, [errors]);

 console.log("RENDER ERRORS STATE:", errors);
  useEffect(() => {
    api.get("/donation/contact")
      .then((response) => {
        setContact(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    setErrors({});

    api.post("/donation/request", formData)

      .then((response) => {

         setErrors({});          // add this

         setMessage("Donation request submitted successfully");

         console.log(response.data);
       })

      .catch((error) => {

        console.log("FULL ERROR:", error);

        console.log("ERROR RESPONSE:", error.response);

        console.log("ERROR DATA:", error.response?.data);

        if (error.response?.data) {

          console.log("SETTING ERRORS:", error.response.data);

          setErrors(error.response.data);
        }
      })
  };

  return (
     <AnimatedPage>
         <PageWrapper>
             <Navbar />



          <div style={styles.container}>

            <h1
              style={{
                ...styles.title,
                color: theme.colors.text
              }}
            >
              Donate to Temple
            </h1>

           <p
            style={{
              ...styles.subtitle,
              color: theme.colors.mutedText
            }}
           >
              Support temple activities and community service
            </p>

            <div style={styles.grid}>

              {/* Donation Form */}

              <Card>

                <h2
                  style={{
                    ...styles.cardTitle,
                    color: theme.colors.text
                  }}
                >
                  Make a Donation
                </h2>

                <form onSubmit={handleSubmit}>




                  <InputField
                    type="text"
                    name="donorName"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                  {errors.donorName && (

                    <p style={{ color: "red" }}>

                        {errors.donorName}

                    </p>
                  )}

                  <InputField
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                  />
                  {errors.amount && (
                    <p style={{ color: "red" }}>
                        {errors.amount}
                    </p>
                  )}

                  <InputField
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <p style={{ color: "red" }}>
                        {errors.phoneNumber}
                    </p>
                  )}

                  <InputField
                    type="text"
                    name="purpose"
                    placeholder="Purpose"
                    onChange={handleChange}
                  />
                  {errors.purpose && (
                    <p style={{ color: "red" }}>
                        {errors.purpose}
                    </p>
                  )}

                  <div style={{ marginTop: "15px" }}>
                    <AnimatedButton type="submit">
                      Submit Donation
                    </AnimatedButton>
                  </div>

                </form>

                {message && (
                  <p style={styles.success}>
                    {message}
                  </p>
                )}

              </Card>


              {/* Payment Details */}

              <Card>

                <h2 style={styles.cardTitle}>
                  Payment Details
                </h2>

                <div
                 style={{
                   ...styles.paymentBox,
                   color: theme.colors.text
                 }}
                >

                  <p>
                    <strong>Admin:</strong> {contact.adminName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {contact.phone}
                  </p>

                  <p>
                    <strong>UPI ID:</strong> {contact.upiId}
                  </p>

                </div>

              </Card>

            </div>

          </div>

        </PageWrapper>
      </AnimatedPage>

  );
}

const styles = {

  container: {
    width: "100%"
  },

  title: {
    textAlign: "center",
    fontSize: "38px",
    color: "white",
    marginBottom: "10px"
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px"
  },

  cardTitle: {
    marginBottom: "20px",
    color: "white"
  },

  paymentBox: {
    lineHeight: "2"
  },

  success: {
    marginTop: "20px",
    color: "#22c55e",
    fontWeight: "600"
  }
};

export default Donation;