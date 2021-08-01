import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import UD1_UserProfile from "./partials/UD1_UserProfile";
import UD2_projectEarnings from "./partials/UD2_projectEarnings";
import UD3_projectInvites from "./partials/UD3_projectInvites";
import UD4_projectsFeed from "./partials/UD4_projectsFeed";
import UD5_newsFeed from "./partials/UD5_newsFeed";
import UD6_CHAT_POPUP from "./partials/UD6_CHAT_POPUP";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function FullWidthGrid() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Grid style={{ maxWidth: "1280px" }} container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <UD1_UserProfile />
            </Paper>
          </Grid>
          <Grid item containe xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Earnings & Requests</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <Paper
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "35px",
                      margin: "5px",
                      height: "330px",
                      width: "40%",
                      minWidth: "350px",
                    }}
                  >
                    <UD2_projectEarnings />
                  </Paper>

                  <Paper
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "35px",
                      margin: "5px",
                      height: "330px",
                      width: "40%",
                      minWidth: "350px",
                    }}
                  >
                    <UD3_projectInvites />
                  </Paper>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <UD4_projectsFeed />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <UD5_newsFeed />
            </Paper>
          </Grid>
        </Grid>
        <UD6_CHAT_POPUP />
      </div>
    </>
  );
}
