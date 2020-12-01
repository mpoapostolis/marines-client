import React from "react";
import { useI18n } from "../../../I18n";

import OverTableHeader from "../../../components/OverTableHeader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function List() {
  const t = useI18n();
  return (
    <>
      <OverTableHeader
        title={t("int.marines")}
        actions={[
          <Button
            size="small"
            component={Link}
            to={"/marines/new"}
            variant="outlined"
          >
            {t("int.create-new-marine")}
          </Button>,
        ]}
      />
    </>
  );
}

export default List;
