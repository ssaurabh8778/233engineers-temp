import React, { useEffect, useState } from "react";
import "./About2_GetInTouch.css";
import { Paper, Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

//GetInTouch section of AboutUs page
export default ({ data, imageLinks }) => {
  const [about2_getInTouch_card1, set_about2_getInTouch_card1] = useState("");
  const [about2_getInTouch_card2, set_about2_getInTouch_card2] = useState("");
  const [about2_getInTouch_card3, set_about2_getInTouch_card3] = useState("");

  const aboutUs = [
    {
      label: "about2_getInTouch_card1",
      value: about2_getInTouch_card1,
      method: set_about2_getInTouch_card1,
    },
    {
      label: "about2_getInTouch_card2",
      value: about2_getInTouch_card2,
      method: set_about2_getInTouch_card2,
    },
    {
      label: "about2_getInTouch_card3",
      value: about2_getInTouch_card3,
      method: set_about2_getInTouch_card3,
    },
  ];
  useEffect(() => {
    if (data) {
      aboutUs.map((item) => item.method(data[item.label]));
    }
  }, [data]);
  return (
    <Paper elevation="3">
      <h1
        style={{
          margin: "10px",

          width: "100%",
          textAlign: "center",
        }}
      >
        Get In Touch
      </h1>
      <div elevation="3" className="about2--container">
        <Card elevation="5" className="about2--card">
          <img src={imageLinks.aboutUs_getInTouch_image_1} alt="" />
          <div className="about2--textContainer">
            <h3>Consulting & Advisory</h3>
            <p style={{ color: "#808080" }}>{about2_getInTouch_card1}</p>
          </div>
          <div className="about2--buttonContainer">
            <Button
              href="mailto:admin@233engineer.com"
              variant="contained"
              color="primary"
            >
              Send a Request
            </Button>
          </div>
        </Card>
        <Card elevation="5" className="about2--card">
          <img src={imageLinks.aboutUs_getInTouch_image_2} alt="" />
          <div className="about2--textContainer">
            <h3>Engineering Project</h3>
            <p style={{ color: "#808080" }}>{about2_getInTouch_card2}</p>
          </div>
          <div className="about2--buttonContainer">
            <Button
              href="mailto:admin@233engineer.com"
              variant="contained"
              color="primary"
            >
              Submit A Project
            </Button>
          </div>
        </Card>
        <Card elevation="5" className="about2--card">
          <img src={imageLinks.aboutUs_getInTouch_image_3} alt="" />
          <div className="about2--textContainer">
            <h3>Mentoring</h3>
            <p style={{ color: "#808080" }}>{about2_getInTouch_card3}</p>
          </div>
          <div className="about2--buttonContainer">
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
              <Button m="3" variant="contained" color="primary">
                Seek A Mentor
              </Button>
            </Link>
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Become A Mentor
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Paper>
  );
};
