import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Dialog } from "@material-ui/core";
import "./NavBar.css";
import Dropdown from "./Dropdown";
import {
  AboutMenuItems,
  SectorsMenuItems,
  CareersMenuItems,
} from "./MenuItems";
import { Avatar, Card } from "@material-ui/core";
import firebase from "../firebase";
import { useAuth } from "../AuthContext";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [sectorsDropdown, setSectorsDropdown] = useState(false);
  const [careersDropdown, setCareersDropdown] = useState(false);
  const [userCard, setUserCard] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { currentUser } = useAuth();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = (method) => {
    if (window.innerWidth < 960) {
      method(false);
    } else {
      method(true);
    }
  };

  const onMouseLeave = (method) => {
    if (window.innerWidth < 960) {
      method(false);
    } else {
      method(false);
    }
  };

  useEffect(() => {
    console.log("this is working");
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid)
        .get()
        .then((snapshot) => {
          console.log(snapshot.val());
          for (let i in snapshot.val()) {
            if (snapshot.val()[i] === "") {
              break;
            }
          }
          setUserDetails({
            fullName: snapshot.val()?.fullName ? snapshot.val().fullName : "",
            email: snapshot.val()?.email ? snapshot.val().email : "",
            profilePicLink: snapshot.val()?.profilePicLink
              ? snapshot.val().profilePicLink
              : "",
          });
        });
    }
  }, [currentUser]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img
              style={{
                width: "35px",
                height: "35px",
                margin: "5px",
                backgroundColor: "#fff",
              }}
              src="/233_images/logo.svg"
              alt=""
            />
            <h4 className="navbar__logo__text">233 ENGINEERS</h4>
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>

            <li
              className="nav-item"
              onMouseEnter={() => onMouseEnter(setSectorsDropdown)}
              onMouseLeave={() => onMouseLeave(setSectorsDropdown)}
            >
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sectors/Project
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Careers
              </Link>
            </li>
          </ul>
          <div className="nav--item--userIcon">
            {!currentUser ? (
              <Button
                style={{
                  alignSelf: "center",
                  justifySelf: "center",
                  margin: "10px",
                }}
                onClick={() => (window.location = "/log-in")}
                variant="contained"
                color="primary"
              >
                SIGN IN
              </Button>
            ) : (
              <div
                onClick={(userCard) => setUserCard(true)}
                style={{
                  position: "relative",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
              >
                <Avatar src={userDetails.profilePicLink} />
              </div>
            )}
          </div>
        </div>
        <UserCard
          currentUser={currentUser}
          userCard={userCard}
          method={setUserCard}
          userDetails={userDetails}
        />
      </nav>
    </>
  );
}

const UserCard = (props) => {
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={props.userCard}>
      <div className="userCard--1">
        <Link to="/user-dashboard" onClick={() => props.method(false)}>
          <Avatar src={props.userDetails.profilePicLink} />
        </Link>
        <Typography variant="h6"> {props.userDetails.fullName}</Typography>
        <Typography variant="subtitle1"> {props.userDetails.email}</Typography>
        <div>
          <Button
            onClick={() => {
              firebase.auth().signOut();
              window.location = "/home";
            }}
            variant="contained"
            color="secondary"
          >
            Sign Out
          </Button>
          <Button
            onClick={() => {
              props.method(false);
            }}
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "black" }}
          >
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
