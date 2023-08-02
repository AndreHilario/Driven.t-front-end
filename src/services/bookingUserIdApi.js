import api from './api';

export async function bookingUserId(token) {
  const response = await api.get('/booking', {
    headers: { Authorization: `Bearer ${token}`, },
  });

  return response.data;
}


