import React from "react";
import { useI18n } from "../../../I18n";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OverTableHeader from "../../../components/OverTableHeader";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import MTable from "../../../components/Table";
import { Columns } from "../../../components/Table/types";
import { getAllParams } from "../../../utils";
import { useSnack } from "../../../provider/SnackBarProvider";
import { deleteSpot, getMySpots, SpotInfo } from "../../../api/spots";
import IconRepresentation from "../../../components/IconRepresentation";
import EvStationIcon from "@material-ui/icons/EvStation";

function List() {
  const setSnack = useSnack();
  const history = useHistory();
  const params = getAllParams(history.location.search);

  const queryClient = useQueryClient();

  const { data: spots = { total: 0, data: [] }, isFetching } = useQuery(
    ["spots", params],
    getMySpots,
    {
      keepPreviousData: true,
    }
  );

  useMutation(deleteSpot, {
    onSuccess: () => {
      setSnack({
        msg: t("int.marine-deleted-successfully"),
        severity: "success",
      });
      queryClient.invalidateQueries("spots");
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
    { title: t("int.draught"), key: "draught" },
    { title: t("int.length"), key: "length" },
    { title: t("int.price"), key: "price" },
    {
      title: t("int.services"),
      render: (obj: SpotInfo) => (
        <IconRepresentation howMany={obj.services.length}>
          <IconButton>
            <EvStationIcon />
          </IconButton>
        </IconRepresentation>
      ),
    },
    {
      title: t("int.actions"),
      render: (obj: SpotInfo) => (
        <>
          <IconButton
            size="small"
            onClick={() => history.push(`/spots/${obj._id}`)}
            title={t("int.edit")}
          >
            <EditIcon />
          </IconButton>
          &nbsp; &nbsp;
          <IconButton size="small" title={t("int.delete")}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <OverTableHeader
        title={t("int.spots")}
        actions={
          <>
            <Button
              size="small"
              component={Link}
              to={"/spots/new"}
              variant="outlined"
            >
              {t("int.create-new-spot")}
            </Button>
          </>
        }
      />
      <br />
      {/* <MTable total={100} loading={isFetching} conf={conf} {...spots} /> */}
    </>
  );
}

export default List;
