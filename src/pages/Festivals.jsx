import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import AnimatedPage from "../components/AnimatedPage";

function Festivals() {

    const [festivals, setFestivals] = useState([]);

    useEffect(() => {

        api.get("/festival/active")

            .then((response) => {

                console.log(response.data);

                setFestivals(response.data);

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
              Temple Festivals
            </h1>

            <p style={styles.subtitle}>
              Upcoming sacred celebrations and temple events
            </p>

            <div style={styles.grid}>

              {festivals.map((festival) => (

                <Card
                  key={festival.id}
                  style={styles.card}
                >

                  <h2 style={styles.cardTitle}>
                    {festival.festivalName}
                  </h2>

                  <p style={styles.date}>
                    📅 {festival.festivalDate}
                  </p>

                  <div style={styles.divider}></div>

                  <p style={styles.description}>
                    {festival.description}
                  </p>

                  <p style={styles.status}>
                    Status: {festival.status}
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

        padding: "30px",

        textAlign: "center"
    },

    card: {

        border: "1px solid black",

        margin: "20px",

        padding: "20px"
    }
};

export default Festivals;