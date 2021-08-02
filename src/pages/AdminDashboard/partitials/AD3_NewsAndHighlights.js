import React, { useState, useEffect } from "react";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import firebase from "../../../firebase";
import OBJECT_POPUP from "./OBJECT_POPUP";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     appBar: {
//       position: "relative",
//     },
//     title: {
//       marginLeft: theme.spacing(2),
//       flex: 1,
//     },
//   })
// );

//News & Heighlights section of admin dashboard
const AD3_NewsAndHighlights = () => {
 
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = useState(false);
  // const author="";
  // const title="";
  // const content="";
  // const [imgUrl, setImgUrl] = useState("");
  const [rowData, setRowData] = useState("");
  const [objectDetails, setObjectDetails] = useState({});
  const [isNewObject, setIsNewObject] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const saveDetails = (e) => {
  //   var dateNow = new Date();
  //   firebase
  //     .database()
  //     .ref("newsAndHighlights/" + Date.now())
  //     .set(
  //       {
  //         id: dateNow,
  //         publishedOn: dateFormat(dateNow),
  //         author,
  //         title,
  //         content,
  //         imgUrl,
  //       },
  //       (error) => {
  //         if (error) {
  //           alert("Error Occured");
  //           setOpen(false);
  //           setReload(!reload);
  //         } else {
  //           alert("Saved");
  //           setOpen(false);
  //         }
  //       }
  //     );
  // };

  useEffect(() => {
    firebase
      .database()
      .ref("newsAndHighlights/")
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
            .ref("newsAndHighlights/" + props.data.objectId)
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
      { field: "publishedOn", sortable: true, filter: true },
      { field: "author", sortable: true, filter: true },
      { field: "title", sortable: true, filter: true },
      { field: "content", sortable: true, filter: true, flex: 1 },
      { cellRenderer: "btnCellRenderer", minWidth: 150 },
    ],
    frameworkComponents: {
      btnCellRenderer: BtnCellRenderer,
    },

    // other grid options ...
  };

  /*
  const rowData = [
    {
      publishedOn: "Toyota",
      author: "Celica",
      title: 35000,
    },
    {
      publishedOn: "Toyota",
      author: "Celica",
      title: 35000,
    },
  ];

  */

  // const uploadImage = (file) => {
  //   let imageId = Date.now();
  //   firebase
  //     .storage()
  //     .ref("newsAndHighlightsImages/" + imageId)
  //     .put(file)
  //     .then((snapshot) => {
  //       alert("Profile pic updated");
  //       firebase
  //         .storage()
  //         .ref("newsAndHighlightsImages/" + imageId)
  //         .getDownloadURL()
  //         .then((url) => {
  //           console.log(url);
  //           setImgUrl(url);
  //         })
  //         .catch((error) => {
  //           alert("error");
  //         });
  //     });
  // };
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>News & Highlights</Typography>
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
                + Add New & Highlight
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

          <OBJECT_POPUP
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
export default AD3_NewsAndHighlights;