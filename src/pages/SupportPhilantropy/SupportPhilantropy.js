import React, { useState } from "react";
import "./SupportPhilantropy.css";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import firebase from "../../firebase";
import Typewriter from "typewriter-effect";

export default () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUpWithEmailPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        user
          .updateProfile({
            displayName: "Saurabh Sharma",
          })
          .then(function () {
            alert("profile updated");

            firebase
              .database()
              .ref("users/" + userCredential.user.uid)
              .set(
                {
                  fullName,
                  email,
                  phone,
                  country,
                  profession,
                  otherDetails,
                },
                (error) => {
                  if (error) {
                    // The write failed...
                    alert("error");
                  } else {
                    window.location = "/user-dashboard";
                    // Data saved successfully!
                  }
                }
              );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        // An error happened.
        alert("error", JSON.stringify(error));
      });
  };
  const continueWithGoogle = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        firebase
          .database()
          .ref("users/" + user.uid)
          .get()
          .then((snapshot) => {
            console.log(snapshot);
            if (!snapshot.val()) {
              firebase
                .database()
                .ref("users/" + user.uid)
                .set({
                  fullName: user.displayName,
                  email: user.email,
                  otherDetails: "other details",
                });
              window.location = "/user-dashboard";
            } else {
              window.location = "/user-dashboard";
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Background = "/233_images/signup3.jpg";
  return (
    <>
      <div>
        <Paper
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            backgroundColor: "",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${Background})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="sp--insideContainer">
            <div
              elevation="3"
              className="sp--insideContainer1
        "
            >
              <h1 variant="h6" component="h6" className="sp--topText">
                Thank You!
                <br />
                <br />
                Medaase!
                <br />
                <br />
                Et onmnia in potestate nostra esse natura liber, libera, libere
                valeant.
                <br />
                <br />
                You can support either with your time and skills or cash
                donation or both
              </h1>

              <div></div>
            </div>
            <Paper
              elevation="10"
              style={{ position: "sticky", backgroundColor: "#f8f8f8" }}
              className="sp--insideContainer2"
            >
              <TextField
                id="outlined-basic"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
                className="sp--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-basic"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                className="sp--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-basic"
                label="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="outlined"
                className="sp--insideContainer2-textInput1"
              />
              <TextField
                id="filled-multiline-static"
                label="Other Details"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
                placeholder="Briefly tell us how you want to support us and a member of our staff will reach out to you to discuss further."
                multiline
                rows={8}
                variant="outlined"
                className="sp--insideContainer2-textInput1"
              />

              <Button
                onClick={(e) => signUpWithEmailPassword(e)}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Paper>
          </div>
        </Paper>
      </div>
    </>
  );
};
