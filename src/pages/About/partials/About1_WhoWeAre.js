import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import "./About1_WhoWeAre.css";
import { Link } from "react-router-dom";

//WhoWeAre section of the AboutUs page
const About1_WhoWeAre = ({ data, imageLinks }) => {
  const [about1_whoWeAre_card1, set_about1_whoWeAre_card1] = useState("");
  const [about1_whoWeAre_card2, set_about1_whoWeAre_card2] = useState("");
  const [about1_whoWeAre_card3, set_about1_whoWeAre_card3] = useState("");

  useEffect(() => {
    const aboutUs = [
      {
        label: "about1_whoWeAre_card1",
        value: about1_whoWeAre_card1,
        method: set_about1_whoWeAre_card1,
      },
      {
        label: "about1_whoWeAre_card2",
        value: about1_whoWeAre_card2,
        method: set_about1_whoWeAre_card2,
      },
      {
        label: "about1_whoWeAre_card3",
        value: about1_whoWeAre_card3,
        method: set_about1_whoWeAre_card3,
      },
    ];
    if (data) {
      aboutUs.map((item) => item.method(data[item.label]));
    }
  }, [
    data,
    about1_whoWeAre_card1,
    about1_whoWeAre_card2,
    about1_whoWeAre_card3,
  ]);

  return (
    <Paper elevation={3} className="container">
      <Paper
        component="div"
        style={{ backgroundColor: "lightblue" }}
        elevation={3}
        className="top-text-section"
      >
        <h1>{about1_whoWeAre_card1}</h1>
      </Paper>
      <div
        className="ci-12"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${imageLinks.aboutUs_top_image})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>{about1_whoWeAre_card2}</h2>
      </div>

      <Paper elevation={5} className="about1-inner-container">
        <h1 style={{ color: "#595959" }}>Small teams. Big hearts</h1>
        <p style={{ color: "#808080" }}>{about1_whoWeAre_card3}</p>
        <Link to="/sign-up" style={{ textDecoration: "none" }}>
          <Button size="large" variant="contained" color="secondary">
            Join The Team
          </Button>
        </Link>
      </Paper>
    </Paper>
  );
};
export default About1_WhoWeAre;
