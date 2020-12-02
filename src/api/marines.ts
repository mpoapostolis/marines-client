import api from "../ky";

const URL = `/api/marines`;

export type Marine = {
  name: string;
  date_created?: Date;
};

export async function getMarines(_key: string): Promise<Marine[]> {
  return api.get(URL).json();
}

export async function createNewMarine(marine: Marine): Promise<Marine> {
  return await api
    .post(URL, {
      json: marine,
    })
    .json();
}
