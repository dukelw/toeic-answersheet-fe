import React, { useEffect, useState } from "react";
import {
  Avatar,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  IconButton,
  Button,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import {
  findUser,
  getHighestOfUser,
  getHistoryOfUser,
  updateUser,
  uploadImage,
} from "../../redux/apiRequest";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "/path/to/avatar.jpg",
    phone: "",
    gender: "male",
    birthDay: "01",
    birthMonth: "01",
    birthYear: "2000",
    createdAt: "2024-01-01",
    totalTests: 0,
    highestScore: 0,
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const answerInfo = await getHistoryOfUser(userID, dispatch);
        const highestScore = await getHighestOfUser(userID, dispatch);
        const foundUser = await findUser(userID, dispatch);
        const infoUser = foundUser?.metadata.user;
        const birthDate = new Date(infoUser?.birthday || "2000-01-01");
        const day = birthDate.getDate().toString().padStart(2, "0");
        const month = (birthDate.getMonth() + 1).toString().padStart(2, "0");
        const year = birthDate.getFullYear().toString();

        setProfile({
          name: infoUser?.name || "",
          email: infoUser?.email || "",
          avatar: infoUser?.avatar || "/path/to/avatar.jpg",
          phone: infoUser?.phone || "",
          gender: infoUser?.gender || "male",
          birthDay: day,
          birthMonth: month,
          birthYear: year,
          createdAt: new Date(
            infoUser?.createdAt || "2024-01-01"
          ).toLocaleDateString(),
          totalTests: answerInfo.length,
          highestScore: highestScore.history_highest_score,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [userID, dispatch, currentUser]);

  const handleSaveClick = async () => {
    try {
      let avatar = "";
      const uploadedImage = await uploadImage(avatarFile, "", dispatch);

      if (uploadedImage) {
        avatar = uploadedImage.img_url;
      }
      const updatedProfile = {
        ...profile,
        birthday: new Date(
          `${profile.birthYear}-${profile.birthMonth}-${profile.birthDay}`
        ).toISOString(),
        avatar,
      };

      await updateUser(accessToken, userID, updatedProfile, dispatch, axiosJWT);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ width: isMobile ? "36%" : "100%" }} maxWidth="md">
      <h1>Your Profile</h1>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid sx={{ textAlign: "center" }} item>
            <Avatar
              alt={profile.name}
              src={profile.avatar}
              sx={{ width: 100, height: 100 }}
            />
            {isEditing && (
              <Button
                variant="contained"
                component="label"
                sx={{ marginTop: 2 }}
              >
                Change
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </Button>
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={handleEditClick}>
              {isEditing ? (
                <SaveIcon onClick={handleSaveClick} />
              ) : (
                <EditIcon />
              )}
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={profile.name}
              name="name"
              onChange={handleInputChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={profile.email}
              name="email"
              onChange={handleInputChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              value={profile.phone}
              name="phone"
              onChange={handleInputChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              variant="outlined"
              value={profile.gender}
              name="gender"
              onChange={handleInputChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Day"
              variant="outlined"
              value={profile.birthDay}
              name="birthDay"
              onChange={handleInputChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Month"
              variant="outlined"
              value={profile.birthMonth}
              name="birthMonth"
              onChange={handleInputChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Year"
              variant="outlined"
              value={profile.birthYear}
              name="birthYear"
              onChange={handleInputChange}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Total Tests"
              variant="outlined"
              value={profile.totalTests}
              name="totalTests"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Highest Score"
              variant="outlined"
              value={profile.highestScore}
              name="highestScore"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Day Join Our Site: {profile.createdAt}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Profile;
