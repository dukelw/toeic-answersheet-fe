import React from "react";
import { AppBar, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1976d2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#ffffff",
  fontFamily: "roboto",
}));

function Footer() {
  return (
    <AppBar
      sx={{
        position: "static",
        bottom: 0,
        left: 0,
        width: "100%",
        top: "auto",
        marginTop: "40px",
      }}
    >
      <Box sx={{ bgcolor: "#1976d2", pt: 5, pb: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid xs={12} md={5} lg={4}>
              <Item>
                This website is non-profit and created solely for educational
                purposes to help learners improve their English skills.
              </Item>
            </Grid>
            <Grid container xs={12} md={7} lg={8} spacing={4}>
              <Grid xs={6} lg={6}>
                <Item>
                  <Box
                    id="category-b"
                    sx={{ fontSize: "12px", textTransform: "uppercase" }}
                  >
                    Tutorial
                  </Box>
                  <Box
                    component="ul"
                    aria-labelledby="category-b"
                    sx={{ pl: 0, display: "flex", flexDirection: "column" }}
                  >
                    <Link className={cx("link")}>User guide</Link>
                    <Link className={cx("link")}>Tips and tricks</Link>
                    <Link className={cx("link")}>Test format</Link>
                  </Box>
                </Item>
              </Grid>
              <Grid xs={6} lg={6}>
                <Item>
                  <Box
                    id="category-c"
                    sx={{ fontSize: "12px", textTransform: "uppercase" }}
                  >
                    Other information
                  </Box>
                  <Box
                    component="ul"
                    aria-labelledby="category-c"
                    sx={{ pl: 0, display: "flex", flexDirection: "column" }}
                  >
                    <Link className={cx("link")}>
                      Address: Ho Chi Minh City
                    </Link>
                    <Link className={cx("link")}>Version: 1.0</Link>
                    <Link
                      to="mailto:dukelewis@gmail.com"
                      className={cx("link")}
                    >
                      Contact me at: dukelewis@gmail.com
                    </Link>
                  </Box>
                </Item>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              container
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: "column", sm: "row" }}
              sx={{ fontSize: "12px", mt: 2 }}
            >
              <Grid sx={{ order: { xs: 2, sm: 1 } }}>
                <Item>© Copyright YBM, all rights reserved</Item>
              </Grid>
              <Grid
                container
                columnSpacing={1}
                sx={{ order: { xs: 1, sm: 2 } }}
              >
                <Grid>
                  <Link className={cx("link")}>
                    <FacebookIcon />
                  </Link>
                </Grid>
                <Grid>
                  <Link className={cx("link")}>
                    <AlternateEmailIcon />
                  </Link>
                </Grid>
                <Grid>
                  <Link className={cx("link")}>
                    <LinkedInIcon />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppBar>
  );
}

export default Footer;
