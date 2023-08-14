/* eslint-disable */
import api from './api';


//começar apartir das apis 
//não esquecer de alterar dateApi.js 

//post para se inscrever em uma atividade
export async function postSeat(token, activityId) {
  const body = {
    'activityId': activityId
  }


  await api.post('/activities/subscription', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })


  return  window.location.reload()

}



//get para obter as atividades de de um usuario
export async function getUserSeats(token) {
  try {
    const response = await api.get('/activities/seats/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (errors) {

    return null

  }
}



//get para obter todas as atividades de um dia('dayId')
export async function getActivitiesByDayId(token, dayId) {
  try {
    const response = await api.get(`/activities/day/${dayId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (errors) {
    return null
  }
}

