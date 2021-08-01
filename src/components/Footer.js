import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
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
              233 ENGINEERS
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "15px",
            }}
          >
            <a
              href="mailto:admin@233engineer.com"
              style={{ textDecoration: "none" }}
            >
              <p style={{ color: "#fff" }}>admin@233engineer.com</p>
            </a>

            <p style={{ color: "#fff" }}>233ENGINEER © 2021</p>
          </div>
          <div className="social-icon">
            <Link
              className="social-icon-link facebook"
              onClick={() =>
                window.location.replace(
                  "https://www.facebook.com/114030513686983/posts/114061937017174/k"
                )
              }
              targets="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              onClick={() =>
                window.location.replace(
                  "https://www.instagram.com/p/COPsgjkr-sm/?utm_medium=copy_link"
                )
              }
              targets="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              targets="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              onClick={() =>
                window.location.replace(
                  "https://twitter.com/TheGhanaianEng1/status/1274213396318126080?s=19"
                )
              }
              targets="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link linkedin"
              to="/"
              targets="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
