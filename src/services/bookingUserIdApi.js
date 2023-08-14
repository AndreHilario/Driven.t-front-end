import api from './api';

export async function bookingUserId(token) {
  const response = await api.get('/booking', {
    headers: { Authorization: `Bearer ${token}`, },
  });

  return response.data;
};

export async function allBookings(token) {
  const response = await api.get('/booking/allBookings', {
    headers: { Authorization: `Bearer ${token}`, },
  });

  return response.data;
};

export async function bookingByRoomId(token, roomId) {
  const response = await api.get(`/booking/${roomId}`, {
    headers: { Authorization: `Bearer ${token}`, },
  });

  return response.data;
};

export async function reserveRoom(token, body) {
  const response = await api.post('/booking', body, {
    headers: { Authorization: `Bearer ${token}`, },
  });
  return response.data;
};

export async function deleteBooking(token, bookingId) {
  const response = await api.delete(`/booking/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}`, },
  });
  return response.data;
};
