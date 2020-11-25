import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "145px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 64,
    height: 64,
  },
  storeName: {
    fontWeight: "bolder",
    marginTop: theme.spacing(1),
  },
}));

function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="Person"
        to="/settings"
        className={classes.avatar}
        component={RouterLink}
        src={"/images/avatar.png"}
      />
      <Typography className={classes.storeName} variant="h4">
        Store
      </Typography>
      <Typography variant="body2">mpoapostolis@gmail.com</Typography>
    </div>
  );
}

export default Profile;
