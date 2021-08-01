import React, { useState, useEffect } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import "./UD3_projectInvites.css";
import { useTransition, animated } from "react-spring";
import { useAuth } from "../../../AuthContext";
import firebase from "../../../firebase";

export default () => {
  const [switch1, setSwitch1] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [invite, setInvite] = useState();
  const [requestCounts, setRequestCounts] = useState(0);
  const [text, setText] = useState("This is the project description");
  const { currentUser } = useAuth();
  const transition = useTransition(isVisible, {
    from: { x: -100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 100, y: 0, opacity: 0 },
  });

  useEffect(() => {
    if (currentUser) {
      firebase
        .database()
        .ref("collaborations")
        .orderByChild("uid")
        .equalTo(currentUser.uid)
        .once("value")
        .then((snapshot) => {
          let data = [];
          for (let item in snapshot.val()) {
            if (snapshot.val()[item].status === "Invited") {
              firebase
                .database()
                .ref("projects/" + snapshot.val()[item].pid)
                .get()
                .then((snapshot) => {
                  data.push(snapshot.val());
                  console.log(JSON.stringify(snapshot.val()));
                })
                .then(() => {
                  setRowData(data);
                  console.log(rowData);
                  setRequestCounts(data.length);
                  if (data.length > 0) {
                    setInvite(data[data.length - 1]);
                  }
                });
            }
          }

          //setRowData(data);
        });
    }
  }, [currentUser]);

  const accept = () => {
    firebase
      .database()
      .ref("collaborations/" + currentUser.uid + invite.pid)
      .set(
        {
          uid: currentUser.uid,
          pid: invite.pid,
          status: "Collaborating",
        },
        (error) => {
          if (error) {
            alert("Error Occured");
          } else {
            alert("Invite Accepted");
            if (requestCounts > 1) {
              setInvite(rowData[requestCounts - 2]);
              setRowData(rowData.pop());
              setRequestCounts(requestCounts - 1);
            } else {
              alert("Invite Accepted. No more invites!");
              setInvite(null);
              setRequestCounts(0);
              setRowData(rowData.pop());
            }
          }
        }
      );

    console.log("this is working", switch1);
    setSwitch1(!switch1);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };

  const reject = () => {
    firebase
      .database()
      .ref("collaborations/" + currentUser.uid + invite.pid)
      .set(
        {
          uid: currentUser.uid,
          pid: invite.pid,
          status: "Invited & Rejected",
        },
        (error) => {
          if (error) {
          } else {
            alert("Invite Rejected");
            if (requestCounts > 1) {
              alert("Error Occured");
              setInvite(rowData[requestCounts - 2]);
              setRowData(rowData.pop());
              setRequestCounts(requestCounts - 1);
            } else {
              alert("Invite Rejected. No more invites!");
              setInvite(null);
              setRequestCounts(0);
              setRowData(rowData.pop());
            }
          }
        }
      );
    console.log("this is working", switch1);
    setSwitch1(!switch1);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };

  return (
    <>
      <h2
        style={{ marginBottom: "15px", justifySelf: "flex-start" }}
        variant="h6"
        color="primary"
      >
        Project Requests
        <strong
          style={{
            backgroundColor: "red",
            color: "#fff",
            margin: "5px",
            borderRadius: "5px",
            padding: "0 5px",
          }}
        >
          {requestCounts}
        </strong>
      </h2>
      <Card elevation={3} className="UD3-container">
        {transition((style, item) =>
          item ? (
            <animated.div style={style} className="projectInvite--container">
              <Typography variant="h5" component="h5">
                <strong>{invite?.title}</strong>
              </Typography>
              <div>
                <Typography variant="subtitle1" component="h5">
                  Added By: <strong>{invite?.createdBy}</strong>
                  <br />
                  Sector: <strong>{invite?.applicableSector}</strong>
                </Typography>
              </div>
            </animated.div>
          ) : (
            ""
          )
        )}
      </Card>
      <div className="UD3--buttonContainer">
        <Button
          style={{ margin: "5px" }}
          onClick={() => accept()}
          variant="contained"
          color="primary"
        >
          ACCEPT
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => reject()}
          variant="contained"
          color="secondary"
        >
          REJECT
        </Button>
      </div>
    </>
  );
};
