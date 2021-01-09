import { Box, Grid, Typography } from "@material-ui/core";
import { css } from "emotion";
import React from "react";

export const container = css`
  display: flex;
`;

export const title = css`
  width: 85px;
`;

type ServiceProps = {
  title: string;
  value: string;
  subNot: string;
};

export default function SpotInfoLint(props: ServiceProps) {
  return (
    <Box className={container}>
      <Typography className={title} color="textSecondary" component="span">
        {props.title}:
      </Typography>
      <Box>
        <Typography variant="h6" component="span">
          {props.value}
        </Typography>
        &nbsp;
        <Typography variant="caption">{props.subNot}</Typography>
      </Box>
    </Box>
  );
}
