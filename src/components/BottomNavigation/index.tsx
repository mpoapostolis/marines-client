import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((t: Theme) => ({
  root: {
    border: "solid 1px #0001",
    boxShadow: t.shadows[2],
  },
}));
export default function LabelBottomNavigation() {
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (_event: React.ChangeEvent<{}>, value: string) => {
    history.push(value);
  };

  return (
    <BottomNavigation
      className={classes.root}
      value={history.location.pathname}
      onChange={handleChange}
    >
      <BottomNavigationAction value="/" icon={<HomeIcon />} />
      <BottomNavigationAction value="/recents" icon={<RestoreIcon />} />
      <BottomNavigationAction value="/vessels" icon={<DirectionsBoatIcon />} />
    </BottomNavigation>
  );
}
