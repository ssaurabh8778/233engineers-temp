import React, { useState, useEffect } from "react";
import "fontsource-roboto";
import {
  Button,
  Card,
  Typography,
} from "@material-ui/core";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const News = () => {
  const location = useLocation();
  const { pathname } = location;
  const [slug, setSlug] = useState("");
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setSlug(pathname.substring(6));
  }, [reload]);

  return (
    <>
      {slug === "" ? (
        <NewsAll reload={reload} setReload={setReload} />
      ) : (
        <NewsArticle newsId={slug} reload={reload} setReload={setReload} />
      )}
    </>
  );
};

const NewsAll = ({ reload, setReload }) => {
  const [newsList, setNewsList] = useState([]);
  firebase
    .database()
    .ref("newsAndHighlights")
    .once("value")
    .then((snapshot) => {
      console.log(snapshot.val());
      let data = [];
      let newsItem = {};
      for (let item in snapshot.val()) {
        newsItem = { ...snapshot.val()[item], newsId: item };
        data.push(newsItem);
      }

      setNewsList(data);
    });
  return (
    <>
      <div className="keyProjects--card--container">
        {newsList.map((news) => (
          <Card className="keyProjects--card">
            <Typography style={{ marginLeft: "25px" }} variant="h6">
              {news.title}
            </Typography>

            <div className="keyProjects--card--insideContainer">
              <img
                className="projects--card--img"
                alt="Remy Sharp"
                src={news.imgUrl}
              />
              <Typography
                className="keyProjects--card--projectContent"
                variant="subtitle1"
              >
                {news.content}
              </Typography>
              <Link
                to={`/news/${news.newsId}`}
                onClick={() => setReload(!reload)}
              >
                <Button
                  style={{ alignSelf: "flex-end", marginBottom: "25px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    console.log(5);
                  }}
                >
                  Read More
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

const NewsArticle = ({ newsId, reload, setReload }) => {
  const [news, setNews] = useState({});
  firebase
    .database()
    .ref("newsAndHighlights/" + newsId)
    .once("value")
    .then((snapshot) => {
      console.log(snapshot.val());
      setNews(snapshot.val());
    });
  return (
    <>
      <div className="keyProjects--card--container">
        <Card className="overview--card">
          <Link to="/news" onClick={() => setReload(!reload)}>
            <Button
              variant="contained"
              style={{
                color: "#fff",
                backgroundColor: "black",
                marginLeft: "45px",
                marginBottom: "15px",
              }}
            >
              Go Back
            </Button>
          </Link>
          <Typography
            style={{ fontSize: "1.3rem", marginLeft: "45px" }}
            variant="h6"
          >
            <strong>{news.title}</strong>
          </Typography>
          <Typography
            style={{ fontSize: ".8rem", marginLeft: "45px" }}
            variant="h6"
          >
            {news.publishedOn}
          </Typography>
          <Typography
            style={{ fontSize: "1rem", marginLeft: "45px" }}
            variant="h6"
          >
            <strong>Author: {news.author}</strong>
          </Typography>

          <div className="overview--card--insideContainer">
            <Typography
              style={{ fontSize: "1.3rem", margin: "0 25px" }}
              className="overview--card--projectContent"
              variant="subtitle1"
              component="p"
            >
              {news.content}
            </Typography>
            <img
              className="overview--card--img"
              alt="Remy Sharp"
              src={news.imgUrl}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default News;
