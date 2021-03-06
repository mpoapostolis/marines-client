export type ColumnWithField = {
  title: string;
  key: string;
};

export type ColumnWithRender = {
  title: string;
  render: (obj: any, idx: number) => void;
};

export type Columns = (ColumnWithField | ColumnWithRender)[];

export type Data = Record<string, any>[];
