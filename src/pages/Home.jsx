//import { useEffect, useState } from "react";
//im//port api from "../services/api";
//import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import AnimatedPage from "../components/AnimatedPage";
import { useTheme } from "../context/ThemeContext";
//import { darkTheme, lightTheme } from "../theme/theme";


function Home() {

    const [homeData, setHomeData] = useState({});
    const { theme } = useTheme();


    useEffect(() => {

        api.get("/api/home")

            .then((response) => {

                setHomeData(response.data);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (
      <AnimatedPage>
        <PageWrapper>

        <div
          style={{
            background: theme.colors.background,
            minHeight: "100vh"
          }}
        >

          <Navbar />

          <div style={styles.container}>

            <Card
              style={{
                ...styles.card,
                background: theme.colors.surface
              }}
            >

              <h1
                style={{
                  ...styles.title,
                  color: theme.colors.text
                }}
              >
                {homeData.templeName}
              </h1>

              <h3
                style={{
                  ...styles.location,
                  color: theme.colors.mutedText
                }}
              >
                📍 {homeData.location}
              </h3>

              <div style={styles.divider}></div>

              <p
                style={{
                  ...styles.history,
                  color: theme.colors.text
                }}
              >
                {homeData.history}
              </p>

            </Card>

          </div>
          </div>

        </PageWrapper>
      </AnimatedPage>
    );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    padding: "20px"
  },


  card: {
    width: "100%",
    maxWidth: "850px",
    textAlign: "center",
    padding: "40px"
  },

  title: {
    fontSize: "clamp(28px, 5vw, 42px)",
    marginBottom: "20px"
  },

  location: {
    color: "#9ca3af",
    marginBottom: "20px",
    fontWeight: "400"
  },

  divider: {
    width: "80px",
    height: "3px",
    background: "#334155",
    margin: "20px auto"
  },

  history: {
    lineHeight: "1.8",
    fontSize: "17px",
    color: "#d1d5db"
  }
};

export default Home;