import React from "react";
import "./ServicesCard.css";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import zIndex from "@material-ui/core/styles/zIndex";

export default (props) => {
  return (
    <Link
      to={`servicepage/${props.sectorName}`}
      style={{ textDecoration: "none" }}
    >
      <Paper elevation={5} className="servicesCard--cardContainer">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${props.src})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          alt="Travel Image"
          className="servicesCard--cardImage"
        ></div>
        <h1 style={{ textDecoration: "none", textDecorationLine: "none" }}>
          {props.sectorName}
        </h1>
      </Paper>
    </Link>
  );
};
