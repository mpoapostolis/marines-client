import { Button, Grid } from "@material-ui/core";
import { useQuery } from "react-query";
import { getMySpots } from "../../api/spots";

import React, { useState } from "react";
import MediaCard from "../../components/Card";
import { useI18n } from "../../I18n";

import FilterListIcon from "@material-ui/icons/FilterList";
import FullScreenDialog from "../../components/Filters";
import { useHistory } from "react-router-dom";
import { getAllParams } from "../../utils";

function Home() {
  const t = useI18n();
  const history = useHistory();
  const params = getAllParams(history.location.search);

  const [open, $setOpen] = useState(false);
  const setOpen = (b: boolean) => $setOpen(b);

  const { data: spots } = useQuery(["spots", params], getMySpots, {
    keepPreviousData: true,
  });

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
        {spots?.data.map((obj) => (
          <Grid key={obj._id} item xs={12} sm={6} md={4} lg={3}>
            <MediaCard {...obj} />
          </Grid>
        ))}
      </Grid>

      <FullScreenDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default Home;
