import React, {  useState } from "react";
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
} from "@material-ui/core";
import firebase from "../../../firebase";
import { sectorList } from "../../../sectorList";

const PROFILE_DETAILS = ({ profileDetails, reload, setReload }) => {
  console.log(profileDetails);
  const uid=profileDetails.uid;
  const [fullName, setFullName] = useState(profileDetails.fullName);
  const [email, setEmail] = useState(profileDetails.email);
  const [phone, setPhone] = useState(profileDetails.phone);
  const [earnings, setEarnings] = useState(profileDetails.earnings);
  const [isAdmin, setIsAdmin] = useState(profileDetails.isAdmin);
  const [country, setCountry] = useState(profileDetails.country);
  const [profession, setProfession] = useState(profileDetails.profession);
  const [otherDetails, setOtherDetails] = useState(profileDetails.otherDetails);
  const [collegeName, setCollegeName] = useState(profileDetails.collegeName);
  const [degree, setDegree] = useState(profileDetails.degree);
  const [sector, setSector] = useState(profileDetails.sector);
  const [linkedInProfile, setLinkedInProfile] = useState(
    profileDetails.linkedInProfile
  );
  const resumeLink=profileDetails.resumeLink;
  const profilePicLink=
    profileDetails.profilePicLink;

  const updateEarnings = () => {
    if (uid) {
      firebase
        .database()
        .ref("users/" + uid + "/earnings")
        .set(earnings, (error) => {
          if (error) {
            alert("Error Occured");
          } else {
            alert("Earnings Updated");
          }
        });
    }
  };

  const toggleAdminStatus = () => {
    if (uid) {
      firebase
        .database()
        .ref("users/" + uid + "/isAdmin")
        .set(!isAdmin, (error) => {
          if (error) {
            alert("Error Occured");
          } else {
            alert(isAdmin ? "User removed as admin" : "User added as admin");
            setIsAdmin(!isAdmin);
          }
        });
    }
  };

  // const downloadResume = (e) => {
  //   e.preventDefault();
  //   alert(123);
  //   if (resumeLink === "") {
  //     alert("No resume uploaded");
  //     return;
  //   }
  //   var xhr = new XMLHttpRequest();
  //   console.log(resumeLink);
  //   xhr.responseType = "blob";
  //   xhr.onload = (event) => {
  //     alert("loaded");
  //     var blob = xhr.response;
  //   };
  //   xhr.onerror(() => alert("error"));
  //   xhr.open("GET", resumeLink);
  //   console.log(xhr);
  //   xhr.send();
  // };

  return (
    <Paper className="ud1--paper">
      <h3>User Profile</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar
          src={profilePicLink}
          style={{
            width: "100px",
            height: "100px",
            margin: "5px",
            alignSelf: "center",
          }}
        />

        <Button
          onClick={() => toggleAdminStatus()}
          variant={"contained"}
          color={isAdmin ? "secondary" : "primary"}
        >
          {isAdmin ? "Remove User As Admin" : "Make This User Admin"}
        </Button>
        <Paper
          style={{
            width: "30%",
            height: "110px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TextField
            margin="dense"
            id="outlined-basic"
            label="Earnings($)"
            value={earnings}
            onChange={(e) => setEarnings(e.target.value)}
            variant="outlined"
            className="ud1--textInput"
          ></TextField>
          <Button
            onClick={() => {
              updateEarnings();
            }}
            variant={"contained"}
            color={"primary"}
          >
            Update earnings
          </Button>
        </Paper>
      </div>

      <TextField
        margin="dense"
        id="outlined-basic"
        disabled
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        variant="outlined"
        className="ud1--textInput"
      />
      <TextField
        margin="dense"
        id="outlined-basic"
        disabled
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        className="ud1--textInput"
      />
      <TextField
        margin="dense"
        id="outlined-basic"
        disabled
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        label="Phone (Include country code)"
        variant="outlined"
        className="ud1--textInput"
      />
      <TextField
        margin="dense"
        id="outlined-basic"
        disabled
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
          disabled
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
            disabled
            value={"123"}
            autoWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText style={{ width: "100px" }}>
            Exp. In Years
          </FormHelperText>
        </FormControl>
      </Box>

      <TextField
        margin="dense"
        id="outlined-basic"
        disabled
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
        label="College Name"
        variant="outlined"
        className="ud1--textInput"
      />
      <TextField
        margin="dense"
        id="outlined-basic"
        disabled
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        label="Degree"
        variant="outlined"
        className="ud1--textInput"
      />

      <TextField
        margin="dense"
        id="filled-multiline-static"
        disabled
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
        disabled
        value={linkedInProfile}
        onChange={(e) => setLinkedInProfile(e.target.value)}
        label="LinkedIn Profile"
        variant="outlined"
        className="ud1--textInput"
      />
      <Select
        margin="dense"
        style={{ margin: "10px", marginTop: "25px" }}
        disabled
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
          <a href={resumeLink} target="_blank" rel="noreferrer">
            View Uploaded Resume
          </a>
        </div>
      </div>
    </Paper>
  );
};
export default PROFILE_DETAILS;