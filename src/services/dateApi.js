/* eslint-disable */
import api from './api';


//so obter os dias
//antigo /activitiesspace

export async function getDates(token) {
  const response = await api.get('/date', {
    headers: {
      Authorization: `Bearer ${token}`,
    } 
  })

  return response.data

}