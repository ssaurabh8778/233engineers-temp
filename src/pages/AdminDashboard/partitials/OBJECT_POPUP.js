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
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
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

const OBJECT_POPUP = ({
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
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [objectId, setObjectId] = useState("");

  useEffect(() => {
    setObjectId("");
    setAuthor("");
    setTitle("");
    setContent("");
    setImgUrl("");
    if (open) {
      if (newObject) {
        setObjectId(Date.now());
      } else {
        console.log("existing");
        setObjectId(objectDetails.objectId);
        setAuthor(objectDetails.author);
        setTitle(objectDetails.title);
        setContent(objectDetails.content);
        setImgUrl(objectDetails.imgUrl);
      }
    }
  }, [open]);

  const saveDetails = (e) => {
    firebase
      .database()
      .ref("newsAndHighlights/" + objectId)
      .set(
        {
          objectId,
          publishedOn: dateFormat(objectId),
          author,
          title,
          content,
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
      .ref("newsAndHighlightsImages/" + objectId)
      .put(file)
      .then((snapshot) => {
        alert("Object uploaded");
        firebase
          .storage()
          .ref("newsAndHighlightsImages/" + objectId)
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
              Add News & Highlights
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
          label={"Author"}
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="ewc1--textInput"
        />
        <TextField
          margin="dense"
          id="outlined-basic"
          multiline
          rows={3}
          label={"Title"}
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ewc1--textInput"
        />
        <TextField
          margin="dense"
          id="outlined-basic"
          multiline
          rows={5}
          label={"Content"}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="ewc1--textInput"
        />
        <h3>Upload Image</h3>
        <img
          alt=""
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
export default OBJECT_POPUP;