import React, { useEffect, useState } from "react";
import AD1DetailsOfUsers from "./partitials/AD1_DetailsOfUsers";
import AD2Projects from "./partitials/AD2_Projects";
import AD3NewsAndHighlights from "./partitials/AD3_NewsAndHighlights";
import AD4Leaders from "./partitials/AD4_Leaders";
import { Paper, Grid, Typography, Card } from "@material-ui/core";
import LineStyleIcon from "@material-ui/icons/LineStyle";
import ForumIcon from "@material-ui/icons/Forum";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import "./AdminDashboard.css";
import AD5Clients from "./partitials/AD5_Clients";

const AdminDashboard=() => {
  const [userData, setUserData] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [reload, setReload] = useState(true);
  useEffect(() => {
    //fetching details of all the users from database
    firebase
      .database()
      .ref("users/")
      .get()
      .then((snapshot) => {
        console.log(snapshot.val());
        let data = [];
        for (let item in snapshot.val()) {
          data.push(snapshot.val()[item]);
        }
        setUserData(data);
        setTotalUsers(data.length);
      });
  }, [reload]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .database()
          .ref("users/" + user.uid + "/isAdmin")
          .get()
          .then((snapshot) => {
            if (snapshot.val() === true) {
            } else {
              if (user.email === "bizzibrain@gmail.com") {
              } else {
                window.location.replace("/");
              }
            }
          });
      } else {
        // No user is signed in.
        window.location.replace("/");
      }
    });
  }, []);

  // const addDataToFirebase = (e) => {
  //   e.preventDefault();
  //   firebase
  //     .database()
  //     .ref("websiteContent/")
  //     .set({
  //       aboutUs: {
  //         about1_whoWeAre_card1: "Actually, it's not about us...",
  //         about1_whoWeAre_card2:
  //           "It's about putting smiles in the face of 'Ghananians' through our innovative projects...",
  //         about1_whoWeAre_card3: "123",
  //         about2_getInTouch_card1:
  //           "With a unique combination of originally and creative thinking from diverse experts, we will partner with you every step of the way to deliver excellent outcome on your project.",
  //         about2_getInTouch_card2:
  //           "We take the initiative to release great minds on challenging problems that we come across in Ghana and make an exciting project out of it that eventually improves livelihoods. No project is too small nor too big for us to start or help on.",
  //         about2_getInTouch_card3:
  //           "We have experienced engineers and scientists all over the globe seeking to provide mentorship to new and aspiring Ghanaian engineers and scientists.",
  //         about3_mission_content:
  //           "We envision a Ghana and Africa where Hi-Tech and quality engineered products with high degree of confidence are seen in every facet of society.",
  //         about3_mission_heading:
  //           "To develop a Ghana-focused engineering standards and codes for all the applicable sectors of the Ghanaian Society.",
  //         about3_vision_content:
  //           "To help build a better world by contributing to ongoing African renaissance through solving one engineering challenge at a time. Solving these challenges in Ghana will be done through both conventional and unconventional scientific and engineering apperoached",
  //         about3_vision_heading: "Building for better future",
  //       },
  //       home: {
  //         home1_aboutUs_card1: "home1_aboutUs_card1_updated",
  //         home1_aboutUs_card2: "home1_aboutUs_card2_123",
  //         home2_whyChooseUs_card1:
  //           "Our priority is to help turn your dream project into a reality irrespective of funding availability or lack thereof",
  //         home2_whyChooseUs_card2:
  //           "Our priority is to help turn your dream project into a reality irrespective of funding availability or lack thereof",
  //         home2_whyChooseUs_card3:
  //           "80% of any profit we make goes towards our philanthropy and charity projects.",
  //       },
  //       keyPeople: {
  //         1620489051675: {
  //           email: "david@gmail.com",
  //           imgUrl: "https://picsum.photos/500",
  //           name: "David",
  //           phone: "1564464",
  //           position: "CTO",
  //           ref: 1620489051675,
  //           sector: "Energy & Resources",
  //         },
  //         1620489133894: {
  //           email: "elon@gmail.com",
  //           imgUrl: "https://picsum.photos/501",
  //           name: "Elon",
  //           phone: "564646546",
  //           position: "CEO",
  //           ref: 1620489133894,
  //           sector: "Energy & Resources",
  //         },
  //         1620489159455: {
  //           email: "jeff@gmail.com",
  //           imgUrl: "https://picsum.photos/502",
  //           name: "Jeff",
  //           phone: "4544654",
  //           position: "CEO",
  //           ref: 1620489159455,
  //           sector: "Project Management",
  //         },
  //       },
  //       keyProjects: {
  //         1620495902169: {
  //           content:
  //             "In response to the health risks and shutdowns associated with the COVID-19 pandemic, site inspections and bid walks are becoming increasingly difficult for industries that require employees, customers, or prospective bidders on site. Under regular circumstances, bid walks enable contractors to physically survey the site, gather site information, ask questions, and assess the scope and size of a project. When groups can no longer be in the same physical space, live virtual site inspections may be the answer.",
  //           imgUrl: "https://picsum.photos/1000",
  //           ref: 1620495902169,
  //           sector: "Energy & Resources",
  //           title: "Remote site inspection to smooth bidding process",
  //         },
  //         1620834955077: {
  //           content:
  //             "Government-owned project delivery company, Otakaro, appointed GHD to design the Canterbury Earthquake National Memorial, in remembrance of those who lost their lives during the 2010/2011 earthquakes.",
  //           imgUrl: "https://picsum.photos/500",
  //           ref: 1620834955077,
  //           sector: "Energy & Resources",
  //           title:
  //             "A number of earthquakes in 2010 and 2011 have devastated the New Zealand city of Christchurch.",
  //         },
  //       },
  //       overview: {
  //         1620496337703: {
  //           content:
  //             "GHD Digital was born with a single vision, to help our clients transform their business, embrace the future and change communities for good. With a geographic footprint spanning across Australia, APAC, North America, the UK and the Middle East, our team of data scientists, design thinkers, immersive digital consultants, project managers and innovators, build on the expertise of GHD’s 10,000 people to help clients reimagine their digital future. People-first and outcomes obsessed, we combine industry insights with digital mindsets to maximise opportunities for growth and success. From transforming company culture to delivering real-time actionable insights, GHD Digital has the collective skills to help drive companies forward in the digital age.",
  //           heading:
  //             "We are living in transformative times. Technology is transforming everything around us; the way we work, think and live. Our clients’ success depends on their ability to continually adapt and change, to stay ahead and remain competitive.",
  //           imgUrl: "https://picsum.photos/1000",
  //           ref: 1620496337703,
  //           sector: "Energy & Resources",
  //           topImgUrl: "https://picsum.photos/1005",
  //         },
  //         1620835104766: {
  //           content:
  //             "GHDWoodhead works with communities and businesses in an holistic and integrated approach, bringing together design, planning and engineering disciplines to be responsive to our clients' needs and create outcomes that are technically elegant, intelligent and efficient.  We create inspirational architecture, landscapes, townscapes and places that simplify project complexity and provide our clients with responsive, evidenced-based design solutions.  Our collaborative approach integrates multiple stakeholders and complex interrelationships. Our global network of architects, designers, planners, engineers and environmental scientists share the technical knowledge and the latest digital tools and resources to bring imaginative thinking to solve clients' challenges.  Our services extend across private and public sectors and all scale of projects, from master planned communities through to intimate and engaging interior spaces.  Our design practice is ranked amongst the leading 100 global architectural firms with more than 370 design professionals across 20 studios, bringing global skills and experience to local projects.",
  //           heading:
  //             "Creating great cities and places to live and work requires an ability to respond to the complexity of urban, regional, rural and remote development.",
  //           imgUrl: "https://picsum.photos/1035",
  //           ref: 1620835104766,
  //           sector: "Biomedical Engineering",
  //           topImgUrl: "https://picsum.photos/1025",
  //         },
  //       },
  //     });
  // };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15px",
      }}
    >
      <Grid style={{ maxWidth: "1280px" }} container spacing={3}>
        <Grid item xs={12} container spacing={3}>
          <Grid item sm={4} xs={12}>
            <Paper className="ad--totatUsers--paper">
              <Typography variant="h6"> Total No of Users</Typography>
              <Card
                style={{ backgroundColor: "#f8f8f8" }}
                className="ad--totatUsers--card"
                elevation={3}
              >
                <Typography variant="h3">{totalUsers}</Typography>
              </Card>
            </Paper>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Paper className="ad--totatUsers--paper">
              <Typography variant="h6"> Edit Website Content</Typography>
              <Link to="/edit-website-content">
                <Card
                  style={{ backgroundColor: "#f8f8f8" }}
                  className="ad--totatUsers--card"
                  elevation={3}
                >
                  <LineStyleIcon
                    style={{ fontSize: "65px" }}
                    color="secondary"
                    className="ad--editWebsite--icon"
                  />
                </Card>
              </Link>
            </Paper>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Paper className="ad--totatUsers--paper">
              <Typography variant="h6"> Messages</Typography>
              <Link to="/messenger">
                <Card
                  style={{ backgroundColor: "#f8f8f8" }}
                  className="ad--totatUsers--card"
                  elevation={3}
                >
                  <ForumIcon
                    style={{ fontSize: "65px" }}
                    color="primary"
                    className="ad--editWebsite--icon"
                  />
                </Card>
              </Link>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AD1DetailsOfUsers
            rowData={userData}
            reload={reload}
            setReload={setReload}
          />
        </Grid>
        <Grid item xs={12}>
          <AD2Projects />
        </Grid>
        <Grid item xs={12}>
          <AD3NewsAndHighlights />
        </Grid>
        <Grid item xs={12}>
          <AD4Leaders />
        </Grid>
        <Grid item xs={12}>
          <AD5Clients />
        </Grid>
      </Grid>
    </div>
  );
};
export default AdminDashboard;