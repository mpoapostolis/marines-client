import { QueryFunctionContext } from "react-query";
import api from "../ky";

const URL = `/api/spots`;

export type PaginatedSpot = {
  data: SpotService[];
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
  draught: number;
  services: SpotService[];
  coords: { lat: number; lng: number }[];
};

export async function getMySpots(): Promise<PaginatedSpot> {
  return await api.get(URL).json();
}

export async function getSpotById(
  c: QueryFunctionContext<[string, string]>
): Promise<SpotInfo> {
  const [, id] = c.queryKey;
  return await api.get(`${URL}/${id}`).json();
}

export async function createSpot(spot: SpotInfo) {
  return await api
    .post(URL, {
      json: spot,
    })
    .json();
}

export async function deleteSpot(id: String) {
  return await api.delete(`${URL}/${id}`);
}
