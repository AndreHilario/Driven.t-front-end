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
import { reserveRoom } from '../../../services/bookingUserIdApi';
import { useNavigate } from 'react-router-dom';

export default function Hotel() {
  const enrollment = useEnrollment();
  const ticket = useTicketByUserId();
  const isEnrollmentValid = !enrollment || !ticket || ticket?.status === 'RESERVED';
  const isRoomSelectionValid = ticket?.status === 'PAID' && (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false);

  const token = useToken(); 
  const navigate = useNavigate();

  const [hotels, setHotels] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(async() => {
    const hotel = await getHotel(token);
    setHotels(hotel);
  }, []);

  async function makeReserve() {
    await reserveRoom(token, { roomId: selectedRoomId });
    navigate('/dashboard/confirmation');
  }

  return (
    <Main>
      {isEnrollmentValid || isRoomSelectionValid ? (
        <ErrorScreen />
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
                  />
                );
              })}
            </HotelsContainer>
          ) : null }
          {rooms?(
            <RoomContainer>
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
