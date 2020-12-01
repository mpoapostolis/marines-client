import React, { ReactNode } from "react";

import {
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
    },
    spacer: {
      marginLeft: "auto",
    },
  })
);

type Props = {
  title?: string;
  actions?: ReactNode;
  goBack?: boolean;
};

function OverTableHeader(props: Props) {
  const history = useHistory();
  const styles = useStyles();

  return (
    <Paper className={styles.paper}>
      {props.goBack && (
        <IconButton size="small" onClick={history.goBack}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography variant="h4">{props.title}</Typography>
      <span className={styles.spacer} />
      {props.actions}
    </Paper>
  );
}

export default OverTableHeader;
