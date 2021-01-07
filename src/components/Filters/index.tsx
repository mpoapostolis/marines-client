import { useI18n } from "../../I18n";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router-dom";
import { addDays, format } from "date-fns";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import React from "react";
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
import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListItemIcon,
  MenuItem,
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
export default function FullScreenDialog(props: Props) {
  const classes = useStyles();

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
          <Typography variant="h6" className={classes.title}></Typography>
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
          <Grid item xs={6}>
            <TextField
              label={t("int.start-date")}
              placeholder="---"
              className={inputClass}
              type="date"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("int.end-date")}
              onChange={(evt) => console.log(evt.currentTarget.value)}
              className={inputClass}
              type="date"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Grid>
        </Grid>

        <br />

        <Typography variant="h5">{t("int.locate-me")}</Typography>
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
    </Dialog>
  );
}
