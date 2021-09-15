import http, { header } from '../http/httpConfig';

const apiUrl = '/user';

export async function populateUserTable(newUser) {
  return await http.post(`{apiUrl}/populate-table`, { ...header });
}

export async function getAllUsers(getUsersRequestBody) {
  return await http.post(`${apiUrl}`, { ...getUsersRequestBody }, { headers: { ...header } });
}

export async function getDistinctValues() {
  return await http.get(`${apiUrl}/distinct-value`, { headers: { ...header } });
}

export async function addUser(getAddUserRequestBody) {
  return await http.post(`${apiUrl}/create-user`, { ...getAddUserRequestBody }, { headers: { ...header } });
}
