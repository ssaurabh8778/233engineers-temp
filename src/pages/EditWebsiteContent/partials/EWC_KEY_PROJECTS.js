import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import firebase from "../../../firebase";
import { sectorList } from "../../../sectorList";

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

const EWC_KEY_PROJECTS = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [sector, setSector] = useState("Select Sector");
  const [rowData, setRowData] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const saveDetails = (e) => {
    var dateNow = Date.now();
    firebase
      .database()
      .ref("websiteContent/keyProjects/" + dateNow)
      .set(
        {
          ref: dateNow,
          title,
          content,
          sector,
          imgUrl,
        },
        (error) => {
          if (error) {
            alert("Error Occured");
            setOpen(false);
          } else {
            alert("Saved");
            setReload(!reload);
            setOpen(false);
          }
        }
      );
  };

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/keyProjects")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }

        setRowData(data);
      });
  }, [reload]);

  const BtnCellRenderer = (props) => {
    return (
      <DeleteIcon
        color="secondary"
        onClick={() => {
          firebase
            .database()
            .ref("websiteContent/keyProjects/" + props.data.ref)
            .remove();
          alert("Deleted");
          setReload(!reload);
        }}
      />
    );
  };
  const gridOptions = {
    // enable sorting on 'name' and 'age' columns only
    columnDefs: [
      { field: "title", sortable: true, filter: true },
      { field: "content", sortable: true, filter: true, flex: 1 },
      { field: "sector", sortable: true, filter: true },
      { cellRenderer: "btnCellRenderer", minWidth: 150 },
    ],
    frameworkComponents: {
      btnCellRenderer: BtnCellRenderer,
    },

    // other grid options ...
  };
  const uploadImage = (file) => {
    let imageId = Date.now();
    firebase
      .storage()
      .ref("sectorImages/keyProjects/" + imageId)
      .put(file)
      .then((snapshot) => {
        alert("Image uploaded");
        firebase
          .storage()
          .ref("sectorImages/keyProjects/" + imageId)
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sector Pages - Key Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: "1",
                justifyContent: "flex-end",
                alignItems: "center",
                margin: "15px 30px",
                marginTop: "-10px",
              }}
            >
              <Button variant="contained" onClick={handleClickOpen}>
                + Add Key Projects
              </Button>
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: "50vh", width: "100%", maxWidth: "1200px" }}
            >
              <AgGridReact
                gridOptions={gridOptions}
                rowData={rowData}
              ></AgGridReact>
            </div>
          </div>

          <Dialog fullScreen open={open}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setOpen(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Add Key Project
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={(e) => saveDetails()}
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>
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
                <MenuItem value={sector.sectorName}>
                  {sector.sectorName}
                </MenuItem>
              ))}
            </Select>
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Title"}
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Content"}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Image URL"}
              variant="outlined"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="ewc1--textInput"
            />
            <h3>Upload Image</h3>
            <img
              src={imgUrl}
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
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </Dialog>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default EWC_KEY_PROJECTS;