import React, { useEffect, useState } from "react";
import About1WhoWeAre from "./partials/About1_WhoWeAre";
import About2GetInTouch from "./partials/About2_GetInTouch";
import About3VisionAndMission from "./partials/About3_VisionAndMission";
import About4Leadership from "./partials/About4_Leadership";
import Grid from "@material-ui/core/Grid";
import firebase from "../../firebase";

const About = () => {
  const [data, setData] = useState();
  const [imageLinks, setImageLinks] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/images")
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
          <About1WhoWeAre data={data} imageLinks={imageLinks} />
        </Grid>
        <About2GetInTouch data={data} imageLinks={imageLinks} />
        <About3VisionAndMission data={data} imageLinks={imageLinks} />
        <About4Leadership />
      </Grid>
    </div>
  );
};
export default About;