import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core/";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBrTfYdVKciF6pix3XDEoCewaSWcpMc7iA",
    authDomain: "engineers-bc6c8.firebaseapp.com",
    projectId: "engineers-bc6c8",
    storageBucket: "engineers-bc6c8.appspot.com",
    messagingSenderId: "1064525980406",
    appId: "1:1064525980406:web:7d84484c0deececacf42d7",
    measurementId: "G-C6QJ3YVWKK",
  });
} else {
  firebase.app();
}

const EWC_HOME_AND_ABOUT =() => {
  const [home1_aboutUs_card1, set_home1_aboutUs_card1] = useState("");
  const [home1_aboutUs_card2, set_home1_aboutUs_card2] = useState("");
  const [home2_whyChooseUs_card1, set_home2_whyChooseUs_card1] = useState("");
  const [home2_whyChooseUs_card2, set_home2_whyChooseUs_card2] = useState("");
  const [home2_whyChooseUs_card3, set_home2_whyChooseUs_card3] = useState("");
  const [about1_whoWeAre_card1, set_about1_whoWeAre_card1] = useState("");
  const [about1_whoWeAre_card2, set_about1_whoWeAre_card2] = useState("");
  const [about1_whoWeAre_card3, set_about1_whoWeAre_card3] = useState("");
  const [about2_getInTouch_card1, set_about2_getInTouch_card1] = useState("");
  const [about2_getInTouch_card2, set_about2_getInTouch_card2] = useState("");
  const [about2_getInTouch_card3, set_about2_getInTouch_card3] = useState("");
  const [about3_vision_heading, set_about3_vision_heading] = useState("");
  const [about3_vision_content, set_about3_vision_content] = useState("");
  const [about3_mission_heading, set_about3_mission_heading] = useState("");
  const [about3_mission_content, set_about3_mission_content] = useState("");

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

  const updateHomeData = () => {
    firebase
      .database()
      .ref("websiteContent/home")
      .set({
        home1_aboutUs_card1: home1_aboutUs_card1,
        home1_aboutUs_card2: home1_aboutUs_card2,
        home2_whyChooseUs_card1: home2_whyChooseUs_card1,
        home2_whyChooseUs_card2: home2_whyChooseUs_card2,
        home2_whyChooseUs_card3: home2_whyChooseUs_card3,
      });
  };

  const updateAboutUsData = () => {
    firebase
      .database()
      .ref("websiteContent/aboutUs")
      .set({
        about1_whoWeAre_card1: about1_whoWeAre_card1,
        about1_whoWeAre_card2: about1_whoWeAre_card2,
        about1_whoWeAre_card3: about1_whoWeAre_card3,
        about2_getInTouch_card1: about2_getInTouch_card1,
        about2_getInTouch_card2: about2_getInTouch_card2,
        about2_getInTouch_card3: about2_getInTouch_card3,
        about3_vision_heading: about3_vision_heading,
        about3_vision_content: about3_vision_content,
        about3_mission_heading: about3_mission_heading,
        about3_mission_content: about3_mission_content,
      });
  };

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/home")
      .get()
      .then((snapshot) => {
        home.map((item) =>
          item.method(snapshot.val() ? snapshot.val()[item.label] : "")
        );
      });
    firebase
      .database()
      .ref("websiteContent/aboutUs")
      .get()
      .then((snapshot) => {
        aboutUs.map((item) =>
          item.method(snapshot.val() ? snapshot.val()[item.label] : "")
        );
      });
  }, []);

  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
        marginTop: "15px",
        width: "100%",
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Home</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            {home.map((item) => (
              <TextField
                margin="dense"
                id="outlined-basic"
                style={{ backgroundColor: "lightyellow" }}
                multiline
                rows={3}
                label={item.label}
                variant="outlined"
                value={item.value}
                onChange={(e) => item.method(e.target.value)}
                className="ewc1--textInput"
              />
            ))}

            <Button
              onClick={() => updateHomeData()}
              variant="contained"
              color="primary"
            >
              Update the content of the HomePage
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>About</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            {aboutUs.map((item) => (
              <TextField
                margin="dense"
                id="outlined-basic"
                style={{ backgroundColor: "lightyellow" }}
                multiline
                rows={3}
                label={item.label}
                variant="outlined"
                value={item.value}
                onChange={(e) => item.method(e.target.value)}
                className="ewc1--textInput"
              />
            ))}

            <Button
              onClick={() => updateAboutUsData()}
              variant="contained"
              color="primary"
            >
              Update the content of the About Us Page
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default EWC_HOME_AND_ABOUT;