import {
  Button,
  Fab,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import MediaCard from "../../components/Card";
import { useI18n } from "../../I18n";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { css } from "emotion";
import { addDays, format } from "date-fns";
import { useHistory } from "react-router-dom";

import FilterListIcon from "@material-ui/icons/FilterList";
import FullScreenDialog from "../../components/Filters";

const inputClass = css`
  background: white;
`;

function Home() {
  const t = useI18n();

  const [open, $setOpen] = useState(false);
  const setOpen = (b: boolean) => $setOpen(b);

  return (
    <>
      <Grid container justify="flex-end">
        <Button
          onClick={() => setOpen(true)}
          startIcon={<FilterListIcon />}
          variant="contained"
        >
          {t("int.filters")}
        </Button>
      </Grid>

      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MediaCard />
        </Grid>
      </Grid>

      <FullScreenDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default Home;
