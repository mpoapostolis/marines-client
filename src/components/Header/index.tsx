import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Theme, CssBaseline } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: theme.mixins.toolbar,
  })
);

function Header() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar
        elevation={2}
        style={{
          background: "#486493",
        }}
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
