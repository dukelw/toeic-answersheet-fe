import React from "react";
import {
  Container,
  useMediaQuery,
  createTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames/bind";
import styles from "./Guide.module.scss";
import GuideSection from "../GuideSection";
import CONSTANTS from "../../constants";

const cx = classNames.bind(styles);

function Guide() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const { suggestion, stepOne, stepTwo, stepThree } = CONSTANTS;

  return (
    <Container
      sx={{
        width: isMobile ? "30%" : isTablet ? "72%" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>HOW TO USE THE WEBSITE?</h1>

      <Accordion sx={{ width: isMobile ? "100%" : "80%", mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Suggestion: Our website can be used without an account, but if you
            want the best experience, please log in before doing the tests.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can Sign up for new account, Sign in when already have one.
            Moreover, you can change your information which will be displayed in
            the ranking list. Here are the instructions for.
          </Typography>
          {suggestion.map((step, index) => (
            <GuideSection
              key={index}
              image={step.image}
              content={step.content}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: isMobile ? "100%" : "80%", mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Step 1: Download Document</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Here you can find the document download links. Ensure you have the
            necessary permissions to download the documents.
          </Typography>
          {stepOne.map((step, index) => (
            <GuideSection
              key={index}
              image={step.image}
              content={step.content}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: isMobile ? "100%" : "80%", mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Step 2: Do the Test</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Follow the instructions provided to complete the test. Ensure you
            submit your answers before the deadline.
          </Typography>
          {stepTwo.map((step, index) => (
            <GuideSection
              key={index}
              image={step.image}
              content={step.content}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: isMobile ? "100%" : "80%", mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Step 3: Other Functions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Explore additional features such as reviewing your past tests, and
            checking the leaderboard.
          </Typography>
          {stepThree.map((step, index) => (
            <GuideSection
              key={index}
              image={step.image}
              content={step.content}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Guide;
