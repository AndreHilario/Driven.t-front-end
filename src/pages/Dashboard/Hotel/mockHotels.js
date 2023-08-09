const hotelsFake = [
  {
    id: 1,
    name: 'Hotel Grand Hyatt',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/1d/87/30/pool.jpg?w=700&h=-1&s=1',
    createdAt: '2023-08-02T12:34:56.789Z',
    updatedAt: '2023-08-02T12:34:56.789Z',
    Rooms: [
      {
        id: 101,
        name: '10',
        capacity: 1,
        hotelId: 1,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
      {
        id: 102,
        name: '11',
        capacity: 2,
        hotelId: 1,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
      {
        id: 103,
        name: '13',
        capacity: 2,
        hotelId: 1,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Hotel Marriott',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/0f/9f/11/exterior.jpg?w=700&h=-1&s=1',
    createdAt: '2023-08-02T12:34:56.789Z',
    updatedAt: '2023-08-02T12:34:56.789Z',
    Rooms: [
      {
        id: 1,
        name: '101',
        capacity: 3,
        hotelId: 2,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
      {
        id: 2,
        name: '102',
        capacity: 2,
        hotelId: 2,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
    ],
  },
  {
    id: 3,
    name: 'Hotel Hilton',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/73/ee/c6/exterior.jpg?w=700&h=-1&s=1',
    createdAt: '2023-08-02T12:34:56.789Z',
    updatedAt: '2023-08-02T12:34:56.789Z',
    Rooms: [
      {
        id: 1,
        name: '1017',
        capacity: 2,
        hotelId: 3,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
      {
        id: 2,
        name: '1062',
        capacity: 1,
        hotelId: 3,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
      {
        id: 3,
        name: '1045',
        capacity: 3,
        hotelId: 3,
        createdAt: '2023-08-02T12:34:56.789Z',
        updatedAt: '2023-08-02T12:34:56.789Z',
      },
    ],
  },
];

export default hotelsFake;