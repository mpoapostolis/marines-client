import api from "../ky";
import qs from "query-string";

const URL = `/api/spots`;

export type PaginatedMarine = {
  total: number;
  data: Spot[];
};

export type Spot = {
  id?: string;
  name: string;
  price: number;
  marine_id?: string;
  length: number;
  draught: number;
  available: Boolean;
  coords: number[];
  date_created: Date;
};

export async function getSpots(
  _key: string,
  params: Record<string, string>
): Promise<PaginatedMarine> {
  return api.get(`${URL}?${qs.stringify(params)}`).json();
}

export async function createNewMarine(marine: Spot): Promise<Spot> {
  return await api
    .post(URL, {
      json: marine,
    })
    .json();
}

export async function deleteSpot(id: String) {
  return await api.delete(`${URL}/${id}`);
}
