import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketByUserId from '../../../hooks/api/useTicketByUserId';
import ErrorScreen from '../../../components/Hotels/NoHaveTicketsComponent';
import colors from '../../../constants/colors';
import { getHotel } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';
import HotelComponent from '../../../components/Hotels/HotelComponent';
import Room from '../../../components/Hotels/Room';
import { bookingUserId, deleteBooking, reserveRoom } from '../../../services/bookingUserIdApi';

export default function Hotel() {
  const enrollment = useEnrollment();
  const ticket = useTicketByUserId();
  const isEnrollmentValid = !enrollment || !ticket || ticket?.status === 'RESERVED';
  const isRoomSelectionValid = ticket?.status === 'PAID' && (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false);

  const accomodationTypes = ['Single', 'Double', 'Triple'];
  const token = useToken(); 

  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [hotels, setHotels] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [hotelData, setHotelData] = useState({
    image: '',
    name: '',
    occupants: '',
    roomNumber: '',
    type: '',
  });

  useEffect(async() => {

  }, []);

  useEffect(async() => {
    const hotel = await getHotel(token);
    setHotels(hotel);
    const booking = await bookingUserId(token);
    const { Room } = booking;
    const { name, image } = Room.Hotel;
    if(Room) {
      setHotelData({
        image: image,
        name: name,
        occupants: Room.occupants,
        roomNumber: Room.name,
        type: accomodationTypes[Room.capacity - 1],
      });
      setBookingId(booking.id);
    }
  }, [reservationSuccess]);

  async function changeRoom() {
    await deleteBooking(token, bookingId);
    setHotelData({});
  }

  async function makeReserve() {
    await reserveRoom(token, { roomId: selectedRoomId });
    setReservationSuccess(!reservationSuccess); //controla o recarregamento da página
  }
  return (
    <Main>
      {isEnrollmentValid || isRoomSelectionValid ? (
        <ErrorScreen />
      ) : hotelData.name? (
        <Main>
          <HotelContainer>
            <div>
              <ImageCard>
                <img src={hotelData.image} alt='name' />
              </ImageCard>
              <HotelInformations>
                <h2>{hotelData.name}</h2>
                <h6><strong>Quarto reservado</strong></h6>
                <Description>{hotelData.roomNumber} ({hotelData.type})</Description>
                <h6><strong>Pessoas no seu quarto</strong></h6>
                <Description>você{hotelData.occupants < 2 ? '' : 'e mais ' + (hotelData.occupants - 1)}</Description>
              </HotelInformations>
            </div>
          </HotelContainer>
          <ButtonContainer onClick={() => changeRoom()}>TROCAR QUARTO</ButtonContainer>
        </Main>
      ) : (
        <>
        
          <h1>Escolha de hotel e quarto</h1>
          <p>Primeiro, escolha seu hotel</p>

          {hotels? (
            <HotelsContainer>
              {hotels.map((hotel) => {
                return( 
                  <HotelComponent 
                    key={hotel.id} 
                    id={hotel.id} 
                    image={hotel.image} 
                    name={hotel.name} 
                    setRooms={setRooms} 
                    selected={selectedHotelId === hotel.id}
                    setSelectedHotelId={setSelectedHotelId}
                  />
                );
              })}
            </HotelsContainer>
          ) : null }
          {rooms?(
            <RoomContainer>
              <BlockRow>
                <p>Ótima pedida! agora escolha seu quarto</p>
              </BlockRow>
              {rooms.map((room) => {
                return (
                  <Room 
                    key={room.id} 
                    room={room}
                    setSelectedRoomId={setSelectedRoomId}
                    selected={selectedRoomId === room.id}
                  />
                );
              })}
            </RoomContainer>
          ) : null
          }
          {selectedRoomId? (
            <ButtonContainer onClick={() => makeReserve() }>
              RESERVAR QUARTO
            </ButtonContainer>
          ) : null }

        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  font-family: 'Roboto', sans-serif;
  h1{
    font-size: 34px;
    margin-bottom: 50px;
  }
  p{
    color: ${colors.paragraph};
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const HotelsContainer = styled.div`
  display: flex;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BlockRow = styled.div`
  margin: 35px 0px 15px 0px;
  height: min-content;
  display: block;
  width: 100%;
`;

const ButtonContainer = styled.button`
  width: 180px;
  height: 40px;
  
  border: 1px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);;
  margin-top: 50px;
  &:hover{
    background-color: ${colors.selectedItemBackground};
    cursor: pointer;
  }
`;

const HotelContainer = styled.div`
  width: 200px;
  height: 264px;
  background-color: ${colors.selectedItemBackground};

  padding: 15px 0px;
  margin-right: 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  div {
    h2 {
      font-size: 20px;
    }
  }
`;

const ImageCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

  img {
    border-radius: 5px;
    width: 170px;
  }
`;

const HotelInformations = styled.div`
  padding: 0px 15px;
  h2 {
    margin-bottom: 10px;
  }
  h6 {
    font-size: 12px;
    margin-bottom: 2px;
  }
`;

const Description = styled.h3`
  font-size: 12px;
  margin-bottom: 15px;
`;
