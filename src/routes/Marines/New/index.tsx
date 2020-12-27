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
  Typography,
  Grid,
} from "@material-ui/core";
import { useI18n } from "../../../I18n";
import OverTableHeader from "../../../components/OverTableHeader";
import { useFormik } from "formik";

import { useMutation, useQuery } from "react-query";
import {
  createNewMarine,
  updateMarine,
  Marine,
  getMarineById,
} from "../../../api/marines";
import { useHistory, useParams } from "react-router-dom";
import { useSnack } from "../../../provider/SnackBarProvider";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  fieldCont: {},
}));

function New() {
  const t = useI18n();
  const styles = useStyles();
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const setSnack = useSnack();
  useQuery(["marine", params.id], getMarineById, {
    enabled: params.id !== "new",
    onSuccess: (m: Marine) => {
      formik.setFieldValue("name", m.name);
    },
  });

  const { mutate: saveMarine } = useMutation(
    params.id !== "new" ? updateMarine : createNewMarine,
    {
      onSuccess: () => {
        setSnack({
          msg: params.id
            ? t("int.marine-updated-successfully")
            : t("int.marine-created-successfully"),
          severity: "success",
        });
        history.push("/marines");
      },
      onError: () => {
        setSnack({
          msg: t("int.oops-something-went-wrong"),
          severity: "error",
        });
      },
    }
  );

  const formik = useFormik<Marine>({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      saveMarine({ id: params.id, ...values });
    },
  });

  return (
    <>
      <OverTableHeader
        goBack
        actions={
          <>
            <Button
              size="small"
              onClick={() => formik.handleSubmit()}
              disabled={!Boolean(formik.dirty)}
              variant="outlined"
            >
              {t("int.save")}
            </Button>
          </>
        }
      />
      <br />
      <Grid xs={12} lg={5} item container component={Paper}>
        <Grid item xs={12}>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5">
                  {params.id !== "new"
                    ? t("int.update-info")
                    : t("int.create-new-info")}
                </Typography>
              }
              secondary={
                <Typography variant="subtitle2">
                  {t("int.fill-all-required-fields")}
                </Typography>
              }
            />
          </ListItem>
          <Divider />
        </Grid>

        <Grid className={styles.paper} xs={12} item>
          <TextField
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            label={t("int.vessel-name")}
            fullWidth
            variant="outlined"
            margin="dense"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default New;
