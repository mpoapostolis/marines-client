import api from "../ky";
import qs from "query-string";
import { QueryFunctionContext } from "react-query";

const URL = `/api/marines`;

export type PaginatedMarine = {
  total: number;
  data: Marine[];
};

export type Marine = {
  name: string;
  _id?: string;
  date_created?: Date;
};

export async function getMarines(
  c: QueryFunctionContext<[string, Record<string, string>]>
): Promise<PaginatedMarine> {
  const [, params] = c.queryKey;

  return api.get(`${URL}?${qs.stringify(params)}`).json();
}
