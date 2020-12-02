import { format } from "date-fns";
import qs from "query-string";
import * as R from "ramda";

export const formatDate = (d?: Date) => {
  if (!d) return "-";
  const date = new Date(d);

  return format(date.getTime(), "d MMM yyy, HH:mm");
};

export const debounce = (func: any, wait: any, immediate?: any) => {
  let timeout: any;

  return function (...args: any) {
    //@ts-ignore
    let context = this;

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    if (immediate && !timeout) {
      func.apply(context, args);
    }
  };
};

export const EUROSIGN = "€";
export const SECOND = 1000;

export type TableParams = {
  offset: number;
  limit: number;
  searchTerm?: string;
  sort?: string;
};

export const getTableParams = (q: string) => {
  const obj = R.pickAll<qs.ParsedQuery<string>, TableParams>(
    ["offset", "limit", "searchTerm", "sort"],
    qs.parse(q)
  );
  return {
    ...obj,
    offset: obj.offset ? +obj.offset : 0,
    limit: obj.limit ? +obj.limit : 10,
    searchTerm: obj.searchTerm,
    sort: obj.sort,
  };
};
