import React, { useState, useEffect } from "react";
import "./ServicePage.css";
import "fontsource-roboto";
import {
  Button,
  Card,
  Avatar,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import firebase from "../../firebase";
import { ContactlessOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default (props) => {
  const [showOverview, setShowOverview] = useState(true);
  const [showKeyProjects, setShowKeyProjects] = useState(false);
  const [showKeyPeople, setShowKeyPeople] = useState(false);
  const [keyPeopleList, setKeyPeopleList] = useState([]);
  const [keyProjectsList, setKeyProjectsList] = useState([]);
  const [overViewData, setOverViewData] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  let slug = pathname.substring(13);

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/keyPeople")
      .orderByChild("sector")
      .equalTo(slug)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }
        setKeyPeopleList(data);
      });
    firebase
      .database()
      .ref("websiteContent/keyProjects")
      .orderByChild("sector")
      .equalTo(slug)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }

        setKeyProjectsList(data);
      });
    firebase
      .database()
      .ref("websiteContent/overview")
      .orderByChild("sector")
      .equalTo(slug)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }

        setOverViewData(data);
      });
  }, []);

  return (
    <div className="sectorPage--container">
      <div
        className="sectorPage--img"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${overViewData[0]?.topImgUrl})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "3.5rem",
            maxWidth: "65vw",
            marginTop: "75px",
          }}
        >
          {slug}
        </h1>
      </div>
      {slug === "Philanthropy Projects" ? (
        <div
          style={{
            position: "sticky",
            marginTop: "-65px",
            marginBottom: "30px",
          }}
        >
          <Link to="/support-philantropy">
            <Button size="large" variant="contained" color="secondary">
              Support Our Philanthropy Projects
            </Button>
          </Link>
        </div>
      ) : (
        <></>
      )}

      <div className="sectorPage--insideContainer">
        <Toolbar
          elevation={5}
          style={{ justifyContent: "center", backgroundColor: "black" }}
        >
          <Button
            onClick={() => {
              setShowOverview(true);
              setShowKeyPeople(false);
              setShowKeyProjects(false);
            }}
            variant="contained"
            style={
              showOverview
                ? { margin: "10px", backgroundColor: "white" }
                : { margin: "10px", backgroundColor: "lightgray" }
            }
          >
            Overview
          </Button>
          <Button
            onClick={() => {
              setShowOverview(false);
              setShowKeyPeople(false);
              setShowKeyProjects(true);
            }}
            variant="contained"
            style={
              showKeyProjects
                ? { margin: "10px", backgroundColor: "white" }
                : { margin: "10px", backgroundColor: "lightgray" }
            }
          >
            Key Projects
          </Button>
          <Button
            onClick={() => {
              setShowOverview(false);
              setShowKeyPeople(true);
              setShowKeyProjects(false);
            }}
            variant="contained"
            style={
              showKeyPeople
                ? { margin: "10px", backgroundColor: "white" }
                : { margin: "10px", backgroundColor: "lightgray" }
            }
          >
            Key People
          </Button>
        </Toolbar>
        {showOverview && <OverView overViewData={overViewData} />}
        {showKeyProjects && <KeyProjects keyProjectsList={keyProjectsList} />}
        {showKeyPeople && <KeyPeople keyPeopleList={keyPeopleList} />}
      </div>
    </div>
  );
};

const OverView = ({ overViewData }) => {
  return (
    <>
      <div className="overview--card--container">
        {overViewData.map((project) => (
          <Card className="overview--card">
            <Typography
              style={{ fontSize: "1.3rem", marginLeft: "25px" }}
              variant="h6"
            >
              <strong>{project.heading}</strong>
            </Typography>

            <div className="overview--card--insideContainer">
              <Typography
                style={{ fontSize: "1.3rem", margin: "0 25px" }}
                className="overview--card--projectContent"
                variant="subtitle1"
                component="p"
              >
                {project.content}
              </Typography>
              <img
                className="overview--card--img"
                alt="Remy Sharp"
                src={project.imgUrl}
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

const KeyPeople = ({ keyPeopleList }) => {
  return (
    <>
      <div className="keyPeople--card--container">
        {keyPeopleList.map((person) => (
          <Card className="keyPeople--card">
            <Avatar
              className="keyPeople--card--avatar"
              alt="Remy Sharp"
              src={person.imgUrl}
            />
            <Card
              style={{ backgroundColor: "#f8f8f8" }}
              elevation={3}
              className="keyPeople--card--info"
            >
              <Typography variant="h5">{person.name}</Typography>
              <Typography variant="subtitle1">{person.position}</Typography>
              <Typography variant="h6">{person.phone}</Typography>
              <Typography variant="h6">{person.email}</Typography>
            </Card>
          </Card>
        ))}
      </div>
    </>
  );
};

const KeyProjects = ({ keyProjectsList }) => {
  return (
    <>
      <div className="keyProjects--card--container">
        {keyProjectsList.map((project) => (
          <Card className="keyProjects--card">
            <Typography style={{ marginLeft: "25px" }} variant="h6">
              {project.title}
            </Typography>

            <div className="keyProjects--card--insideContainer">
              <img
                className="projects--card--img"
                alt="Remy Sharp"
                src={project.imgUrl}
              />
              <Typography
                className="keyProjects--card--projectContent"
                variant="subtitle1"
              >
                {project.content}
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

{
  /*<OverView />
      <KeyPeople />
      <Projects />*/
}

const projectsData = [{}, {}, {}, {}, {}, {}, {}];
