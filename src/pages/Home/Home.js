import React, { useState, useEffect } from "react";
import Home1_carousal from "./partials/Home1_carousal";
import Home2_aboutUs from "./partials/Home2_aboutUs";
import Home3_whyChooseUs from "./partials/Home3_whyChooseUs";
import Home4 from "./partials/Home4";
import Grid from "@material-ui/core/Grid";
import firebase from "../../firebase";
import { Typography } from "@material-ui/core";

export default () => {
  const [imageLinks, setImageLinks] = useState({});
  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/" + "images")
      .get()
      .then((snapshot) => {
        console.log("this", snapshot.val());
        setImageLinks(snapshot.val());
      });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Grid style={{ maxWidth: "1280px" }} container spacing={3}>
        <Grid item xs={12}>
          <Home1_carousal imageLinks={imageLinks} />
        </Grid>
        <Typography
          style={{ fontSize: "30px", margin: "10px 0px", fontWeight: "bold" }}
          className={"home__text"}
        >
          233 Engineers
        </Typography>
        <Grid item xs={12}>
          <Home2_aboutUs imageLinks={imageLinks} />
        </Grid>
        <Grid item xs={12}>
          <Home3_whyChooseUs imageLinks={imageLinks} />
        </Grid>
        <Grid item xs={12}>
          <Home4 />
        </Grid>
      </Grid>
    </div>
  );
};
