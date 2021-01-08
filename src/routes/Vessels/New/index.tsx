import React from "react";
import {
  makeStyles,
  Paper,
  Button,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  List,
  TextField,
  Box,
} from "@material-ui/core";
import { useI18n } from "../../../I18n";
import OverTableHeader from "../../../components/OverTableHeader";
import { useFormik } from "formik";
import "leaflet/dist/leaflet.css";
import { useMutation, useQuery } from "react-query";
import { useSnack } from "../../../provider/SnackBarProvider";
import {
  createVessel,
  getVesselById,
  updateVessel,
  Vessel,
} from "../../../api/vessels";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gridGap: "20px",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },

  section: {
    flex: 1,
    height: "100%",
    "&.map": {
      position: "sticky",
      top: "70px",
    },
  },
  form: {
    display: "grid",
    padding: theme.spacing(2),
  },

  servicesCont: {
    padding: theme.spacing(1, 0),
  },
  mapContainer: {
    width: "100%",
    minHeight: "66vh",
    borderTop: "solid 1px #0002",
    height: "calc(100% - 69px)",
  },
  serviceHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const defaultSpot = {
  name: "",
  length: 0,
  width: 0,
  draught: 0,
};

function New() {
  const t = useI18n();
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  const history = useHistory();

  const { data: vessel = defaultSpot } = useQuery(
    ["vessel", params.id],
    getVesselById,
    {
      enabled: params.id !== "new",
    }
  );

  const setSnack = useSnack();
  const { mutate: saveVessel } = useMutation(
    params.id !== "new" ? updateVessel : createVessel,
    {
      onSuccess: () => {
        history.push("/vessels");
        setSnack({
          msg:
            params.id !== "new"
              ? t("int.vessel-updated-successfully")
              : t("int.vessel-created-successfully"),

          severity: "success",
        });
      },
      onError: () => {
        setSnack({
          msg: t("int.oops-something-went-wrong"),
          severity: "error",
        });
      },
    }
  );

  const formik = useFormik<Vessel>({
    enableReinitialize: true,
    initialValues: vessel,

    onSubmit: (values) => {
      const { _id, ...rest } = values;
      saveVessel({ _id: params.id, ...rest });
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

      <div className={classes.root}>
        <Paper className={classes.section}>
          <List>
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
          </List>
          <Divider />
          <Box className={classes.form}>
            <TextField
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values?.name}
              label={t("int.vessel-name")}
              fullWidth
              variant="outlined"
              margin="dense"
            />

            <TextField
              id="length"
              InputProps={{
                endAdornment: t("int.meters"),
              }}
              name="length"
              type="number"
              onChange={formik.handleChange}
              value={formik.values?.length}
              label={t("int.vessel-length")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="length"
              InputProps={{
                endAdornment: t("int.meters"),
              }}
              name="width"
              type="number"
              onChange={formik.handleChange}
              value={formik.values?.width ?? 0}
              label={t("int.vessel-width")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="draught"
              name="draught"
              InputProps={{
                endAdornment: t("int.meters"),
              }}
              type="number"
              onChange={formik.handleChange}
              value={formik.values?.draught}
              label={t("int.vessel-draught")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
          </Box>
        </Paper>
      </div>
    </>
  );
}

export default New;
