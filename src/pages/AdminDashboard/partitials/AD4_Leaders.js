import React, { useState, useEffect } from "react";
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
} from "@material-ui/core/";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import firebase from "../../../firebase";
import dateFormat from "dateformat";
import LEADERS_POPUP from "./LEADERS_POPUP";

//News & Heighlights section of admin dashboard
export default () => {
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = useState(false);
  const [rowData, setRowData] = useState("");
  const [objectDetails, setObjectDetails] = useState({});
  const [isNewObject, setIsNewObject] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/leaders/")
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
            .ref("websiteContent/leaders/" + props.data.objectId)
            .remove();
          alert("Object deleted");
          setReload(!reload);
        }}
      />
    );
  };
  const gridOptions = {
    // enable sorting on 'name' and 'age' columns only
    columnDefs: [
      { field: "name", sortable: true, filter: true },
      { field: "position", sortable: true, filter: true },
      { field: "otherDetails", sortable: true, filter: true },
      { field: "loaction", sortable: true, filter: true },
      { field: "quote", sortable: true, filter: true },
      { cellRenderer: "btnCellRenderer", minWidth: 150 },
    ],
    frameworkComponents: {
      btnCellRenderer: BtnCellRenderer,
    },
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Leaders</Typography>
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
                + Add Leader
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
                  setObjectDetails(e.data);
                  setIsNewObject(false);
                  setOpen(true);
                }}
              ></AgGridReact>
            </div>
          </div>

          <LEADERS_POPUP
            open={open}
            objectDetails={objectDetails}
            setObjectDetails={setObjectDetails}
            openMethod={setOpen}
            newObject={isNewObject}
            setIsNewObject={setIsNewObject}
            reload={reload}
            setReload={setReload}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
