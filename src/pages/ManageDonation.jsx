
import { useState, useEffect } from "react";
import axios from "axios";

import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import AnimatedButton from "../components/AnimatedButton";
import PageHeader from "../components/PageHeader";

function ManageDonation() {

  const [pendingDonations, setPendingDonations] = useState([]);
  const [acceptedDonations, setAcceptedDonations] = useState([]);

  const token = localStorage.getItem("token");


  // FETCH PENDING DONATIONS
  const fetchPending = async () => {
    try {
      const response = await axios.get(
        "https://temple-backend-production-07ab.up.railway.app/donation/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPendingDonations(response.data);

    } catch (error) {
      console.log("Pending Fetch Error:", error);
    }
  };


  // FETCH ACCEPTED DONATIONS
  const fetchAccepted = async () => {
    try {
      const response = await axios.get(
        "https://temple-backend-production-07ab.up.railway.app/donation/accepted",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAcceptedDonations(response.data);

    } catch (error) {
      console.log("Accepted Fetch Error:", error);
    }
  };


  useEffect(() => {
    fetchPending();
    fetchAccepted();
  }, []);


  // ACCEPT DONATION WITH ADMIN NAME
  const handleAccept = async (id) => {

    const adminName = prompt("Enter Admin Name");

    if (!adminName || adminName.trim() === "") {
      alert("Admin name required");
      return;
    }

    try {

      await axios.put(
        `https://temple-backend-production-07ab.up.railway.app/donation/accept/${id}?verifiedBy=${adminName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Donation Accepted Successfully");

      fetchPending();
      fetchAccepted();

    } catch (error) {
      console.log("Accept Error:", error);
    }
  };


  // REJECT DONATION
  const handleReject = async (id) => {
    try {

      await axios.put(
        `https://temple-backend-production-07ab.up.railway.app/donation/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Donation Rejected");

      fetchPending();
      fetchAccepted();

    } catch (error) {
      console.log("Reject Error:", error);
    }
  };


  // DELETE DONATION
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this donation permanently?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://temple-backend-production-07ab.up.railway.app/donation/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Donation Deleted");

      fetchPending();
      fetchAccepted();

    } catch (error) {
      console.log("Delete Error:", error);
    }
  };


  return (
    <PageWrapper>
    <div style={styles.container}>

      {/* HEADER */}
      <PageHeader
        title="💰 Temple Donation Dashboard"
        subtitle="Manage Temple Donations"
      />


      {/* PENDING DONATIONS */}

      <h2 style={styles.sectionTitle}>
        Pending Donations
      </h2>

      <div style={styles.cardGrid}>

        {pendingDonations.length === 0 ? (
          <p>No Pending Donations</p>
        ) : (

          pendingDonations.map((donation) => (

            <div

              key={donation.id}
            >

              <Card>

                <div className="card-body">

                  <h4>{donation.donorName}</h4>

                  <p>💵 ₹{donation.amount}</p>

                  <p>📞 {donation.phoneNumber}</p>

                  <p>🎯 {donation.purpose}</p>

                  <p
                    style={{
                      color: "#9ca3af",
                      marginBottom: "14px"
                    }}
                  >
                    {donation.paymentStatus}
                  </p>

                  <div>
<div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  }}
>
                    <AnimatedButton
                      onClick={() => handleAccept(donation.id)}
                    >
                      Accept
                    </AnimatedButton>

                    <AnimatedButton
                      onClick={() => handleReject(donation.id)}
                    >
                      Reject
                    </AnimatedButton>

                    <AnimatedButton
                      variant="danger"
                      onClick={() => handleDelete(donation.id)}
                    >
                      Delete
                    </AnimatedButton>
                    </div>

                  </div>

                </div>

              </Card>

            </div>
          ))
        )}

      </div>



      {/* ACCEPTED DONATIONS */}

      <h2 style={styles.sectionTitle}>
        Accepted Donations
      </h2>

      <div style={styles.cardGrid}>

        {acceptedDonations.length === 0 ? (
          <p>No Accepted Donations</p>
        ) : (

          acceptedDonations.map((donation) => (

            <div
              key={donation.id}
            >

              <Card>

                <div className="card-body">

                  <h4>{donation.donorName}</h4>

                  <p>💵 ₹{donation.amount}</p>

                  <p>📞 {donation.phoneNumber}</p>

                  <p>🎯 {donation.purpose}</p>

                  <p>
                    ✅ Verified By: <b>{donation.verifiedBy}</b>
                  </p>

                  <p style={{ color: "#9ca3af" }}>
                    ACCEPTED
                  </p>

                </div>

              </Card>

            </div>
          ))
        )}

      </div>
</div>
    </PageWrapper>

  );
}
const styles = {
  container: {
    width: "100%"
  },

  sectionTitle: {
    marginBottom: "20px",
    marginTop: "30px"
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  }
};

export default ManageDonation;
