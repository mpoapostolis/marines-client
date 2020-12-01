import React from "react";
import { useI18n } from "../../../I18n";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import OverTableHeader from "../../../components/OverTableHeader";

function List() {
  const t = useI18n();
  return (
    <>
      <OverTableHeader
        title={t("int.spots")}
        actions={[
          <Button
            size="small"
            component={Link}
            to={"/spots/new"}
            variant="outlined"
          >
            {t("int.create-new-spot")}
          </Button>,
        ]}
      />
    </>
  );
}

export default List;
