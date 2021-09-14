import http, { header } from '../http/httpConfig';

const apiUrl = '/user';

export async function populateUserTable(newUser) {
  return await http.post(`{apiUrl}/populate-table`, { ...header });
}

export async function getAllUsers() {
  return await http.post(`${apiUrl}`, { ...user }, { headers: { ...header } });
}

export async function getDistinctValues() {
  return await http.get(`${apiUrl}/distinct-value`, { headers: { ...header } });
}

const user = {
  userPageRequest: {
    pageNumber: 1,
    pageSize: 20
  }
  ,

  userFilterRequest: {
    // workCategory: "unemployed",
    // interest: "Bullet journaling"

  }
}

