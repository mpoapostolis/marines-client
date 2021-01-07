import {
  Box,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useI18n } from "../../I18n";
import { img, paper } from "./css";
import Avatar from "@material-ui/core/Avatar";
import { Rating } from "@material-ui/lab";
import WifiIcon from "@material-ui/icons/Wifi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    inline: {
      display: "inline",
    },
  })
);

function Spot() {
  const t = useI18n();
  const classes = useStyles();

  return (
    <div>
      <img
        className={img}
        src="https://images.unsplash.com/photo-1605868051021-57af43fb8f8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
      />
      <br />
      <br />
      <br />
      <Typography variant="h4">Marina Zeas</Typography>
      <Typography variant="h6">Spot: A3</Typography>
      <br />
      <hr />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <List className={classes.root}>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <React.Fragment key={num}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <WifiIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={1} justify="flex-end">
            <Grid item xs={6}>
              <TextField
                label={t("int.start-date")}
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
                type="date"
                variant="outlined"
                margin="dense"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Spot;
