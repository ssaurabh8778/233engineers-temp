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
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import firebase from "../../../firebase";
import dateFormat from "dateformat";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAuth } from "../../../AuthContext";
import { sectorList } from "../../../sectorList";
import { TrainRounded } from "@material-ui/icons";
import PROJECT_DETAILS from "./PROJECT_DETAILS";

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

//ProjectDetails section of admin dashboard
export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [projectOpen, setProjectOpen] = React.useState(false);
  const [reload, setReload] = useState(false);
  const [createdBy, setCreatedBy] = useState("admin");
  const [creatorId, setCreatorId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [sector, setSector] = useState("Select Sector");
  const [availableFunds, setAvailableFunds] = useState("");
  const [phone, setPhone] = useState("");
  const [rowData, setRowData] = useState("");
  const [projectDetails, setProjectDetails] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setCreatorId(currentUser.uid);
      firebase
        .database()
        .ref("projects")
        .get()
        .then((snapshot) => {
          console.log(snapshot.val());
          let data = [];
          for (let item in snapshot.val()) {
            data.push(snapshot.val()[item]);
          }

          setRowData(data);
        });
    }
  }, [currentUser, reload]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const saveDetails = (e) => {
    var dateNow = Date.now();
    var pid = Date.now();
    firebase
      .database()
      .ref("projects/" + pid)
      .set(
        {
          pid: pid,
          createdOn: dateFormat(dateNow),
          createdBy,
          creatorId,
          title,
          description,
          imgUrl,
          sector,
          availableFunds,
          phone,
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

  const BtnCellRenderer = (props) => {
    return (
      <DeleteIcon
        color="secondary"
        onClick={() => {
          firebase
            .database()
            .ref("projects/" + props.data.pid)
            .remove();
          alert(JSON.stringify(props.data));
        }}
      />
    );
  };
  const gridOptions = {
    // enable sorting on 'name' and 'age' columns only
    columnDefs: [
      { field: "createdOn", sortable: true, filter: true },
      { field: "createdBy", sortable: true, filter: true },
      { field: "title", sortable: true, filter: true, flex: "1" },
      { field: "sector", sortable: true, filter: true },
      { field: "availableFunds", sortable: true, filter: true },
      { cellRenderer: "btnCellRenderer", minWidth: 150 },
    ],
    frameworkComponents: {
      btnCellRenderer: BtnCellRenderer,
    },

    // other grid options ...
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Projects</Typography>
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
                + Add Project
              </Button>
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: "50vh", width: "100%", maxWidth: "1200px" }}
            >
              <AgGridReact
                gridOptions={gridOptions}
                rowData={rowData}
                onRowDoubleClicked={(e) => {
                  setProjectDetails(e.data);
                  setProjectOpen(true);
                }}
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
                  Add News & Highlights
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
              style={{ marginTop: "25px" }}
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
              label={"Brief Description"}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Funds Available"}
              variant="outlined"
              value={availableFunds}
              onChange={(e) => setAvailableFunds(e.target.value)}
              className="ewc1--textInput"
            />
            <TextField
              margin="dense"
              id="outlined-basic"
              label={"Phone Number"}
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="ewc1--textInput"
            />
          </Dialog>
          <Dialog fullScreen open={projectOpen}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setProjectOpen(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Project Details
                </Typography>
              </Toolbar>
            </AppBar>
            <PROJECT_DETAILS projectDetails={projectDetails} />
          </Dialog>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
