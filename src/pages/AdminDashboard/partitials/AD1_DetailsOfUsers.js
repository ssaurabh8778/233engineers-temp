import React, { useState } from "react";
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
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import PROFILE_DETAILS from "./PROFILE_DETAILS";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

//UserDetails section of Admin Dashboard
export default ({ rowData, reload, setReload }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState(false);
  const classes = useStyles();
  const gridOptions = {
    columnDefs: [
      { field: "fullName", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
      { field: "phone", sortable: true, filter: true },
      { field: "country", sortable: true, filter: true },
      { field: "profession", sortable: true, filter: true },
      { field: "collegeName", sortable: true, filter: true },
      { field: "degree", sortable: true, filter: true },
      { field: "earnings", sortable: true, filter: true },
      { field: "isAdmin", sortable: true, filter: true },
    ],
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>User Details</Typography>
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
              className="ag-theme-alpine"
              style={{ height: "50vh", width: "100%", maxWidth: "1200px" }}
            >
              <AgGridReact
                gridOptions={gridOptions}
                rowData={rowData}
                onRowDoubleClicked={(e) => {
                  setProfileDetails(e.data);
                  setProfileOpen(true);
                }}
              ></AgGridReact>
            </div>
          </div>
        </AccordionDetails>
        <Dialog fullScreen open={profileOpen}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setProfileOpen(false)}
                aria-label="close"
              >
                <CloseIcon onClick={() => setReload(!reload)} />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Project Details
              </Typography>
            </Toolbar>
          </AppBar>
          <PROFILE_DETAILS profileDetails={profileDetails} reload={reload} />
        </Dialog>
      </Accordion>
    </>
  );
};
