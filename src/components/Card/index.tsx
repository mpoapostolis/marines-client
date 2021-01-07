import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";
import { useI18n } from "../../I18n";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 185,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const t = useI18n();
  const history = useHistory();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push("/1")}>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1605868051021-57af43fb8f8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            Lizards are a widespread group of squamate reptiles, with over 6,000
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button startIcon={<RoomIcon />} size="small" color="primary">
          {t("int.navigate")}
        </Button>
      </CardActions>
    </Card>
  );
}
