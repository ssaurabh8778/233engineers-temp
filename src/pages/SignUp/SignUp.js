import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import firebase from "../../firebase";
import Typewriter from "typewriter-effect";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const signUpWithEmailPassword = (e) => {
    e.preventDefault();

    if (fullName === "" || email === "") {
      alert("Please enter required details");
      return;
    }
    if (password === "") {
      alert("Please choose a password");
      return;
    }
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
                  uid: userCredential.user.uid,
                },
                (error) => {
                  if (error) {
                    // The write failed...
                    console.log("this is", error);
                    alert("error");
                  } else {
                    window.location = "/user-dashboard";
                    // Data saved successfully!
                  }
                }
              );
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch(function (error) {
        // An error happened.
        console.log("this is one", error);
        alert(error.message);
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

  return (
    <>
      <div>
        <Paper
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            backgroundColor: "",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${imageLinks.signUp_cover_image})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="signup--insideContainer">
            <div
              elevation={3}
              className="signup--insideContainer1
        "
            >
              <h1 variant="h6" component="h6" className="signup--topText">
                Are you.....
                <br />
                <br />
                <strong>
                  <Typewriter
                    options={{
                      strings: [
                        "an Engineer?",
                        "a Scientist?",
                        "a Technician?",
                        "an Engineering/Science Student?",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                    }}
                  />
                </strong>
                <br />
                <strong>
                  Would you like to use your skills to occasionally help solve
                  challenging but rewarding problems in Ghana and get paid for
                  it?
                </strong>
              </h1>

              <div></div>
            </div>
            <Paper
              elevation={10}
              style={{ position: "sticky", backgroundColor: "#f8f8f8" }}
              className="signup--insideContainer2"
            >
              <Typography
                variant="subtitle1"
                component="h6"
                className="signup--insideContainer2-headerText"
                color="primary"
              >
                <strong>
                  If yes, then fill the forms below and let's do this?
                </strong>
              </Typography>
              <TextField
                id="outlined-basic"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-basic"
                label="Phone (Include country code)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-basic"
                label="Country of Residence"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-basic"
                label="Primary Profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="What is your primary profession?"
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <TextField
                id="filled-multiline-static"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
                placeholder="Tell us briefly about your work history and years of experience. Include the type of prjects you would like to work on."
                multiline
                rows={4}
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type={"password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                className="signup--insideContainer2-textInput1"
              />
              <Button
                onClick={(e) => signUpWithEmailPassword(e)}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Typography variant="h6" component="h6">
                OR
              </Typography>
              <Button
                onClick={(e) => continueWithGoogle(e)}
                variant="contained"
                color="secondary"
              >
                Sign up with Google
              </Button>
            </Paper>
          </div>
        </Paper>
      </div>
    </>
  );
};
export default SignUp;