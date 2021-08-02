import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
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

const EWC_WEBSITE_IMAGES = () => {
  const [home1_carousel_image_1, set_home1_carousel_image_1] = useState("");
  const [home1_carousel_image_2, set_home1_carousel_image_2] = useState("");
  const [home1_carousel_image_3, set_home1_carousel_image_3] = useState("");
  const [home1_readMoreAboutUs_image, set_home1_readMoreAboutUs_image] =
    useState("");

  const [home1_whyChooseUs_image, set_home1_whyChooseUs_image] = useState("");
  const [aboutUs_top_image, set_aboutUs_top_image] = useState("");
  const [aboutUs_getInTouch_image_1, set_aboutUs_getInTouch_image_1] =
    useState("");
  const [aboutUs_getInTouch_image_2, set_aboutUs_getInTouch_image_2] =
    useState("");
  const [aboutUs_getInTouch_image_3, set_aboutUs_getInTouch_image_3] =
    useState("");
  const [aboutUs_vision_image, set_aboutUs_vision_image] = useState("");
  const [aboutUs_mission_image, set_aboutUs_mission_image] = useState("");
  const [signUp_cover_image, set_signUp_cover_image] = useState("");

  const home = [
    {
      label: "HomePage Carousel Image 2",
      id: "home1_carousel_image_1",
      value: home1_carousel_image_1,
      method: set_home1_carousel_image_1,
    },
    {
      label: "HomePage Carousel Image 3",
      id: "home1_carousel_image_2",
      value: home1_carousel_image_2,
      method: set_home1_carousel_image_2,
    },
    {
      label: "HomePage Carousel Image 3",
      id: "home1_carousel_image_3",
      value: home1_carousel_image_3,
      method: set_home1_carousel_image_3,
    },
    {
      label: "HomePage ReadMoreAboutUs Image",
      id: "home1_readMoreAboutUs_image",
      value: home1_readMoreAboutUs_image,
      method: set_home1_readMoreAboutUs_image,
    },
    {
      label: "HomePage WhyChooseUs Image",
      id: "home1_whyChooseUs_image",
      value: home1_whyChooseUs_image,
      method: set_home1_whyChooseUs_image,
    },
    {
      label: "AboutUsPage Top Image",
      id: "aboutUs_top_image",
      value: aboutUs_top_image,
      method: set_aboutUs_top_image,
    },
    {
      label: "AboutUsPage GetInTouch Image 1",
      id: "aboutUs_getInTouch_image_1",
      value: aboutUs_getInTouch_image_1,
      method: set_aboutUs_getInTouch_image_1,
    },
    {
      label: "AboutUsPage GetInTouch Image 2",
      id: "aboutUs_getInTouch_image_2",
      value: aboutUs_getInTouch_image_2,
      method: set_aboutUs_getInTouch_image_2,
    },
    {
      label: "AboutUsPage GetInTouch Image 3",
      id: "aboutUs_getInTouch_image_3",
      value: aboutUs_getInTouch_image_3,
      method: set_aboutUs_getInTouch_image_3,
    },
    {
      label: "AboutUsPage Vision Image",
      id: "aboutUs_vision_image",
      value: aboutUs_vision_image,
      method: set_aboutUs_vision_image,
    },
    {
      label: "AboutUsPage Mission Image",
      id: "aboutUs_mission_image",
      value: aboutUs_mission_image,
      method: set_aboutUs_mission_image,
    },
    {
      label: "SignUp Page Cover Image",
      id: "signUp_cover_image",
      value: signUp_cover_image,
      method: set_signUp_cover_image,
    },
  ];

  const updateHomeData = () => {
    for (let i = 1; i < home.length; i++) {
      if (home[i].value === "") {
        alert("Please upload all the images");
        return;
      }
    }
    firebase
      .database()
      .ref("websiteContent/images")
      .set({
        home1_carousel_image_1,
        home1_carousel_image_2,
        home1_carousel_image_3,
        home1_readMoreAboutUs_image,
        home1_whyChooseUs_image,
        aboutUs_top_image,
        aboutUs_getInTouch_image_1,
        aboutUs_getInTouch_image_2,
        aboutUs_getInTouch_image_3,
        aboutUs_vision_image,
        aboutUs_mission_image,
        signUp_cover_image,
      });
  };

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/images")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        home.map((item) =>
          item.method(snapshot.val()[item.id] ? snapshot.val()[item.id] : "")
        );
        console.log("this is", home1_carousel_image_1);
      });
  }, []);

  const classes = useStyles();
  const uploadImage = (file, id, method) => {
    firebase
      .storage()
      .ref("websiteImages/" + id)
      .put(file)
      .then((snapshot) => {
        alert("Image updated");
        firebase
          .storage()
          .ref("websiteImages/" + id)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            method(url);
          })
          .catch((error) => {
            alert("error");
          });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Website Images</Typography>
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
              <UpdateImage item={item} uploadImage={uploadImage} />
            ))}

            <Button
              onClick={() => updateHomeData()}
              variant="contained"
              color="primary"
            >
              Update Website Images
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const UpdateImage = ({ item, uploadImage }) => {
  console.log("imgurl", item.value);
  return (
    <div
      style={{
        display: "flex",
        margin: "15px",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",
        border: "1px solid gray",
      }}
    >
      <h4 style={{ width: "30%" }}>{item.label}</h4>
      <img
        src={item.value}
        alt=""
        style={{
          width: "150px",
          height: "150px",
          margin: "5px",
          objectFit: "cover",
        }}
      />
      <input
        style={{
          justifySelf: "center",
        }}
        type="file"
        onChange={(e) => uploadImage(e.target.files[0], item.id, item.method)}
      />
    </div>
  );
};
export default EWC_WEBSITE_IMAGES;