import React, { useEffect, useState } from "react";
import { Card, Paper, Grid } from "@material-ui/core";
import firebase from "../../../firebase";
import "./Home3_whyChooseUs.css";
import { Link } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

const Home3 = ({ imageLinks, history }) => {
  const [home1_aboutUs_card1, set_home1_aboutUs_card1] = useState("");
  const [home1_aboutUs_card2, set_home1_aboutUs_card2] = useState("");
  const [home2_whyChooseUs_card1, set_home2_whyChooseUs_card1] = useState("");
  const [home2_whyChooseUs_card2, set_home2_whyChooseUs_card2] = useState("");
  const [home2_whyChooseUs_card3, set_home2_whyChooseUs_card3] = useState("");

  const home = [
    {
      label: "home1_aboutUs_card1",
      value: home1_aboutUs_card1,
      method: set_home1_aboutUs_card1,
    },
    {
      label: "home1_aboutUs_card2",
      value: home1_aboutUs_card2,
      method: set_home1_aboutUs_card2,
    },
    {
      label: "home2_whyChooseUs_card1",
      value: home2_whyChooseUs_card1,
      method: set_home2_whyChooseUs_card1,
    },
    {
      label: "home2_whyChooseUs_card2",
      value: home2_whyChooseUs_card2,
      method: set_home2_whyChooseUs_card2,
    },
    {
      label: "home2_whyChooseUs_card3",
      value: home2_whyChooseUs_card3,
      method: set_home2_whyChooseUs_card3,
    },
  ];
  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/" + "home")
      .get()
      .then((snapshot) => {
        home.map((item) =>
          item.method(snapshot.val() ? snapshot.val()[item.label] : "")
        );
      });
  }, []);
  return (
    <Grid item xs={12} container>
      <Paper
        elevation="3"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "cemter",
        }}
      >
        <Grid
          item
          item
          xs={12}
          style={{ display: "flex", alignItmes: "center", width: "100%" }}
        >
          <div className="home3--insideContainer1">
            <img src={imageLinks.home1_whyChooseUs_image} alt="" />
            <h1>Why Choose Us?</h1>
          </div>
        </Grid>
        <div className="home3--insideContainer2">
          <Card elevation="5" className="home3--insideContainer2--card">
            <img src="233_images/1.svg" alt="" />
            <h1>Diverse Expertise</h1>
            <p>{home2_whyChooseUs_card1}</p>
          </Card>
          <Card elevation="5" className="home3--insideContainer2--card">
            <img src="233_images/2.svg" alt="" />
            <h1>Purpose Over Profit</h1>
            <p>{home2_whyChooseUs_card2}</p>
          </Card>
          <Card elevation="5" className="home3--insideContainer2--card">
            <img src="233_images/3.svg" alt="" />
            <h1>The Joy of Philanthropy</h1>
            <p>{home2_whyChooseUs_card3}</p>
          </Card>
        </div>

        <button
          onClick={() => history.push("/servicepage/Philanthropy%20Projects")}
          className="home3--btn"
        >
          CheckOut Our Philanthropy Work
        </button>
      </Paper>
    </Grid>
  );
};

export default withRouter(Home3);
