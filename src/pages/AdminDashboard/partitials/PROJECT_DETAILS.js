import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  Divider,
} from "@material-ui/core";
import "./PROJECT_DETAILS.css";
import firebase from "../../../firebase";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default ({ projectDetails }) => {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [selectedUserID, setSelectedUserID] = useState("Select User");
  const [allUsers, setAllUsers] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    firebase
      .database()
      .ref("users")
      .get()
      .then((snapshot) => {
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }
        setAllUsers(data);
      });
  }, []);

  const sendInvite = (e) => {
    e.preventDefault();

    const pid = projectDetails.pid;
    const uid = selectedUserID;
    firebase
      .database()
      .ref("collaborations/" + uid + pid)
      .set(
        {
          uid,
          pid,
          status: "Invited",
        },
        (error) => {
          if (error) {
            alert("Error Occured");
          } else {
            alert("Invite sent");
            setReload(!reload);
          }
        }
      );
  };
  return (
    <>
      <div className="projectDetails--container">
        <Paper className="projectDetails--infoContainer">
          <div>
            <Typography>
              <strong>Project Title:</strong> {projectDetails.title}
            </Typography>
            <Typography>
              <strong>Created On:</strong> {projectDetails.createdOn}
            </Typography>
            <Typography>
              <strong>Created By:</strong> {projectDetails.createdBy}
            </Typography>
            <Typography>
              <strong>Applicable Sector:</strong>{" "}
              {projectDetails.applicableSector}
            </Typography>
            <Typography>
              <strong>Available Funds:</strong> {projectDetails.availableFunds}
            </Typography>
          </div>
          <Card className="projectDetails--invite">
            <h3>Invite User</h3>
            <Divider />
            <Select
              margin="dense"
              style={{ margin: "10px", marginTop: "25px", width: "150px" }}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(e) => {
                setSelectedUserID(e.target.value);
              }}
            >
              {allUsers.map((user) => (
                <MenuItem value={user.uid}>{user.fullName}</MenuItem>
              ))}
            </Select>
            <Button
              onClick={(e) => {
                sendInvite(e);
              }}
              color="primary"
              variant="contained"
            >
              Send Invite
            </Button>
          </Card>
        </Paper>
        <Paper className="projectDetails--infoContainer">
          <Card elevation={3} className="projectDetails--cards">
            <Collaborators projectDetails={projectDetails} />
          </Card>
          <Card elevation={3} className="projectDetails--cards">
            <Invited projectDetails={projectDetails} />
          </Card>
          <Card elevation={3} className="projectDetails--cards">
            <Interested projectDetails={projectDetails} />
          </Card>
        </Paper>
      </div>
    </>
  );
};

const Collaborators = ({ projectDetails }) => {
  const [rowData, setRowData] = useState();
  const gridOptions = {
    // enable sorting on 'name' and 'age' columns only
    columnDefs: [
      { field: "fullName", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
    ],
    // other grid options ...
  };
  useEffect(() => {
    firebase
      .database()
      .ref("collaborations")
      .orderByChild("pid")
      .equalTo(projectDetails.pid)
      .once("value")
      .then((snapshot) => {
        let data = [];
        for (let item in snapshot.val()) {
          if (snapshot.val()[item].status === "Collaborating") {
            firebase
              .database()
              .ref("users/" + snapshot.val()[item].uid)
              .get()
              .then((snapshot) => {
                data.push(snapshot.val());
                console.log(JSON.stringify(snapshot.val()));
              })
              .then(() => {
                setRowData(data);
                console.log(rowData);
              });
          }
        }

        //setRowData(data);
      });
  }, []);

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        margin: "15px 35px",
      }}
    >
      <h3 style={{ color: "darkblue" }}>Collaborators</h3>
      <Divider />
      <AgGridReact gridOptions={gridOptions} rowData={rowData}></AgGridReact>
    </div>
  );
};

const Invited = ({ projectDetails }) => {
  const [rowData, setRowData] = useState();
  const gridOptions = {
    // enable sorting on 'name' and 'age' columns only
    columnDefs: [
      { field: "fullName", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
    ],
    // other grid options ...
  };
  useEffect(() => {
    firebase
      .database()
      .ref("collaborations")
      .orderByChild("pid")
      .equalTo(projectDetails.pid)
      .once("value")
      .then((snapshot) => {
        let data = [];
        for (let item in snapshot.val()) {
          if (snapshot.val()[item].status === "Invited") {
            firebase
              .database()
              .ref("users/" + snapshot.val()[item].uid)
              .get()
              .then((snapshot) => {
                data.push(snapshot.val());
                console.log(JSON.stringify(snapshot.val()));
              })
              .then(() => {
                setRowData(data);
                console.log(rowData);
              });
          }
        }
      });
  }, []);

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        margin: "15px 35px",
      }}
    >
      <h3 style={{ color: "darkblue" }}>Invited</h3>
      <Divider />
      <AgGridReact gridOptions={gridOptions} rowData={rowData}></AgGridReact>
    </div>
  );
};

const Interested = ({ projectDetails }) => {
  const [rowData, setRowData] = useState();
  const gridOptions = {
    // enable sorting on 'name' and 'age' columns only
    columnDefs: [
      { field: "fullName", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
    ],
    // other grid options ...
  };

  useEffect(() => {
    firebase
      .database()
      .ref("collaborations")
      .orderByChild("pid")
      .equalTo(projectDetails.pid)
      .once("value")
      .then((snapshot) => {
        let data = [];
        for (let item in snapshot.val()) {
          if (snapshot.val()[item].status === "Interested") {
            firebase
              .database()
              .ref("users/" + snapshot.val()[item].uid)
              .get()
              .then((snapshot) => {
                data.push(snapshot.val());
                console.log(JSON.stringify(snapshot.val()));
              })
              .then(() => {
                setRowData(data);
                console.log(rowData);
              });
          }
        }

        //setRowData(data);
      });
  }, []);

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        margin: "15px 35px",
      }}
    >
      <h3 style={{ color: "darkblue" }}>Interested</h3>
      <Divider />
      <AgGridReact gridOptions={gridOptions} rowData={rowData}></AgGridReact>
    </div>
  );
};
