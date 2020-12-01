import React from "react";
import {
  TextField,
  makeStyles,
  Theme,
  Paper,
  Button,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Typography,
} from "@material-ui/core";
import { useI18n } from "../../../I18n";
import OverTableHeader from "../../../components/OverTableHeader";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: "50%",
  },
  fieldCont: {
    padding: theme.spacing(2),
  },
}));

function New() {
  const t = useI18n();
  const styles = useStyles();
  return (
    <>
      <OverTableHeader
        goBack
        actions={[
          <Button size="small" variant="outlined">
            {t("int.save")}
          </Button>,
        ]}
      />{" "}
      <br />
      <Paper className={styles.paper}>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h5">{t("int.create-new-info")}</Typography>
            }
            secondary={
              <Typography variant="subtitle2">
                {t("int.fill-all-required-fields")}
              </Typography>
            }
          />
        </ListItem>
        <Divider />

        <Container className={styles.fieldCont}>
          <TextField
            label={t("int.vessel-name")}
            fullWidth
            variant="outlined"
            margin="dense"
          />
        </Container>
      </Paper>
    </>
  );
}

export default New;
