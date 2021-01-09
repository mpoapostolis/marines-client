import { useI18n } from "../../I18n";
import qs from "query-string";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Calendar from "react-calendar";
import getTime from "date-fns/getTime";
import { getAllParams, formatDate } from "../../utils";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Popover,
  TextField,
} from "@material-ui/core";
import { css, cx } from "emotion";
import { useQuery } from "react-query";
import { getMyVessels } from "../../api/vessels";
import { getMarines } from "../../api/marines";
import "react-calendar/dist/Calendar.css";
import { useSnack } from "../../provider/SnackBarProvider";

const inputClass = css`
  background: white;
  margin: 0px !important;
`;

const title = css`
  margin-bottom: 8px !important;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      border: "solid 1px #0003",
      padding: theme.spacing(1, 2),
      borderRadius: "4px",
    },

    appBar: {
      position: "fixed",
    },
    main: {
      margin: "3rem auto",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  setOpen: (b: boolean) => void;
};
export default function FullScreenDialog(props: Props) {
  const history = useHistory();
  const params = getAllParams(history.location.search);

  const classes = useStyles();
  const setSnack = useSnack();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const { data: vessels } = useQuery("vessels", getMyVessels);
  const { data: marines } = useQuery("marines", getMarines);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    props.setOpen(false);
  };
  const t = useI18n();

  const pushParams = (obj: Record<string, any>) => {
    history.push({
      search: qs.stringify({ ...params, ...obj }),
    });
  };

  const selectVessel = (vesselId: string) => {
    const v = vessels?.data.find((v) => v._id === vesselId);
    const { draught, length, width } = v || {};
    pushParams({ vesselId, draught, length, width });
  };

  const setPos = (r: string) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        pushParams({
          radius: r,
          latitude: pos.coords?.latitude,
          longitude: pos.coords?.longitude,
        });
      },
      (err) =>
        setSnack({
          msg: err.message,
          severity: "error",
        })
    );
  };

  const from = params.from as string;
  const to = params.to as string;
  const clearFilters = () =>
    pushParams(
      Object.keys(params).reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: undefined,
        }),
        {}
      )
    );

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              clearFilters();
              handleClose();
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <span className={classes.title} />
          <Button autoFocus color="inherit" onClick={handleClose}>
            {t("int.search")}
          </Button>
        </Toolbar>
      </AppBar>
      <br />

      <div className={cx(classes.main, "container")}>
        <br />
        <Typography className={title} variant="h5">
          {t("int.vessel")}
        </Typography>
        <TextField
          className={inputClass}
          variant="outlined"
          margin="dense"
          fullWidth
          value={params.vesselId ?? ""}
          onChange={(evt) => {
            selectVessel(evt.target.value);
          }}
          label={t("int.pick-your-vessel")}
          select
        >
          <MenuItem>{t("int.all")}</MenuItem>

          {vessels?.data.map((obj) => (
            <MenuItem key={obj._id} value={obj._id}>
              {obj.name}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />
        <Button
          onClick={() => history.push("/vessels/new")}
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          fullWidth
        >
          {t("int.create-new-vessel")}
        </Button>
        <br />
        <br />

        <Typography className={title} variant="h5">
          {t("int.marine")}
        </Typography>
        <TextField
          className={inputClass}
          variant="outlined"
          margin="dense"
          fullWidth
          label={t("int.pick-your-vessel")}
          select
          value={params.marineId ?? ""}
          onChange={(evt) => {
            pushParams({ marineId: evt.target.value });
          }}
        >
          <MenuItem>{t("int.all")}</MenuItem>

          {marines?.data.map((obj) => (
            <MenuItem key={obj._id} value={obj._id}>
              {obj.name}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />

        <Typography className={title} variant="h5">
          {t("int.dates")}
        </Typography>
        <Grid container spacing={1} justify="flex-end">
          <Grid item xs={12}>
            <div className={classes.textField} onClick={handleClick}>
              {from || to
                ? `${from && formatDate(new Date(+from))} -
              ${to && formatDate(new Date(+to))}
           `
                : t("int.dates")}
            </div>
          </Grid>
        </Grid>

        <br />

        <Typography className={title} variant="h5">
          {t("int.near-me")}
        </Typography>
        <TextField
          className={inputClass}
          variant="outlined"
          margin="dense"
          fullWidth
          label={t("int.find-spots-in-radius")}
          select
          value={params.radius ?? ""}
          onChange={(evt) => {
            if (evt.target.value === undefined)
              pushParams({
                radius: undefined,
                latitude: undefined,
                longitude: undefined,
              });
            else setPos(evt.target.value);
          }}
        >
          <MenuItem>{t("int-everywhere")}</MenuItem>

          {[1, 2, 4, 5, 10, 15, 20, 25].map((kiloMeters) => (
            <MenuItem key={kiloMeters} value={kiloMeters}>
              {kiloMeters}km
            </MenuItem>
          ))}
        </TextField>

        <br />
        <br />

        <Typography className={title} variant="h5">
          {t("int.services")}
        </Typography>
        <Grid container>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <Grid key={num} item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={console.log}
                    name={`service-${num}`}
                    color="primary"
                  />
                }
                label={`service-${num}`}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseDate}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Calendar
          value={from && to ? [new Date(+from), new Date(+to)] : undefined}
          onChange={(dates) => {
            const [f, t] = dates as Date[];
            pushParams({
              from: getTime(f),
              to: getTime(t),
            });
            setAnchorEl(null);
          }}
          selectRange
        />
        <Button
          fullWidth
          onClick={() => {
            pushParams({
              from: undefined,
              to: undefined,
            });
            setAnchorEl(null);
          }}
        >
          Clear
        </Button>
      </Popover>
    </Dialog>
  );
}
