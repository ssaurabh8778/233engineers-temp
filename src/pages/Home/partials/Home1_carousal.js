import React from "react";
import "./Home1_carousal.css";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Button } from "@material-ui/core";

const Home1_carousal = ({ imageLinks }) => {
  return (
    <>
      <Carousel className="home1" showThumbs={false} autoPlay infiniteLoop>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${imageLinks.home1_carousel_image_1})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
          }}
          className="home1--container"
        >
          <div className="home1--insideContainer">
            <h1 className="c1-h1">
              Join Over 300 Ghanaian Engineers & Scientists
            </h1>
            <div className="home1--button1--div">
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  className="home1--button1"
                >
                  <h2>Join Us Now</h2>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${imageLinks.home1_carousel_image_2})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
          }}
          className="home1--container"
        >
          <div className="home1--insideContainer">
            <h1 className="c1-h1">An Opportunity to impact lives in Ghana.</h1>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${imageLinks.home1_carousel_image_3})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
          }}
          className="home1--container"
        >
          <div className="home1--insideContainer">
            <h1 className="c1-h1">
              Support our philanthropy work either with your time and skills or
              cash donation or both.
            </h1>
            <div className="home1--button1--div">
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  className="home1--button1"
                >
                  <h2>Support Our Philanthropy Projects</h2>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
};
export default Home1_carousal;