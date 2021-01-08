import { QueryFunctionContext } from "react-query";
import api from "../ky";
import qs from "query-string";

const URL = `/api/vessels`;

export type PaginatedVessel = {
  data: Vessel[];
  total: number;
};

export type Vessel = {
  _id?: string;
  name: string;
  length: number;
  width: number;
  draught: number;
};

export async function getMyVessels(
  c: QueryFunctionContext<[string, Record<string, string>]>
): Promise<PaginatedVessel> {
  return await api.get(`${URL}?${qs.stringify(c.queryKey[1])}`).json();
}

export async function getVesselById(
  c: QueryFunctionContext<[string, string]>
): Promise<Vessel> {
  const [, id] = c.queryKey;
  return await api.get(`${URL}/${id}`).json();
}

type CreateUpdateSpot = { _id: string } & Vessel;
export async function createVessel(info: CreateUpdateSpot) {
  const { _id, ...vessel } = info;

  return await api
    .post(URL, {
      json: vessel,
    })
    .json();
}

export async function updateVessel(info: CreateUpdateSpot) {
  const { _id, ...spot } = info;
  return await api
    .put(`${URL}/${_id}`, {
      json: spot,
    })
    .json();
}

export async function deleteVessel(id: string) {
  return await api.delete(`${URL}/${id}`);
}
