import api from './api';

export async function hotelApi(token) {
  const response = await api.get('/hotels/allHotelsWithRooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
