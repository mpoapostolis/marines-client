import React, { useEffect, useMemo } from "react";
import { Columns, Data } from "./types";

import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { getTableParams } from "../../utils";
import qs from "query-string";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      "&.loading": {
        opacity: 0.5,
      },
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },

    row: {
      "&.loading": {
        opacity: 0.5,
      },
    },

    rootHeader: {
      display: "flex",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    spacer: {
      marginLeft: "auto",
    },
    highlight: {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    },
    title: {
      flex: "1 1 100%",
    },
  })
);

type Props = {
  conf: Columns;
  loading?: boolean;
  data: Data;
  total: number;
};

function MTable(props: Props) {
  const classes = useStyles();
  const history = useHistory();

  const tableParams = getTableParams(history.location.search);
  const allParams = qs.parse(history.location.search);

  const params = { ...tableParams, ...allParams };
  useEffect(() => {
    history.replace({
      search: qs.stringify(params),
    });
  }, []); // eslint-disable-line

  const handleChangePage = (_event: unknown, offset: number) =>
    history.push({
      search: qs.stringify({ ...params, offset }),
    });

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    history.push({
      search: qs.stringify({ ...params, offset: 0, limit: event.target.value }),
    });

  const headers = useMemo(() => props.conf.map((col) => col.title), [
    props.conf,
  ]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                {headers.map((title) => (
                  <TableCell key={title}>{title}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {props.data.map((row, idx) => (
                <TableRow
                  className={clsx([classes.row, props.loading && "loading"])}
                  key={idx}
                  hover
                  tabIndex={-1}
                >
                  {props.conf.map((column, idx) => (
                    <TableCell key={idx}>
                      {"render" in column
                        ? column.render(row, idx)
                        : row[column.key] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.total}
          rowsPerPage={params.limit}
          page={params.offset}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default MTable;
