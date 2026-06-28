//import { useState } from "react";
 import Navbar from "../components/Navbar";
 import api from "../services/api";
 import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
 import PageWrapper from "../components/PageWrapper";
 import Card from "../components/Card";
 import AnimatedButton from "../components/AnimatedButton";
 import AnimatedPage from "../components/AnimatedPage";
 import { useTheme } from "../context/ThemeContext";

function AdminLogin() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [countdown, setCountdown] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    const [loginData, setLoginData] = useState({

        username: "",

        password: ""
    });

    const [message, setMessage] = useState("");
    useEffect(() => {

      let timer;

      if (countdown > 0) {

        timer = setInterval(() => {

          setCountdown((prev) => prev - 1);

        }, 1000);

      }

      if (countdown === 0 && isBlocked) {

        setIsBlocked(false);

        setMessage("You can try again now");

      }

      return () => clearInterval(timer);

    }, [countdown, isBlocked]);

    const handleChange = (event) => {

        setLoginData({

            ...loginData,

            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();
           if (isBlocked) {
              return;
            }

        api.post("/auth/login", loginData)

            .then((response) => {

              if (response.data === "Invalid Credentials") {
                setMessage("Invalid Credentials");
                return;
              }

             if (response.data === "Too many attempts. Wait 10 seconds") {

               setIsBlocked(true);

               setCountdown(10);

               setMessage("Too many attempts. Wait 10 seconds");

               return;
             }

              // JWT token case
              localStorage.setItem("token", response.data);
              setMessage("Login Successful");
              navigate("/dashboard");
            })

            .catch((error) => {

                setMessage(
                    "Invalid Credentials"
                );

                console.log(error);
            });
    };

    return (
      <AnimatedPage>
        <PageWrapper>

          <Navbar />

          <div style={styles.outerContainer}>

            <Card style={styles.card}>

              <h1 style={styles.title}>
                Admin Login
              </h1>

              <p style={styles.subtitle}>
                Secure access to temple management dashboard
              </p>

              <form onSubmit={handleSubmit}>

                <input
                  style={{
                    background: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`
                  }}
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                />

                <input
                  style={{
                    background: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`
                  }}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />

                <div style={{ marginTop: "15px" }}>
                  <AnimatedButton
                    type="submit"
                    disabled={isBlocked}
                    style={{ width: "100%" }}
                  >
                    Login
                  </AnimatedButton>
                </div>

              </form>

              {isBlocked ? (

                <p
                  style={{
                    marginTop: "20px",
                    color: "red"
                  }}
                >
                  Too many attempts. Try again in {countdown}s
                </p>

              ) : message && (

                <p
                  style={{
                    marginTop: "20px",
                    color:
                      message === "Login Successful"
                        ? "#22c55e"
                        : "#ef4444"
                  }}
                >
                  {message}
                </p>

              )}

            </Card>

          </div>

        </PageWrapper>
      </AnimatedPage>
    );
}

const styles = {
   outerContainer: {
     width: "100%",
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     minHeight: "80vh",
     padding: "20px"
   },

   card: {
     width: "100%",
     maxWidth: "420px",
     padding: "40px"
   },

   title: {
     textAlign: "center",
     marginBottom: "15px",
     fontSize: "32px"
   },

   subtitle: {
     textAlign: "center",
     marginBottom: "30px",
     color: "#9ca3af",
     fontSize: "14px"
   }
 };

export default AdminLogin;