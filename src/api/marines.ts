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

type CreateUpdate = { id: string } & Marine;
export async function createNewMarine(info: CreateUpdate): Promise<Marine> {
  const { ...marine } = info;
  return await api
    .post(URL, {
      json: marine,
    })
    .json();
}

export async function updateMarine(info: CreateUpdate): Promise<Marine> {
  const { id, ...marine } = info;
  return await api
    .put(`${URL}/${id}`, {
      json: marine,
    })
    .json();
}

export async function deleteMarine(id: String) {
  return await api.delete(`${URL}/${id}`);
}

export async function getMarineById(
  c: QueryFunctionContext<[string, string]>
): Promise<Marine> {
  const [, id] = c.queryKey;
  return await api.get(`${URL}/${id}`).json();
}
