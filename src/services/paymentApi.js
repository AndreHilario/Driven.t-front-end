/* eslint-disable */
import api from './api'

export async function pagar(body, token) {

  await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })


  return window.location.reload()
}