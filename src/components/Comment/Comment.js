import React from "react";
import { Avatar, Card, CardContent, Typography, Grid } from "@mui/material";

const Comment = React.memo(({ comment }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar>{comment.comment_user.user_name.charAt(0)}</Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h6">{comment.comment_user.user_name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(comment.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body1">{comment.comment_content}</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
));

export default Comment;
