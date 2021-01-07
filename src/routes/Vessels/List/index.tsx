import React from "react";
import { useI18n } from "../../../I18n";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OverTableHeader from "../../../components/OverTableHeader";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-ui/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import MTable from "../../../components/Table";
import { Columns } from "../../../components/Table/types";
import { getAllParams } from "../../../utils";
import { useSnack } from "../../../provider/SnackBarProvider";
import { deleteSpot, getMySpots, SpotInfo } from "../../../api/spots";

function List() {
  const setSnack = useSnack();
  const history = useHistory();
  const params = getAllParams(history.location.search);

  const queryClient = useQueryClient();

  const { data: vessels = { total: 0, data: [] }, isFetching } = useQuery(
    ["vessels", params],
    getMySpots,
    {
      keepPreviousData: true,
    }
  );

  const { mutate: _deleteSpot } = useMutation(deleteSpot, {
    onSuccess: () => {
      setSnack({
        msg: t("int.spot-deleted-successfully"),
        severity: "success",
      });
      queryClient.invalidateQueries("vessels");
    },
    onError: () => {
      setSnack({
        msg: t("int.oops-something-went-wrong"),
        severity: "error",
      });
    },
  });

  const t = useI18n();

  const conf: Columns = [
    { title: t("int.name"), key: "name" },
    {
      title: t("int.draught"),
      render: (obj) => (
        <>
          <Typography component="span">{obj.draught ?? "-"}</Typography>
          <br />
          <Typography variant="caption" component="span">
            {t("int.meters")}
          </Typography>
        </>
      ),
    },
    {
      title: t("int.length"),
      render: (obj) => (
        <>
          <Typography component="span">{obj.length ?? "-"}</Typography>
          <br />
          <Typography variant="caption" component="span">
            {t("int.meters")}
          </Typography>
        </>
      ),
    },
    {
      title: t("int.width"),
      render: (obj) => (
        <>
          <Typography component="span">{obj.width ?? "-"}</Typography>
          <br />
          <Typography variant="caption" component="span">
            {t("int.meters")}
          </Typography>
        </>
      ),
    },

    {
      title: t("int.actions"),
      render: (obj: SpotInfo) => (
        <>
          <IconButton
            size="small"
            onClick={() => history.push(`/vessels/${obj._id}`)}
            title={t("int.edit")}
          >
            <EditIcon />
          </IconButton>
          &nbsp; &nbsp;
          <IconButton
            onClick={() => _deleteSpot(`${obj._id}`)}
            size="small"
            title={t("int.delete")}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <OverTableHeader
        title={t("int.vessels")}
        actions={
          <>
            <Button
              size="small"
              component={Link}
              to={"/vessels/new"}
              variant="outlined"
            >
              {t("int.create-new-spot")}
            </Button>
          </>
        }
      />
      <br />
      <MTable loading={isFetching} conf={conf} {...vessels} />
    </>
  );
}

export default List;
