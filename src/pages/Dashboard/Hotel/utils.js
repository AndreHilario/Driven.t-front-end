export function filterAccomodationType(Rooms) {
  const typeRoom = ['Single', 'Double', 'Triple'];
  const hash = {};

  Rooms.forEach((room) => hash[room.capacity - 1] = typeRoom[room.capacity - 1]);

  const arrHash = [];

  for(let i = 0; i < 3; i ++) {
    if(hash[i] !== undefined) arrHash.push(hash[i]);
  }

  let result = '';

  arrHash.forEach((item, index) => {
    if(index + 1 === arrHash.length) { //se for a ultima iteração
      result += 'e ' + item;
    }else if(index + 1 === arrHash.length - 1) { //se for a penultima iteração
      result += item + ' ';
    }else{
      result += item + ', ';
    }
  });

  return result;
};

export function sumVacancyOnRooms(Rooms) {
  let vacancy = 0;
  Rooms.forEach(room => {
    vacancy += room.capacity;
  });
  return vacancy;
}

export function createBedsArray(capacity, numberOfOccupiedBeds) {
  const beds = [];
  for (let i = 0; i < capacity; i++) {
    beds.push({ bed: i < numberOfOccupiedBeds ? 'personOccupied' : 'person' });
  }
  return beds;
}

export function calculateOcuppiedRooms(hotelsWithRooms, bookings) {
  const rooms = [];
  hotelsWithRooms.forEach((hotel) => rooms.push(...hotel.Rooms));

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const bookingsForRoom = bookings.filter((booking) => {
      return (
        room.id === booking.roomId &&
          room.hotelId === booking.hotelId
      );
    });

    rooms[i].beds = createBedsArray(room.capacity, bookingsForRoom.length);
  }
  return rooms;
}
