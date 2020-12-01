import api from "../ky";

const URL = `/api/marines`;

export type Marine = {
  name: string;
};

export async function createNewMarine(marine: Marine): Promise<any> {
  return await api
    .post(URL, {
      json: marine,
    })
    .json();
}
