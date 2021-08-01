import React, { useEffect, useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Card, Typography, Paper } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import firebase from "../../../firebase";
import "./Home4.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Paper elevation="3" className="home4--container">
      <div className="home4--conatiner--header">
        <h1>News & Highlights</h1>
        <Link to="/news">
          <button className="home4--btn">Explore More</button>
        </Link>
      </div>
      <HorizontalNewsScroll />
    </Paper>
  );
};

// list of items
const list = [
  { src: "images/img-3.jpg", path: "/services", text: "1" },
  { src: "images/img-4.jpg", path: "/services", text: "2" },
  { src: "images/img-5.jpg", path: "/services", text: "3" },
  { src: "images/img-6.jpg", path: "/services", text: "4" },
  { src: "images/img-7.jpg", path: "/services", text: "5" },
  { src: "images/img-8.jpg", path: "/services", text: "6" },
  { src: "images/img-9.jpg", path: "/services", text: "7" },
];

export const Menu = (list) =>
  list.map((listItem) => {
    return (
      <Link to={`/news/${listItem.newsId}`} style={{ textDecoration: "none" }}>
        <Card
          elevation="5"
          className="home4__cards__item__link"
          to={listItem.path}
        >
          <img
            src={listItem.imgUrl}
            alt="Travel Image"
            className="home4__cards__item__img"
          />
          <Typography
            style={{
              fontSize: "13px",
              alignSelf: "flex-start",
              margin: "0 10px",
            }}
            color="textSecondary"
            variant="subtitle2"
          >
            {listItem.publishedOn}
          </Typography>

          <Typography
            style={{
              alignSelf: "flex-start",
              margin: "0 10px",
              width: "100%",
              overflowX: "hidden",
            }}
            variant="subtitle1"
          >
            {listItem.title}
          </Typography>
          <Typography
            style={{
              fontSize: "13px",
              alignSelf: "flex-start",
              margin: "0 10px",
              width: "100%",
              overflowX: "hidden",
            }}
            color="textSecondary"
            variant="subtitle2"
            noWrap={false}
            multine
            line={2}
          >
            {listItem.content}
          </Typography>
        </Card>
      </Link>
    );
  });

export const HorizontalNewsScroll = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("newsAndHighlights/")
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
      scrollBy={3}
      dragging={true}
      inertiaScrolling={true}
      wheel={false}
      data={menu}
      arrowLeft={
        <ArrowBackIos
          style={{
            height: "250px",
            width: "25px",
          }}
        />
      }
      arrowRight={
        <ArrowForwardIos
          style={{
            height: "250px",
            width: "25px",
          }}
        />
      }
    />
  );
};
