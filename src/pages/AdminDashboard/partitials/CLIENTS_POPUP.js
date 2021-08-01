import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core/";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import firebase from "../../../firebase";
import dateFormat from "dateformat";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

export default ({
  open,
  newObject,
  objectDetails,
  openMethod,
  setObjectDetails,
  setIsNewObject,
  reload,
  setReload,
}) => {
  console.log("Is New Object", newObject);
  console.log("Object Details", objectDetails);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [objectId, setObjectId] = useState("");

  useEffect(() => {
    setObjectId("");
    setName("");
    setPosition("");
    setOtherDetails("");
    setLocation("");
    setQuote("");
    setImgUrl("");
    if (open) {
      if (newObject) {
        setObjectId(Date.now());
      } else {
        console.log("existing");
        setObjectId(objectDetails.objectId);
        setName(objectDetails.name);
        setPosition(objectDetails.position);
        setOtherDetails(objectDetails.otherDetails);
        setLocation(objectDetails.location);
        setQuote(objectDetails.quote);
        setImgUrl(objectDetails.imgUrl);
      }
    }
  }, [open]);

  const saveDetails = (e) => {
    firebase
      .database()
      .ref("websiteContent/clients/" + objectId)
      .set(
        {
          objectId,
          name,
          position,
          otherDetails,
          location,
          quote,
          imgUrl,
        },
        (error) => {
          if (error) {
            alert("Error Occured");
            openMethod(false);
            setObjectDetails({});
            setIsNewObject(true);
            setReload(!reload);
          } else {
            alert("Saved");
            setReload(!reload);
            openMethod(false);
            setObjectDetails({});
            setIsNewObject(true);
            setReload(!reload);
          }
        }
      );
  };

  const uploadImage = (file) => {
    firebase
      .storage()
      .ref("clientsImages/" + objectId)
      .put(file)
      .then((snapshot) => {
        alert("Object uploaded");
        firebase
          .storage()
          .ref("clientsImages/" + objectId)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImgUrl(url);
          })
          .catch((error) => {
            alert("error");
          });
      });
  };

  return (
    <>
      <Dialog fullScreen open={open}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                openMethod(false);
                setObjectDetails({});
                setIsNewObject(true);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Client
            </Typography>
            <Button autoFocus color="inherit" onClick={(e) => saveDetails()}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <TextField
          margin="dense"
          id="outlined-basic"
          style={{ marginTop: "25px" }}
          label={"Name"}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="ewc1--textInput"
        />
        <TextField
          margin="dense"
          id="outlined-basic"
          label={"Position"}
          variant="outlined"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="ewc1--textInput"
        />
        <TextField
          margin="dense"
          id="outlined-basic"
          label={"Other Details"}
          variant="outlined"
          value={otherDetails}
          onChange={(e) => setOtherDetails(e.target.value)}
          className="ewc1--textInput"
        />
        <TextField
          margin="dense"
          id="outlined-basic"
          label={"Loaction"}
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="ewc1--textInput"
        />
        <TextField
          margin="dense"
          id="outlined-basic"
          label={"Quote"}
          variant="outlined"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="ewc1--textInput"
        />

        <h3>Upload Image</h3>
        <img
          src={imgUrl}
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
          onChange={(e) => uploadImage(e.target.files[0])}
        />
      </Dialog>
    </>
  );
};
