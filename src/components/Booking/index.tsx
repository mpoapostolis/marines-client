import { useI18n } from "../../I18n";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router-dom";
import { addDays, format } from "date-fns";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DateRangeIcon from "@material-ui/icons/DateRange";

import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListItemIcon,
  MenuItem,
  Popover,
  Switch,
  TextField,
} from "@material-ui/core";
import { css, cx } from "emotion";

const inputClass = css`
  background: white;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

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
export default function BookingDialog(props: Props) {
  const [dates, setDates] = useState<Date[]>();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleChangeDate = (d: Date[] | Date) => {
    const tmp = d as Date[];
    setDates(tmp);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };
  const t = useI18n();
  const history = useHistory();
  return (
    <Dialog
      fullScreen
      open={props.open}
      //   open
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Button autoFocus color="inherit" onClick={handleClose}>
            {t("int.search")}
          </Button>
        </Toolbar>
      </AppBar>
      <br />

      <div className={cx(classes.main, "container")}>
        <br />
        <Typography variant="h5">{t("int.vessel")}</Typography>

        <TextField
          className={inputClass}
          variant="outlined"
          margin="dense"
          fullWidth
          label={t("int.pick-your-vessel")}
          select
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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

        <Typography variant="h5">{t("int.marine")}</Typography>

        <TextField
          className={inputClass}
          variant="outlined"
          margin="dense"
          fullWidth
          label={t("int.pick-your-vessel")}
          select
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />

        <Typography variant="h5">{t("int.dates")}</Typography>
        <Grid container spacing={1} justify="flex-end">
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<DateRangeIcon />}
              onClick={handleClick}
              fullWidth
            >
              {t(`int.from:-  int.to:-`)}
            </Button>
          </Grid>
        </Grid>

        <br />

        <Typography variant="h5">{t("int.near-me")}</Typography>
        <TextField
          className={inputClass}
          variant="outlined"
          margin="dense"
          fullWidth
          label={t("int.pick-your-vessel")}
          select
          onSelect={console.log}
        >
          <MenuItem key="on" value="on">
            {t("int.on")}
          </MenuItem>

          <MenuItem key="off" value="off">
            {t("int.off")}
          </MenuItem>
        </TextField>

        <br />
        <br />

        <Typography variant="h5">{t("int.services")}</Typography>
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
        id={id}
        open={open}
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
        <Calendar selectRange onChange={handleChangeDate} value={dates} />
      </Popover>
    </Dialog>
  );
}
