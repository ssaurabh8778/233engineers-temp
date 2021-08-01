import React, { useEffect, useState } from "react";
import About1_WhoWeAre from "./partials/About1_WhoWeAre";
import About2_GetInTouch from "./partials/About2_GetInTouch";
import About3_VisionAndMission from "./partials/About3_VisionAndMission";
import About4_Leadership from "./partials/About4_Leadership";
import Grid from "@material-ui/core/Grid";
import firebase from "../../firebase";

export default () => {
  const [data, setData] = useState();
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

  useEffect(() => {
    //fetching content of AboutUs page from database
    firebase
      .database()
      .ref("websiteContent/aboutUs")
      .get()
      .then((snapshot) => {
        setData(snapshot.val());
      });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid style={{ maxWidth: "1280px" }} container spacing={3}>
        <Grid item xs={12}>
          <About1_WhoWeAre data={data} imageLinks={imageLinks} />
        </Grid>
        <About2_GetInTouch data={data} imageLinks={imageLinks} />
        <About3_VisionAndMission data={data} imageLinks={imageLinks} />
        <About4_Leadership />
      </Grid>
    </div>
  );
};
