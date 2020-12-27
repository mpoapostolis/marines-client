import React, { ReactNode } from "react";
import { Typography } from "@material-ui/core";
import { css } from "emotion";

const container = css`
  display: flex;
  align-items: center;
  min-width: 65px;
`;

function IconRepresentation(props: { howMany: number; children: ReactNode }) {
  return (
    <div className={container}>
      {props.howMany > 0 ? (
        <>
          {props.children}
          <Typography style={{ marginLeft: "10px" }} variant="body2">
            x {props.howMany}
          </Typography>
        </>
      ) : (
        "-"
      )}
    </div>
  );
}

export default IconRepresentation;
