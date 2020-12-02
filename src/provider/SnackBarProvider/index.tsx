import React, { createContext, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export type SnackProps = {
  msg?: string;
  severity?: "error" | "warning" | "info" | "success";
};

export type SetSnack = (key: SnackProps) => void;
export const Snack = createContext<SetSnack>(() => void 0);

type Props = {
  children: React.ReactNode;
};

export default function SnackBarProvider(props: Props) {
  const classes = useStyles();
  const [snackProps, setSnackProps] = React.useState<SnackProps>({});

  const setSnack = (snackProps: SnackProps) => setSnackProps(snackProps);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackProps({});
  };

  return (
    <Snack.Provider value={setSnack}>
      {props.children}

      <div className={classes.root}>
        <Snackbar
          open={Boolean(snackProps.msg)}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={snackProps.severity}>
            {snackProps.msg}
          </Alert>
        </Snackbar>
      </div>
    </Snack.Provider>
  );
}

export const useSnack = () => useContext(Snack);
