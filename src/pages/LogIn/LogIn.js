import React, { useState } from "react";
import "./LogIn.css";
import { Paper, Grid, Typography, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [email1, setEmail1] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email1)
      .then(() => {
        alert("Password reset email sent");
        setEmail1("");
        setOpen(false);
      })
      .catch((error) => {
        alert(error.message);
        setEmail1("");
        setOpen(false);
        // ..
      });
  };

  const logInWithEmailPassword = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
      .then((userCredential) => {
        var user = userCredential.user;
        window.location = "/user-dashboard";
      })
      .catch((error) => {
        console.log(error.message);
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
                  uid: user.uid,
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
      <Grid className="login--container">
        <Paper elevation="5" className="login--insideContainer2">
          <Paper
            className="login--insideContainer1
        "
          >
            <img className="login--logo" src="/233_images/logo.png" />
            <h2 style={{ color: "#204d65", marginBottom: "25px" }}>
              233engineers
            </h2>
          </Paper>
          <Typography
            variant="h5"
            component="h5"
            className="login--insideContainer2--headerText"
            color="primary"
          >
            AKWAABA!
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            className="login--insideContainer2-textInput1"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className="login--insideContainer2-textInput1"
          />
          <Link onClick={handleClickOpen}>
            <Typography
              variant="subtitle1"
              component="h6"
              color="primary"
              style={{ textDecoration: "underline" }}
            >
              Forgot your password?
            </Typography>
          </Link>

          <Button
            onClick={(e) => logInWithEmailPassword(e)}
            size="large"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Typography variant="h6" component="h6">
            OR
          </Typography>
          <Button
            onClick={(e) => continueWithGoogle(e)}
            size="large"
            variant="contained"
            color="secondary"
          >
            Continue with Google
          </Button>
          <Link to="/sign-up">
            <Typography
              variant="subtitle1"
              component="h6"
              color="primary"
              style={{ textDecoration: "underline" }}
            >
              Not a member yet? Sign Up
            </Typography>
          </Link>
        </Paper>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Please enter registered email address
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            A password recovery email will be sent to registered email address
          </DialogContentText>
          <TextField
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={handleClose}
            color="primary"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
