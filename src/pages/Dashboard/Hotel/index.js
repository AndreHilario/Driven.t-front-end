import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import HotelComponent from '../../../components/Hotels/HotelComponent';
import hotelsFake from './mockHotels';
import Room from '../../../components/Hotels/Room';
import colors from '../../../constants/colors';
import bookingsFake from './mockBookings';
import HotelContext from '../../../contexts/HotelContext';
import { Link } from 'react-router-dom';
import { calculateOcuppiedRooms } from './utils';

export default function Hotel() {
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(null);
  const [rooms, setRooms] = useState(null);
  const { hotelData, setHotelData } = useContext(HotelContext);

  useEffect(() => {
    const result = calculateOcuppiedRooms(hotelsFake, bookingsFake);
    setRooms(result);

    const hotelData = {
      hotelId: selectedHotelId,
      roomId: selectedRoomId,
    };

    setHotelData(hotelData);
  }, [selectedHotelId, selectedRoomId]);

  return (
    <Main>
      <h1>Escolha de hotel e quarto</h1>
      <p>Primeiro, escolha seu hotel</p>

      <HotelsContainer>
        {hotelsFake.map((hotel) => (
          <HotelComponent
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            image={hotel.image}
            Rooms={hotel.Rooms}
            isSelected={selectedHotelId === hotel.id}
            selectedHotelId={selectedHotelId}
            setSelectedHotelId={setSelectedHotelId}
          >
          </HotelComponent>))
        }
      </HotelsContainer>
      {
        selectedHotelId !== null ?(
          <RoomContainer>
            <Block>
              <p>Ótima pedida! agora escolha seu quarto.</p>
            </Block>
            {rooms.map((room) => {
              return <Room 
                key={room.id + room.name} 

                id={room.id}
                hotelId={room.hotelId}
                type={room.capacity}
                number={room.name}
                beds={room.beds}
                
                selectedHotelId={selectedHotelId}
                selectedRoomId={selectedRoomId}
                setSelectedRoomId={setSelectedRoomId}
                selectedPersonIndex={selectedPersonIndex}
                setSelectedPersonIndex={setSelectedPersonIndex}
              />;
            })}
          </RoomContainer>
        ) : ( '' )
      }
      {
        selectedRoomId ? (
          <Link to='/dashboard/confirmation'>
            <ButtonContainer >RESERVAR QUARTO</ButtonContainer>
          </Link>
        ) : ( '' )
      }
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

const Block = styled.div`
  width: 100%;
  margin: 33px 0px;

  p{
    color: ${colors.paragraph};
    margin: 0;
  }
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
  a{
    color: black;
    font-size: 14px;
    margin: auto;
    font-family: 'Roboto';
    text-decoration: none;
  }
`;
