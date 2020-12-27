import React from "react";
import { useI18n } from "../../../I18n";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OverTableHeader from "../../../components/OverTableHeader";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { deleteMarine, getMarines, Marine } from "../../../api/marines";
import { useMutation } from "react-query";
import { useQuery, useQueryClient } from "react-query";

import MTable from "../../../components/Table";
import { Columns } from "../../../components/Table/types";
import { formatDate, getTableParams } from "../../../utils";
import { useSnack } from "../../../provider/SnackBarProvider";

function List() {
  const setSnack = useSnack();
  const history = useHistory();
  const params = getTableParams(history.location.search);
  const queryClient = useQueryClient();

  const { data: marines = { total: 0, data: [] }, isFetching } = useQuery(
    ["marines", params],
    getMarines,
    { keepPreviousData: true }
  );

  const { mutate: _deleteMarine } = useMutation(deleteMarine, {
    onSuccess: () => {
      setSnack({
        msg: t("int.marine-deleted-successfully"),
        severity: "success",
      });
      queryClient.invalidateQueries("marines");
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
      title: t("int.date-created"),
      render: (obj: Marine) => formatDate(obj.date_created),
    },
    {
      title: t("int.actions"),
      render: (obj: Marine) => (
        <>
          <IconButton
            onClick={() => history.push(`/marines/${obj._id}`)}
            size={"small"}
            title={t("int.edit")}
          >
            <EditIcon />
          </IconButton>
          &nbsp; &nbsp;
          <IconButton
            onClick={() => _deleteMarine(`${obj._id}`)}
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
        title={t("int.marines")}
        actions={
          <>
            <Button
              size="small"
              component={Link}
              to={"/marines/new"}
              variant="outlined"
            >
              {t("int.create-new-marine")}
            </Button>
          </>
        }
      />
      <br />
      <MTable loading={isFetching} conf={conf} {...marines} />
    </>
  );
}

export default List;
