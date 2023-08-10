import api from './api';

export async function activitiesApi(token) {
  const response = await api.get('/activitiesspace', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;}
