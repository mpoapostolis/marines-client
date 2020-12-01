import React from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Theme,
  Paper,
  Button,
} from "@material-ui/core";
import { useI18n } from "../../../I18n";
import OverTableHeader from "../../../components/OverTableHeader";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

function New() {
  const t = useI18n();
  const styles = useStyles();
  return (
    <>
      <OverTableHeader
        title={t("int.new-spot")}
        actions={[
          <Button size="small" variant="outlined">
            {t("int.save")}
          </Button>,
        ]}
      />{" "}
      <br />
      <Grid
        className={styles.paper}
        component={Paper}
        container
        xs={6}
        spacing={2}
      >
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" margin="dense" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" margin="dense" />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" margin="dense" />
        </Grid>
      </Grid>
    </>
  );
}

export default New;
