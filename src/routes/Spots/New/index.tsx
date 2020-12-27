import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  makeStyles,
  Paper,
  Button,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  ListItemSecondaryAction,
  List,
  TextField,
  Box,
  Grid,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { useI18n } from "../../../I18n";
import OverTableHeader from "../../../components/OverTableHeader";
import { useFormik } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon, SVGOverlay } from "react-leaflet";
import { LeafletMouseEvent, Map } from "leaflet";
import { cx } from "emotion";
import { useMutation } from "react-query";
import { useSnack } from "../../../provider/SnackBarProvider";
import { createSpot, SpotInfo } from "../../../api/spots";

const RANDOM_STRING = () => (Math.random() + 1).toString(36).substring(7);

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

function New() {
  const t = useI18n();
  const classes = useStyles();
  const [map, setMap] = useState<Map>();
  const [polyLine, setPolyLine] = useState<LeafletMouseEvent[]>([]);
  const [drawing, setDrawing] = useState(false);
  const lineRef = useRef<SVGLineElement>(null);

  const setSnack = useSnack();

  const { mutate: saveSpot } = useMutation(createSpot, {
    onSuccess: () => {
      setSnack({
        msg: t("int.spot-created-successfully"),
        severity: "success",
      });
    },
    onError: () => {
      setSnack({
        msg: t("int.oops-something-went-wrong"),
        severity: "error",
      });
    },
  });

  const toggleDraw = useCallback(() => {
    setDrawing(!drawing);
  }, [drawing]);

  const formik = useFormik<SpotInfo>({
    initialValues: {
      coords: [],
      name: "",
      price: 0,
      length: 0,
      draught: 0,
      services: [],
    },

    onSubmit: (values) => {
      saveSpot(values);
    },
  });

  const resetPolygon = () => {
    formik.setFieldValue("coords", []);
    setPolyLine([]);
  };

  const handleMapClick = useCallback(
    (obj: LeafletMouseEvent) => {
      if (drawing)
        setPolyLine((s) => {
          const coords = [...s, obj];
          formik.setFieldValue(
            "coords",
            coords.map((obj) => ({ lat: obj.latlng.lat, lng: obj.latlng.lng }))
          );
          return coords;
        });
    },
    [drawing, formik]
  );

  const handleMoveOnMap = (obj: LeafletMouseEvent) => {
    lineRef.current?.setAttribute("y2", String(obj?.containerPoint.y));
    lineRef.current?.setAttribute("x2", String(obj?.containerPoint.x));
  };

  useEffect(() => {
    map?.on("click", handleMapClick);
    map?.on("mousemove", handleMoveOnMap);
    map?.on("dblclick", toggleDraw);

    return () => {
      map?.off("click", handleMapClick);
      map?.off("mousemove", handleMoveOnMap);
      map?.off("dblclick", toggleDraw);
    };
  }, [map, drawing, handleMapClick, toggleDraw, lineRef]);

  const addNewService = () => {
    formik.setValues((v) => ({
      ...v,
      services: [
        ...v.services,
        {
          name: "",
          description: "",
          __id: RANDOM_STRING(),
        },
      ],
    }));
  };

  const lastPoint = polyLine.length > 0 && polyLine[polyLine.length - 1];
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
                    {t("int.create-new-info")}
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
              value={formik.values.name}
              label={t("int.vessel-name")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              label={t("int.price-price")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="length"
              name="length"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.length}
              label={t("int.vessel-length")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              id="draught"
              name="draught"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.draught}
              label={t("int.vessel-draught")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <br />
            <br />
            {formik.values.services.length > 0 && (
              <Typography variant="h5">{t(`int.servicess`)}</Typography>
            )}
            <Grid spacing={0} container>
              {formik.values.services.map((obj, idx) => (
                <FormControl
                  fullWidth
                  className={classes.servicesCont}
                  key={obj.__id}
                >
                  <br />
                  <div className={classes.serviceHeader}>
                    <Typography variant="caption">
                      {t(`int.servicess`)} no {idx + 1}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        formik.setFieldValue(
                          "services",
                          formik.values.services.filter((_, i) => i !== idx)
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <Grid item xs={6}>
                    <TextField
                      onChange={(evt) =>
                        formik.setFieldValue(
                          `services.${idx}.name`,
                          evt.currentTarget.value
                        )
                      }
                      fullWidth
                      label={t("int.service-name")}
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <TextField
                      onChange={(evt) =>
                        formik.setFieldValue(
                          `services.${idx}.description`,
                          evt.currentTarget.value
                        )
                      }
                      variant="outlined"
                      fullWidth
                      id="standard-multiline-flexible"
                      label={t("int.description")}
                      margin="dense"
                      multiline
                      rows={5}
                    />
                  </Grid>
                </FormControl>
              ))}
            </Grid>
            <Button onClick={addNewService} variant="outlined" color="primary">
              {t("int.add-service")}
            </Button>
          </Box>
        </Paper>

        <Paper className={cx(classes.section, "map")}>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h5">
                    {t("int.create-new-info")}
                  </Typography>
                }
                secondary={
                  <Typography variant="subtitle2">
                    {t("int.click-start-draw-and-then-clik-on-map")}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                {Boolean(polyLine.length > 1) && !drawing && (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={resetPolygon}
                  >
                    {t("int.reset")}
                  </Button>
                )}
                &nbsp; &nbsp;
                {(polyLine.length < 1 || drawing) && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={toggleDraw}
                  >
                    {drawing ? t("int.stop-drawing") : t("int.start-drawing")}
                  </Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <MapContainer
            whenCreated={setMap}
            className={classes.mapContainer}
            center={[51.505, -0.09]}
            zoom={13}
          >
            <Polygon
              pathOptions={{ color: "purple" }}
              positions={polyLine.map((obj) => [
                obj.latlng.lat,
                obj.latlng.lng,
              ])}
            />
            {map?.getBounds() && lastPoint && drawing && (
              <SVGOverlay bounds={map?.getBounds()}>
                <line
                  stroke="purple"
                  x1={lastPoint.containerPoint.x}
                  y1={lastPoint.containerPoint.y}
                  strokeDasharray={"4px"}
                  strokeWidth="3px"
                  ref={lineRef}
                ></line>
              </SVGOverlay>
            )}

            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Paper>
      </div>
    </>
  );
}

export default New;
