import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
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

export default () => {
  const [energy_and_resources, set_energy_and_resources] = useState("");
  const [biomedical_engineering, set_biomedical_engineering] = useState("");
  const [project_management, set_project_management] = useState("");
  const [transportation, set_transportation] = useState("");
  const [process_and_manufacturing, set_process_and_manufacturing] =
    useState("");
  const [digital_and_it, set_digital_and_it] = useState("");
  const [geosciences, set_geosciences] = useState("");
  const [property_and_buildings, set_property_and_buildings] = useState("");
  const [water_and_environment, set_water_and_environment] = useState("");
  const [philanthropy_projects, set_philanthropy_projects] = useState("");
  const [mentoring_program, set_mentoring_program] = useState("");

  const sectors = [
    {
      label: "Energy & Resources",
      id: "energy_and_resources",
      value: energy_and_resources,
      method: set_energy_and_resources,
    },
    {
      label: "Biomedical Engineering",
      id: "biomedical_engineering",
      value: biomedical_engineering,
      method: set_biomedical_engineering,
    },
    {
      label: "Project Management",
      id: "project_management",
      value: project_management,
      method: set_project_management,
    },
    {
      label: "Transportation",
      id: "transportation",
      value: transportation,
      method: set_transportation,
    },
    {
      label: "Process & Manufacturing",
      id: "process_and_manufacturing",
      value: process_and_manufacturing,
      method: set_process_and_manufacturing,
    },
    {
      label: "Digital & IT",
      id: "digital_and_it",
      value: digital_and_it,
      method: set_digital_and_it,
    },
    {
      label: "Geosciences",
      id: "geosciences",
      value: geosciences,
      method: set_geosciences,
    },
    {
      label: "Property & Buildings",
      id: "property_and_buildings",
      value: property_and_buildings,
      method: set_property_and_buildings,
    },
    {
      label: "Water & Environment",
      id: "water_and_environment",
      value: water_and_environment,
      method: set_water_and_environment,
    },
    {
      label: "Philanthropy Projects",
      id: "philanthropy_projects",
      value: philanthropy_projects,
      method: set_philanthropy_projects,
    },
    {
      label: "Mentoring Program",
      id: "mentoring_program",
      value: mentoring_program,
      method: set_mentoring_program,
    },
  ];

  const updateHomeData = () => {
    firebase.database().ref("websiteContent/sectorsLinkImages").set({
      energy_and_resources,
      biomedical_engineering,
      project_management,
      transportation,
      process_and_manufacturing,
      digital_and_it,
      geosciences,
      property_and_buildings,
      philanthropy_projects,
      mentoring_program,
    });
  };

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/sectorsLinkImages")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        sectors.map((item) =>
          item.method(snapshot.val()[item.id] ? snapshot.val()[item.id] : "")
        );
      });
  }, []);

  const classes = useStyles();
  const uploadImage = (file, id, method) => {
    firebase
      .storage()
      .ref("sectorsLinkImages/" + id)
      .put(file)
      .then((snapshot) => {
        alert("Image updated");
        firebase
          .storage()
          .ref("sectorsLinkImages/" + id)
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
          <Typography className={classes.heading}>
            Sectors Link Images
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            {sectors.map((item) => (
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
