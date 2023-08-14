import styled from 'styled-components';
import colors from '../../../constants/colors';
import HotelContext from '../../../contexts/HotelContext';
import { useContext, useEffect, useState } from 'react';
import hotelsFake from '../Hotel/mockHotels';
import { Link } from 'react-router-dom';
import { bookingUserId } from '../../../services/bookingUserIdApi';
import useToken from '../../../hooks/useToken';
import { filterAccomodationType, sumVacancyOnRooms } from '../Hotel/utils';
import Room from '../../../components/Hotels/Room';

export default function HotelConfirmation() {
  const accomodationTypes = ['Single', 'Double', 'Triple'];
  const [hotelData, setHotelData] = useState({
    image: '',
    name: '',
    occupants: '',
    roomNumber: '',
    type: '',
  });

  const token = useToken();
  useEffect(async() => {
    const { Room } = await bookingUserId(token);
    const { name, image } = Room.Hotel;
    setHotelData({
      image: image,
      name: name,
      occupants: Room.occupants,
      roomNumber: Room.name,
      type: accomodationTypes[Room.capacity - 1],
    });
  }, []);
  return (
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
      <Anchor href='/dashboard/hotel'>
        <ButtonContainer>TROCAR QUARTO</ButtonContainer>
      </Anchor>
    </Main>
  );
};
const Main = styled.main``;

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

const ButtonContainer = styled.button`
  width: 180px;
  height: 40px;
  
  border: 1px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);;

  &:hover{
    background-color: ${colors.selectedItemBackground};
    cursor: pointer;
  }
`;

const Anchor = styled.a`
background-color: red;
  margin-top: 50px;
`;
