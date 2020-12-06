import React from "react";
import { useI18n } from "../../../I18n";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OverTableHeader from "../../../components/OverTableHeader";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { queryCache, useMutation, usePaginatedQuery } from "react-query";
import MTable from "../../../components/Table";
import { Columns } from "../../../components/Table/types";
import { formatDate, getAllParams } from "../../../utils";
import { useSnack } from "../../../provider/SnackBarProvider";
import { deleteSpot, getSpots, Spot } from "../../../api/spots";

function List() {
  const setSnack = useSnack();
  const history = useHistory();
  const params = getAllParams(history.location.search);

  const {
    resolvedData: spots = { total: 0, data: [] },
    isFetching,
  } = usePaginatedQuery(["spots", params], getSpots);

  const [_deleteMarine] = useMutation(deleteSpot, {
    onSuccess: () => {
      setSnack({
        msg: t("int.marine-deleted-successfully"),
        severity: "success",
      });
      queryCache.invalidateQueries("spots");
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
    {
      title: t("int.date-created"),
      render: (obj: Spot) => formatDate(obj.date_created),
    },
    {
      title: t("int.actions"),
      render: (obj: Spot) => (
        <>
          <IconButton size={"small"} title={t("int.edit")}>
            <EditIcon />
          </IconButton>
          &nbsp; &nbsp;
          <IconButton
            onClick={() => _deleteMarine(obj.id)}
            size={"small"}
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
      <MTable loading={isFetching} conf={conf} {...spots} />
    </>
  );
}

export default List;
