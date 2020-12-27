import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import { container } from "./css";
import { cx } from "emotion";
import { Theme, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Routes from "../routes";
import { LOGOUT } from "../provider/names";
import { useAccount } from "../provider";
import { QueryClient, QueryClientProvider } from "react-query";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    gridArea: "main",
  },
  content: {},
}));

const queryClient = new QueryClient();

function Layout() {
  const account = useAccount();

  useEffect(() => {
    window.addEventListener("__logout", () => {
      account.dispatch({ type: LOGOUT });
    });
    return () => {
      window.removeEventListener("__logout", () => void 0);
    };
  }, [account]);

  // const login = async () => {
  //   const payload = await getUserInfo();
  //   account.dispatch({ type: LOGIN, payload });
  // };

  useEffect(() => {
    // login();
  }, []);

  const isSmallDevice = useMediaQuery("(max-width:600px)");

  const [open, setOpen] = useState(!isSmallDevice);
  const classes = useStyles();

  useEffect(() => {
    setOpen(!isSmallDevice);
  }, [isSmallDevice]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={cx(container, { isSmallDevice })}>
        <Header setOpen={() => setOpen(true)} />

        <Menu
          isSmallDevice={isSmallDevice}
          open={open}
          setOpen={() => setOpen(false)}
        />
        <main className={classes.root}>
          <Routes />
        </main>
      </div>
    </QueryClientProvider>
  );
}
export default Layout;
