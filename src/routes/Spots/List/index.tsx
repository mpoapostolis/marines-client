import React, { useContext, useMemo } from "react";
import I18n from "../../../I18n";
import MaterialTable from "../../../components/Table";
import { Button, Typography, IconButton } from "@material-ui/core";
import { Columns } from "../../../components/Table/types";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import * as R from "ramda";
import { toast } from "react-toastify";
import { css } from "emotion";
import { usePaginatedQuery, useMutation, queryCache } from "react-query";
import { getProducts, deleteProduct } from "../../../api/products";

const marginRight = css`
  margin-right: 15px !important;
`;

function AllProducts() {
  const t = useContext(I18n);

  const history = useHistory();

  const params = queryString.parse(history.location.search);

  const { resolvedData: products, isFetching } = usePaginatedQuery(
    ["get-products", params],
    getProducts
  );
  const [_deleteProduct] = useMutation(deleteProduct, {
    onSuccess: () => {
      queryCache.invalidateQueries("get-products");
      toast.success(t("int.product-delete-successfully"));
    },
  });

  const columns: Columns = [
    {
      title: t("int.name"),
      field: "product_name",
    },
    {
      title: t("int.price"),
      render: (obj) => `${R.propOr("-", "price", obj)} €`,
    },

    {
      title: t("int.actions"),
      render: (obj: any) => (
        <>
          <IconButton
            classes={{ root: marginRight }}
            size={"small"}
            onClick={() => history.push(`/products/${obj.id}/edit`)}
            title={t("int.edit")}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            classes={{ root: marginRight }}
            size={"small"}
            onClick={() => _deleteProduct(obj.id)}
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
      <MaterialTable />
    </>
  );
}

export default AllProducts;
