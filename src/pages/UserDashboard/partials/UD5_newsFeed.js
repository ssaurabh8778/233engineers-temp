import React, { useEffect, useState } from "react";
import "./UD5_newsFeed.css";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Card, Typography, Paper } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
import firebase from "../../../firebase";

const UD5_newsFeed = () => {
  return (
    <Paper className="ud5--container">
      <h3>News & Highlights</h3>
      <HorizontalNewsScroll />
    </Paper>
  );
};

// list of items

const Menu = (list) =>
  list.map((listItem) => {
    return (
      <Link to={`/news/${listItem.newsId}`} style={{ textDecoration: "none" }}>
        <Card
          elevation={3}
          className="ud5__cards__item__link"
          to={listItem.path}
        >
          <img
            src={listItem.imgUrl}
            alt="Travel"
            className="ud5__cards__item__img"
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

              overflowX: "hidden",
            }}
            color="textSecondary"
            variant="subtitle2"
            noWrap={false}
          >
            {listItem.content}
          </Typography>
        </Card>
      </Link>
    );
  });

const HorizontalNewsScroll = () => {
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
    <div className="App">
      <ScrollMenu
        scrollBy={1}
        dragging={false}
        wheel={false}
        data={menu}
        arrowLeft={<ArrowBackIos />}
        arrowRight={<ArrowForwardIos />}
      />
    </div>
  );
};
export default UD5_newsFeed;