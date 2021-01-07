import {
  Box,
  Button,
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
import React, { useState } from "react";
import { useI18n } from "../../I18n";
import { img, paper } from "./css";
import Avatar from "@material-ui/core/Avatar";
import { Rating } from "@material-ui/lab";
import WifiIcon from "@material-ui/icons/Wifi";
import { EUROSIGN } from "../../utils";
import BookingDialog from "../../components/Booking";

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
  const [open, $setOpen] = useState(false);
  const setOpen = (b: boolean) => $setOpen(b);
  const classes = useStyles();

  return (
    <div>
      <img
        className={img}
        src="https://images.unsplash.com/photo-1605868051021-57af43fb8f8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
      />
      <br />
      <br />
      <Typography variant="h4">Marina Zeas</Typography>
      <br />
      <Typography variant="h6">Spot: A3</Typography>
      <Typography>Price: 12{EUROSIGN} / day</Typography>
      <br />

      <Button
        onClick={() => setOpen(true)}
        color="primary"
        fullWidth
        variant="contained"
      >
        Book Now
      </Button>
      <br />
      <br />

      <hr />
      <br />
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
      <BookingDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Spot;
