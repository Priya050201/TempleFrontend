import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import AnimatedPage from "../components/AnimatedPage";
import { useTheme } from "../context/ThemeContext";

function Renovation() {

    const [works, setWorks] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {

        api.get("/renovation/public")

            .then((response) => {

                console.log(response.data);

                setWorks(response.data);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (
      <AnimatedPage>
        <PageWrapper>

          <Navbar />

          <div style={styles.container}>

            <h1 style={styles.title}>
              Temple Renovation Works
            </h1>

           <p
             style={{
               ...styles.subtitle,
               color: theme.colors.mutedText
             }}
           >
              Ongoing restoration and development projects
            </p>

            <div style={styles.grid}>

              {works.map((work) => (

                <Card
                  key={work.id}
                  style={styles.card}
                >

                  <h2 style={styles.cardTitle}>
                    {work.name}
                  </h2>

                  <div style={styles.divider}></div>

                  <p
                    style={{
                      ...styles.description,
                      color: theme.colors.text
                    }}
                  >
                    {work.description}
                  </p>

                  <p
                    style={{
                      ...styles.status,
                      color: theme.colors.mutedText
                    }}
                  >
                    Status: {work.status}
                  </p>

                </Card>

              ))}

            </div>

          </div>

        </PageWrapper>
      </AnimatedPage>
    );
}

const styles = {
  container: {
    width: "100%",
    textAlign: "center",
    padding: "30px"
  },

  title: {
    fontSize: "clamp(30px, 5vw, 42px)",
    marginBottom: "10px"
  },

  subtitle: {
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px"
  },

  card: {
    textAlign: "left",
    padding: "25px"
  },

  cardTitle: {
    marginBottom: "20px",
    fontSize: "22px"
  },

  divider: {
    width: "60px",
    height: "3px",
    background: "#334155",
    marginBottom: "20px"
  },

  description: {
    lineHeight: "1.7",
    marginBottom: "20px"
  },

  status: {

    fontWeight: "500"
  }
};

export default Renovation;