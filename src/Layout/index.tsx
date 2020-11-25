import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import { container, header } from "./css";
import { cx } from "emotion";
import { useMediaQuery, Theme, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Routes from "../routes";
import { LOGOUT } from "../provider/names";
import { useAccount } from "../provider";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    gridArea: "main",
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

function Layout() {
  const account = useAccount();

  useEffect(() => {
    window.addEventListener("__logout", () => {
      account.dispatch({ type: LOGOUT });
    });
    return () => {
      window.removeEventListener("__logout", () => void 0);
    };
  }, []);

  const isSmallDevice = false;
  const [open, setOpen] = useState(!isSmallDevice);
  const classes = useStyles();

  useEffect(() => {
    setOpen(!isSmallDevice);
  }, [isSmallDevice]);

  return (
    <div className={cx(container, { isSmallDevice })}>
      <Header />

      <Menu
        isSmallDevice={isSmallDevice}
        open={open}
        setOpen={() => setOpen(false)}
      />
      <main className={classes.root}>
        <div className={classes.content}>
          <Routes />
        </div>
      </main>
    </div>
  );
}
export default Layout;