import React, { useState, useEffect } from "react";
import { ChatList, MessageList, Button } from "react-chat-elements";
import { Input, TextField } from "@material-ui/core";
import "react-chat-elements/dist/main.css";
import "./Messenger.css";
import { Popup } from "react-chat-elements";
//import { chatListData, messages } from "./messageData";
import firebase from "../../firebase";
import SendIcon from "@material-ui/icons/Send";

function Messenger() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [chatListData, setChatListData] = useState([]);
  const [messages, setMessages] = useState([]);
  console.log(Date.now());
  useEffect(() => {
    firebase
      .database()
      .ref("messages/summary")
      .orderByChild("date")
      .on("value", (snapshot) => {
        firebase
          .database()
          .ref("users/")
          .get()
          .then((allUsers) => {
            console.log("this is", allUsers.val());
            let data = [];
            console.log(snapshot.val());
            for (let item in snapshot.val()) {
              let chatItem = snapshot.val()[item];
              console.log(chatItem.uid);

              chatItem["title"] = allUsers.val()[chatItem.uid]?.fullName;
              chatItem["subtitle"] = chatItem["lastMessage"];
              chatItem["avatar"] = allUsers.val()[chatItem.uid]?.profilePicLink;
              data.push(chatItem);
            }
            console.log(data);
            function compare(a, b) {
              if (a.date > b.date) {
                return -1;
              }
              if (a.date < b.date) {
                return 1;
              }
              return 0;
            }

            data.sort(compare);

            setChatListData(data);
            fetchMessages(data[0], false);
          });

        //setRowData(data);
      });
  }, []);

  const fetchMessages = (chatItem, markRead) => {
    firebase
      .database()
      .ref("messages/allMessages")
      .orderByChild("uid")
      .equalTo(selectedUserId)
      .off();

    console.log(chatItem);
    firebase
      .database()
      .ref("messages/allMessages")
      .orderByChild("uid")
      .equalTo(chatItem.uid)
      .on("value", (snapshot) => {
        setSelectedUserId(chatItem.uid);
        setSelectedUserName(chatItem.fullName);
        setSelectedUserEmail(chatItem.userEmail);
        let data = [];
        console.log(snapshot.val());
        for (let item in snapshot.val()) {
          let message = snapshot.val()[item];
          if (message.sentByAdmin === true) {
            message["position"] = "right";
          }
          data.push(message);
        }
        console.log(data);
        setMessages(data);
        if (markRead === true && chatItem.unread === true) {
          firebase
            .database()
            .ref("messages/summary/" + chatItem.uid + "/unread")
            .set(false, (error) => {
              if (error) {
                alert("Error Occured");
              } else {
              }
            });
        }

        //setRowData(data);
      });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const date = Date.now();
    firebase
      .database()
      .ref("messages/allMessages/" + selectedUserId + date)
      .set(
        {
          date,
          uid: selectedUserId,
          sentByAdmin: true,
          text: messageText,
          fullName: selectedUserName,
          userEmail: selectedUserEmail,
        },
        (error) => {
          if (error) {
            console.log("Error Occured");
          } else {
            setMessageText("");
          }
        }
      );
  };

  return (
    <div>
      <div className="messenger__container">
        <div className="messenger__chalList__container">
          <ChatList
            className="chat-list"
            dataSource={chatListData}
            onClick={(chatItem) => fetchMessages(chatItem, true)}
          />
        </div>
        <div className="messenger__messageList__container">
          <MessageList
            className="message-list  messenger__messageList"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={messages}
          />
          <div>
            <form
              style={{
                display: "flex",
                paddingRight: "15px",
                backgroundColor: "#f8f8f8",
                border: "1px solid gray",
              }}
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
                multiline
                rowsMax={4}
                placeholder="Type here..."
                onChange={(e) => setMessageText(e.target.value)}
              />
              <SendIcon
                color="primary"
                style={{ margin: "5px" }}
                fontSize={"large"}
                text="Send"
                onClick={(e) => sendMessage(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
