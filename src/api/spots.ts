import { QueryFunctionContext } from "react-query";
import qs from "query-string";
import api from "../ky";

const URL = `/api/spots`;

export type PaginatedSpot = {
  data: SpotInfo[];
  total: number;
};

export type SpotService = {
  name: string;
  description: string;
  __id?: string;
};

export type SpotInfo = {
  _id?: string;
  name: string;
  price: number;
  length: number;
  marineName?: string;
  width: number;
  draught: number;
  services: SpotService[];
  coords: { lat: number; lng: number }[];
};

export async function getMySpots(
  c: QueryFunctionContext<[string, Record<string, string>]>
): Promise<PaginatedSpot> {
  return await api.get(`${URL}?${qs.stringify(c.queryKey[1])}`).json();
}

export async function getSpotById(
  c: QueryFunctionContext<[string, string]>
): Promise<SpotInfo> {
  const [, id] = c.queryKey;
  return await api.get(`${URL}/${id}`).json();
}
type CreateUpdateSpot = { id: string } & SpotInfo;
export async function createSpot(info: CreateUpdateSpot) {
  const { id, ...spot } = info;

  return await api
    .post(URL, {
      json: spot,
    })
    .json();
}

export async function updateSpot(info: CreateUpdateSpot) {
  const { id, ...spot } = info;
  return await api
    .put(`${URL}/${id}`, {
      json: spot,
    })
    .json();
}

export async function deleteSpot(id: string) {
  return await api.delete(`${URL}/${id}`);
}
