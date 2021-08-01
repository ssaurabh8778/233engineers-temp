import React, { useEffect, useState } from "react";
import "./About3_VisionAndMission.css";
import { Card, Paper, Grid, Typography } from "@material-ui/core";

//VisionAndMission section of AboutUs page
export default ({ data, imageLinks }) => {
  const [about3_vision_heading, set_about3_vision_heading] = useState("");
  const [about3_vision_content, set_about3_vision_content] = useState("");
  const [about3_mission_heading, set_about3_mission_heading] = useState("");
  const [about3_mission_content, set_about3_mission_content] = useState("");

  const aboutUs = [
    {
      label: "about3_vision_heading",
      value: about3_vision_heading,
      method: set_about3_vision_heading,
    },
    {
      label: "about3_vision_content",
      value: about3_vision_content,
      method: set_about3_vision_content,
    },
    {
      label: "about3_mission_heading",
      value: about3_mission_heading,
      method: set_about3_mission_heading,
    },
    {
      label: "about3_mission_content",
      value: about3_mission_content,
      method: set_about3_mission_content,
    },
  ];
  useEffect(() => {
    if (data) {
      aboutUs.map((item) => item.method(data[item.label]));
    }
  }, [data, aboutUs]);
  return (
    <Paper>
      <h1 style={{ width: "100%", margin: "10px" }}>Vision & Mission</h1>
      <Grid item xs={12} container>
        <Grid
          item
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItmes: "center", width: "100%" }}
        >
          <Paper elevation="3" className="about3--insideContainer1">
            <div className="about3--insideContainer1--div1">
              <img
                className="about3-visionImage"
                src={imageLinks.aboutUs_vision_image}
              />
              <Card
                style={{ backgroundColor: "lightyellow" }}
                className="about3--insideContainer1--visionCard"
              >
                <Typography color="secondary" variant="h5">
                  Our Mission
                </Typography>
                <Typography className="about3-visionText3">
                  {about3_vision_heading}
                </Typography>
              </Card>
            </div>
            <Typography>{about3_vision_content}</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItmes: "center", width: "100%" }}
        >
          <Paper elevation="3" className="about3--insideContainer1">
            <div className="about3--insideContainer1--div1">
              <Card
                style={{ backgroundColor: "lightyellow" }}
                className="about3--insideContainer1--visionCard"
              >
                <Typography color="secondary" variant="h5">
                  Our Vision
                </Typography>
                <Typography className="about3-visionText3">
                  {about3_mission_heading}
                </Typography>
              </Card>
              <img
                className="about3-visionImage"
                src={imageLinks.aboutUs_mission_image}
              />
            </div>
            <Typography>{about3_mission_content}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
