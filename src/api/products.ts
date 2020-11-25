import api from '../ky';
import qs from 'query-string';

const URL = `/api/products`;

export async function getProducts(
  _key: string,
  _params: Record<string, any>
): Promise<any> {
  const params = qs.stringify(_params);
  return await api.get(`${URL}?${params}`).json();
}

export async function deleteProduct(id: string): Promise<any> {
  return await api.delete(`${URL}/${id}`).json();
}
