import {
  Button,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useI18n } from "../../I18n";
import { img } from "./css";
import Avatar from "@material-ui/core/Avatar";
import { EUROSIGN } from "../../utils";
// import BookingDialog from "../../components/Booking";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../api/spots";
import { useQuery } from "react-query";
import SpotInfoLine from "../../components/SpotInfoLine";

const useStyles = makeStyles(() =>
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
  const params = useParams<{ id: string }>();
  // const [open, $setOpen] = useState(false);
  // const setOpen = (b: boolean) => $setOpen(b);
  const classes = useStyles();
  const t = useI18n();
  const { data: spot } = useQuery(["spot", params.id], getSpotById);

  return (
    <div>
      <img
        alt="cover"
        className={img}
        src="https://images.unsplash.com/photo-1605868051021-57af43fb8f8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
      />
      <br />
      <br />
      <Typography variant="h4">{spot?.marineName}</Typography>
      <br />
      <Typography variant="h6">
        {t("int.spot")} {spot?.name}
      </Typography>

      <br />
      <SpotInfoLine
        title={t("int.price")}
        value={`${spot?.price}`}
        subNot={`${EUROSIGN} / ${t("int.day")}`}
      />

      <SpotInfoLine
        title={t("int.width")}
        value={`${spot?.draught}`}
        subNot={t("int.meters")}
      />
      <SpotInfoLine
        title={t("int.length")}
        value={`${spot?.length}`}
        subNot={t("int.meters")}
      />
      <br />
      <br />

      <Button
        // onClick={() => setOpen(true)}
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
        {spot?.services.map((obj) => (
          <ListItem key={obj.__id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{obj.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h5">{obj.name}</Typography>}
              secondary={
                <Typography
                  component="span"
                  variant="subtitle2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {obj.description}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      {/* <BookingDialog open={open} setOpen={setOpen} /> */}
    </div>
  );
}

export default Spot;
