import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography, Theme } from "@material-ui/core";
import { useAccount } from "../../provider";
import { useQuery } from "react-query";
import { getMarineById } from "../../api/marines";

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
  const account = useAccount();
  const { data: marine } = useQuery(
    ["marine", account.marineId],
    getMarineById
  );
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
        {marine?.name ?? ""}
      </Typography>
      <Typography variant="body2">{account.userName}</Typography>
    </div>
  );
}

export default Profile;
