import api from "../ky";

const URL = `/api/users/infos`;

export type User = {
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

export async function getUserInfo(): Promise<User> {
  return api.get(`${URL}`).json();
}
