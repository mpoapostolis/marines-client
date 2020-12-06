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
} from "@material-ui/core";
import { useI18n } from "../../../I18n";
import OverTableHeader from "../../../components/OverTableHeader";
import { useFormik } from "formik";

import { useMutation } from "react-query";
import { createNewMarine } from "../../../api/marines";
import { useHistory } from "react-router-dom";

import { useSnack } from "../../../provider/SnackBarProvider";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Polygon, SVGOverlay } from "react-leaflet";
import { LeafletMouseEvent, Map } from "leaflet";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "30px",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      gridColumnGap: "20px",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  mapContainer: {
    width: "100%",
    minHeight: "66vh",
    borderTop: "solid 1px #0002",
    height: "calc(100% - 69px)",
  },
}));

function New() {
  const t = useI18n();
  const classes = useStyles();
  const history = useHistory();
  const [map, setMap] = useState<Map>();
  const [polyLine, setPolyLine] = useState<LeafletMouseEvent[]>([]);
  const [drawing, setDrawing] = useState(false);
  const lineRef = useRef<SVGLineElement>(null);

  const toggleDraw = useCallback(() => {
    setDrawing(!drawing);
  }, [drawing]);

  const resetPolygon = () => setPolyLine([]);

  const handleMapClick = useCallback(
    (obj: LeafletMouseEvent) => {
      if (drawing) setPolyLine((s) => [...s, obj]);
    },
    [drawing]
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

  const setSnack = useSnack();

  const [saveMarine] = useMutation(createNewMarine, {
    onSuccess: () => {
      setSnack({
        msg: t("int.marine-created-successfully"),
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
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      saveMarine(values);
    },
  });

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
        <Paper>
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
        </Paper>

        <Paper>
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
