import React from "react";
import { useI18n } from "../../../I18n";

import OverTableHeader from "../../../components/OverTableHeader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getMarines, Marine } from "../../../api/marines";
import { usePaginatedQuery } from "react-query";
import MTable from "../../../components/Table";
import { Columns } from "../../../components/Table/types";
import { formatDate } from "../../../utils";

function List() {
  const { resolvedData: marines = [] } = usePaginatedQuery(
    "marines",
    getMarines
  );
  const t = useI18n();

  const conf: Columns = [
    { title: t("int.name"), key: "name" },
    {
      title: t("int.date-created"),
      render: (obj: Marine) => formatDate(obj.date_created),
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
      <MTable conf={conf} data={marines} />
    </>
  );
}

export default List;
