import React, { useState, useEffect } from "react";
import "./UD6_CHAT_POPUP.css";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import { Paper, Typography } from "@material-ui/core";
import { ChatList, MessageList, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import firebase from "../../../firebase";
import { useAuth } from "../../../AuthContext";
import SendIcon from "@material-ui/icons/Send";
import { Input, TextField } from "@material-ui/core";

function UD6_CHAT_POPUP() {
  const [showPopUp, setShowPopUp] = useState(false);

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <>
      {showPopUp === true ? <ChatBox togglePopUp={togglePopUp} /> : <></>}
      <ChatIconButton togglePopUp={togglePopUp} />
    </>
  );
}

export default UD6_CHAT_POPUP;

const ChatBox = ({ togglePopUp }) => {
  const { currentUser } = useAuth();
  const [messageText, setMessageText] = useState("");
  const [chatListData, setChatListData] = useState([]);
  const [messages, setMessages] = useState([
    {
      position: "right",
      type: "text",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      date: new Date(),
    },
    {
      position: "left",
      type: "text",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      date: new Date(),
    },
    {
      position: "right",
      type: "text",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      date: new Date(),
    },
  ]);

  useEffect(() => {
    if (currentUser) {
      firebase
        .database()
        .ref("messages/allMessages")
        .orderByChild("uid")
        .equalTo(currentUser.uid)
        .on("value", (snapshot) => {
          let data = [];
          console.log(snapshot.val());
          for (let item in snapshot.val()) {
            let message = snapshot.val()[item];
            if (message.sentByAdmin === true) {
              message["position"] = "left";
            } else {
              message["position"] = "right";
            }
            data.push(message);
          }
          setMessages(data);
          //setRowData(data);
        });
    }
  }, [currentUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    const date = Date.now();
    firebase
      .database()
      .ref("messages/allMessages/" + currentUser.uid + date)
      .set(
        {
          date,
          uid: currentUser.uid,
          sentByAdmin: false,
          text: messageText,
          fullName: currentUser.displayName,
        },
        (error) => {
          if (error) {
            console.log("Error Occured");
          } else {
            firebase
              .database()
              .ref("messages/summary/" + currentUser.uid)
              .set(
                {
                  date,
                  uid: currentUser.uid,
                  fullName: currentUser.displayName,
                  lastMessage: messageText,
                  unread: true,
                  userEmail: currentUser.email,
                },
                (error) => {
                  if (error) {
                    console.log("Error Occured");
                  } else {
                    setMessageText("");
                  }
                }
              );
          }
        }
      );
  };
  return (
    <Paper elevation={5} className="chatBox__container">
      <Paper
        style={{ backgroundColor: "darkblue" }}
        className="chatBox__header"
      >
        <Typography style={{ color: "#fff" }} variant="subtitle1">
          Admin
        </Typography>
        <CloseIcon style={{ color: "#fff" }} onClick={() => togglePopUp()} />
      </Paper>
      <div className="chatBox__messageList__container">
        <MessageList
          className="message-list  chatBox__messageList"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={messages}
        />
        <form
          style={{
            display: "flex",
            paddingRight: "5px",
            backgroundColor: "#f8f8f8",
            border: "1px solid gray",
            width: "300px",
          }}
          onSubmit={(e) => sendMessage(e)}
        >
          <Input
            style={{
              display: "flex",
              flex: "1",
              backgroundColor: "#fff",
              fontSize: "15px",
              paddingLeft: "5px",
            }}
            id="standard-multiline-flexible"
            value={messageText}
            placeholder="Type here..."
            onChange={(e) => setMessageText(e.target.value)}
          />
          <SendIcon
            eleveation={3}
            color="primary"
            style={{ margin: "5px" }}
            text="Send"
            onClick={(e) => sendMessage(e)}
          />
        </form>
      </div>
    </Paper>
  );
};

const ChatIconButton = ({ togglePopUp }) => {
  return (
    <Paper
      elevation={5}
      style={{ borderRadius: "20px", backgroundColor: "#f8f8f8", zIndex: "50" }}
      className="chatIcon"
    >
      <ChatIcon
        color={"primary"}
        fontSize="large"
        onClick={() => togglePopUp()}
      />
    </Paper>
  );
};
