import React from "react";
import "./Home2_aboutUs.css";
import { Card, Paper, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export default ({ imageLinks }) => {
  return (
    <Grid item xs={12} container>
      <Grid
        item
        item
        xs={12}
        sm={6}
        style={{ display: "flex", alignItmes: "center", width: "100%" }}
      >
        <Paper elevation="15" className="home2--insideContainer1">
          <h1>Engineers & Scientists Interested in Solving Ghana Challenges</h1>
          <p>
            An estimated 2.5 million new engineers and technicians are required
            in sub-Saharan Africa to achieve the Millenium Development Goals of
            improved access to clean water and sanitation
          </p>
          <p style={{ textAlign: "center" }}>-UNESCO</p>
          <img src={imageLinks.home1_readMoreAboutUs_image} />
        </Paper>
      </Grid>
      <Grid
        item
        item
        xs={12}
        sm={6}
        style={{ display: "flex", alignItmes: "center", width: "100%" }}
      >
        <Paper elevation="15" className="home2--insideContainer2">
          <div style={{ width: "60%", marginBottom: "30px" }}>
            <h1 className="home2--insideContainer2--text1">
              "Ti koro nko agyina"
            </h1>
            <h1 className="home2--insideContainer2--text2">-Akan Proverb</h1>
          </div>
          <p>
            This Akan proverb literally means one head does not hold council.
            This is similar to the English one that says "two heads are better
            than one"
          </p>
          <p>
            This is why we connect the knowledge, skills and experience of all
            our members to deliver successful outcomes.
          </p>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <button className="home2--button">Read more about us</button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
};
