import { css } from "emotion";

export const container = css`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  &.isSmallDevice {
    grid-template-columns: 0px 100vw;
  }
  grid-template-columns: 220px calc(100vw - 220px);
  grid-template-rows: 64px 100%;
  grid-template-areas:
    "header header"
    ". main";
`;

export const header = css`
  grid-area: header;
`;

export const main = css`
  grid-area: main;
`;
