import http, { header } from '../http/httpConfig';

const apiUrl = '/user';

export async function populateUserTable(newUser) {
  return await http.post(`{apiUrl}/populate-table`, { ...header });
}

export async function getAllUsers(fetchUsersRequest) {
  return await http.post(`${apiUrl}`, { ...fetchUsersRequest }, { headers: { ...header } });
}

export async function getDistinctValues() {
  return await http.get(`${apiUrl}/distinct-value`, { headers: { ...header } });
}
