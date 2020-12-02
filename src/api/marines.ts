import api from "../ky";
import qs from "query-string";

const URL = `/api/marines`;

export type PaginatedMarine = {
  total: number;
  data: Marine[];
};

export type Marine = {
  name: string;
  id?: string;
  date_created?: Date;
};

export async function getMarines(
  _key: string,
  params: Record<string, string>
): Promise<PaginatedMarine> {
  return api.get(`${URL}?${qs.stringify(params)}`).json();
}

export async function createNewMarine(marine: Marine): Promise<Marine> {
  return await api
    .post(URL, {
      json: marine,
    })
    .json();
}

export async function deleteMarine(id: String) {
  return await api.delete(`${URL}/${id}`);
}
