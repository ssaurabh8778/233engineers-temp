import React, { useState, useEffect } from "react";
import "./About4_Leadership.css";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Card, Typography, Paper } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import firebase from "../../../firebase";

export default () => {
  return (
    <>
      <Paper className="about4--container">
        <h1>Leadership</h1>
        <HorizontalNewsScroll objects={"leaders"} />
      </Paper>
      <Paper className="about4--container">
        <h1>Clients</h1>
        <HorizontalNewsScroll objects={"clients"} />
      </Paper>
    </>
  );
};

// list of items
const list = [
  {
    imgSrc: "233_images/phil.png",
    path: "/services",
    name: "Philip Fosu",
    position: "Founder & CEO",
    otherDetails: "Formar Process Engineer, GHD Inc",
    location: "Irvine, California",
    quote:
      "Look for what need doing and not the credit and praise to be gained from doing it...",
  },
  {
    imgSrc: "233_images/phil.png",
    path: "/services",
    name: "Philip Fosu",
    position: "Founder & CEO",
    otherDetails: "Formar Process Engineer, GHD Inc",
    location: "Irvine, California",
    quote:
      "Look for what need doing and not the credit and praise to be gained from doing it...",
  },
  {
    imgSrc: "233_images/phil.png",
    path: "/services",
    name: "Philip Fosu",
    position: "Founder & CEO",
    otherDetails: "Formar Process Engineer, GHD Inc",
    location: "Irvine, California",
    quote:
      "Look for what need doing and not the credit and praise to be gained from doing it...",
  },
];

const MenuItem = (props) => {
  const { quote, imgUrl, name, position, otherDetails, location } =
    props.leader;
  return (
    <Card elevation="3" className="about4__cards__item__link">
      <img
        src={imgUrl}
        alt="Travel Image"
        className="about4__cards__item__img"
      />
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "65%",
        }}
        elevation="3"
      >
        <Typography color="primary" variant="h6">
          {name}
        </Typography>
        <Typography variant="subtitle1">{position}</Typography>
        <Typography variant="subtitle1">{otherDetails}</Typography>
        <Typography variant="subtitle1">{location}</Typography>
      </Card>

      <Typography className="about4--leaderQuote" variant="h6">
        "{quote}"
      </Typography>
    </Card>
  );
};

export const Menu = (list) =>
  list.map((leader) => {
    return <MenuItem leader={leader} />;
  });

export const HorizontalNewsScroll = ({ objects }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/" + objects)
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        let newsItem = {};
        for (let item in snapshot.val()) {
          newsItem = { ...snapshot.val()[item], newsId: item };
          data.push(newsItem);
        }
        setList(data);
      });
  }, []);
  const menu = Menu(list);
  return (
    <ScrollMenu
      scrollBy={1}
      dragging={true}
      inertiaScrolling={true}
      wheel={false}
      data={menu}
      arrowLeft={<ArrowBackIos />}
      arrowRight={<ArrowForwardIos />}
    />
  );
};
