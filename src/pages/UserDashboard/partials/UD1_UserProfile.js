import React, { useEffect, useState } from "react";
import "./UD1_UserProfile.css";
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Box,
  Button,
  Avatar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import firebase from "../../../firebase";
import { useAuth } from "../../../AuthContext";
import SnackBar from "../../../components/SnackBar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { sectorList } from "../../../sectorList";

export default (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [degree, setDegree] = useState("");
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [sector, setSector] = useState("Select Sector");
  const [linkedInProfile, setLinkedInProfile] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [profilePicLink, setProfilePicLink] = useState("");
  const [file, setFile] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("this is working");
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid)
        .get()
        .then((snapshot) => {
          console.log(snapshot.val());
          for (let i in snapshot.val()) {
            if (snapshot.val()[i] === "") {
              alert(
                "Please complete your profile so that we can match you with the right projects"
              );
              break;
            }
          }
          setFullName(snapshot.val()?.fullName ? snapshot.val().fullName : "");
          setEmail(snapshot.val().email ? snapshot.val().email : "");
          setPhone(snapshot.val().phone ? snapshot.val().phone : "");
          setCountry(snapshot.val().country ? snapshot.val().country : "");
          setProfession(
            snapshot.val().profession ? snapshot.val().profession : ""
          );
          setExperience(
            snapshot.val().experience ? snapshot.val().experience : ""
          );
          setCollegeName(
            snapshot.val().collegeName ? snapshot.val().collegeName : ""
          );
          setDegree(snapshot.val().degree ? snapshot.val().degree : "");
          setOtherDetails(
            snapshot.val().otherDetails ? snapshot.val().otherDetails : ""
          );
          setSector(
            snapshot.val().sector ? snapshot.val().sector : "Select Sector"
          );
          setLinkedInProfile(
            snapshot.val().linkedInProfile ? snapshot.val().linkedInProfile : ""
          );
          setResumeLink(
            snapshot.val().resumeLink ? snapshot.val().resumeLink : ""
          );
          setProfilePicLink(
            snapshot.val().profilePicLink ? snapshot.val().profilePicLink : ""
          );
        });
    }
  }, [currentUser]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        console.log(JSON.stringify(user));
      } else {
        // No user is signed in.
        window.location.replace("/");
      }
    });
  }, []);

  const uploadResume = () => {
    firebase
      .storage()
      .ref("resumes/" + currentUser.uid)
      .put(file)
      .then((snapshot) => {
        console.log(snapshot.metadata);
        alert("success");
        firebase
          .storage()
          .ref("resumes/" + currentUser.uid)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setResumeLink(url);
          })
          .catch((error) => {
            alert("error");
          });
      });
  };

  const uploadProfilePic = (file) => {
    firebase
      .storage()
      .ref("profilePics/" + currentUser.uid)
      .put(file)
      .then((snapshot) => {
        console.log(snapshot.metadata);
        alert("Profile pic updated");
        firebase
          .storage()
          .ref("profilePics/" + currentUser.uid)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setProfilePicLink(url);
          })
          .catch((error) => {
            alert("error");
          });
      });
  };

  const updateUserDetails = () => {
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid)
        .set(
          {
            fullName,
            email,
            phone,
            degree,
            collegeName,
            country,
            profession,
            experience,
            otherDetails,
            sector,
            uid: currentUser.uid,
            linkedInProfile,
            resumeLink,
            profilePicLink,
          },
          (error) => {
            if (error) {
              setSnackBarMessage("Some Error Occured!");
              setSnackBarVisible(true);
            } else {
              setSnackBarMessage("User Details Updated Successfully");
              setSnackBarVisible(true);
            }
          }
        );
    }
  };

  const downloadResume = (e) => {
    e.preventDefault();
    alert(123);
    if (resumeLink === "") {
      alert("No resume uploaded");
      return;
    }
    var xhr = new XMLHttpRequest();
    console.log(resumeLink);
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      alert("loaded");
      var blob = xhr.response;
    };
    xhr.onerror(() => alert("error"));
    xhr.open("GET", resumeLink);
    console.log(xhr);
    xhr.send();
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>User Profile</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper className="ud1--paper">
          <Avatar
            src={profilePicLink}
            style={{
              width: "100px",
              height: "100px",
              margin: "5px",
              alignSelf: "center",
            }}
          />
          <input
            style={{
              justifySelf: "center",
              alignSelf: "center",
            }}
            type="file"
            onChange={(e) => uploadProfilePic(e.target.files[0])}
          />

          <TextField
            margin="dense"
            id="outlined-basic"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            variant="outlined"
            className="ud1--textInput"
          />
          <TextField
            margin="dense"
            id="outlined-basic"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            className="ud1--textInput"
          />
          <TextField
            margin="dense"
            id="outlined-basic"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Phone (Include country code)"
            variant="outlined"
            className="ud1--textInput"
          />
          <TextField
            margin="dense"
            id="outlined-basic"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label="Country of Residence"
            variant="outlined"
            className="ud1--textInput"
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              margin="dense"
              style={{ display: "flex", flex: "1", margin: "0px" }}
              id="outlined-basic"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              label="Primary Profession"
              placeholder="What is your primary profession?"
              variant="outlined"
            />

            <FormControl
              variant="outlined"
              style={{
                width: "100px",
                margin: "0 10px",
                minWidth: "50px",
                display: "flex",
              }}
            >
              <Select
                margin="dense"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                renderValue={() => {
                  return experience;
                }}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"0"}>0</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"6"}>6</MenuItem>
                <MenuItem value={"7"}>7</MenuItem>
                <MenuItem value={"8"}>8</MenuItem>
                <MenuItem value={"9"}>9</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"10+"}>10+</MenuItem>
              </Select>
              <FormHelperText style={{ width: "100px" }}>
                Exp. In Years
              </FormHelperText>
            </FormControl>
          </Box>

          <TextField
            margin="dense"
            id="outlined-basic"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            label="College Name"
            variant="outlined"
            className="ud1--textInput"
          />
          <TextField
            margin="dense"
            id="outlined-basic"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            label="Degree"
            variant="outlined"
            className="ud1--textInput"
          />

          <TextField
            margin="dense"
            id="filled-multiline-static"
            label="Other Details"
            value={otherDetails}
            onChange={(e) => setOtherDetails(e.target.value)}
            placeholder="Tell us briefly about your work history and years of experience. Include the type of prjects you would like to work on."
            multiline
            rows={4}
            variant="outlined"
            className="ud1--textInput"
          />
          <TextField
            margin="dense"
            id="outlined-basic"
            value={linkedInProfile}
            onChange={(e) => setLinkedInProfile(e.target.value)}
            label="LinkedIn Profile"
            variant="outlined"
            className="ud1--textInput"
          />
          <Select
            margin="dense"
            style={{ margin: "10px", marginTop: "25px" }}
            displayEmpty={true}
            renderValue={() => {
              return sector;
            }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            autoWidth
          >
            {sectorList.map((sector) => (
              <MenuItem value={sector.sectorName}>{sector.sectorName}</MenuItem>
            ))}
          </Select>
          <div
            style={{
              display: "flex",
              border: "1px solid lightgray",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px 0",
              height: "100px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-around",
                paddingBottom: "10px",
                paddingLeft: "5px",
              }}
            >
              <h3
                style={{
                  justifySelf: "flex-start",
                  margin: "3px",
                }}
              >
                Resume
              </h3>
              <input
                style={{ justifySelf: "center" }}
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <a href={resumeLink} target="_blank">
                View Uploaded Resume
              </a>
            </div>
            <Button
              onClick={() => uploadResume()}
              variant={"contained"}
              size={"small"}
              style={{ fontSize: "15px", maxHeight: "35px" }}
            >
              Upload
            </Button>
          </div>
          <Box m={1}>
            <Button
              onClick={() => updateUserDetails()}
              className="ud1--button"
              variant="contained"
              color="primary"
            >
              Update Details
            </Button>
          </Box>
          <SnackBar
            visible={snackBarVisible}
            message={snackBarMessage}
            closeSnackBar={() => setSnackBarVisible(false)}
          />
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};
