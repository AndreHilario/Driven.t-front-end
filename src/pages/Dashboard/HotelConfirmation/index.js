import styled from 'styled-components';
import colors from '../../../constants/colors';
import HotelContext from '../../../contexts/HotelContext';
import { useContext, useEffect, useState } from 'react';
import hotelsFake from '../Hotel/mockHotels';
import { Link } from 'react-router-dom';
import { bookingUserId } from '../../../services/bookingUserIdApi';
import useToken from '../../../hooks/useToken';

export default function HotelConfirmation() {
  const token = useToken();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [number, setNumber] = useState();
  const [vacancy, setVacancy] = useState();
  const [booking, setBooking] = useState(null);
  const { hotelData } = useContext(HotelContext);

  useEffect(async() => {
    const types = ['Single', 'Double', 'Triple'];
    const hotelSelected = hotelsFake[hotelData.hotelId - 1];
    const userBooking = await bookingUserId(token);
    setBooking(userBooking);
    // setImage(hotelSelected.image);
    // setName(hotelSelected.name);
    // setNumber(hotelSelected.Rooms[hotelData.roomId - 1].name);
    // setType(types[hotelSelected.Rooms.length - 1]);
    let bedsOccuped = 0;
    (hotelSelected.Rooms[hotelData.roomId - 1].beds)?.forEach((data) => {
      if(data.bed === 'personOccupied') {
        bedsOccuped ++;
      }
    });
    setVacancy(bedsOccuped);
  }, []); 
  console.log(booking);

  return (
    <Main>
      <div>
        <ImageCard>
          <img src={image} alt='name' />
        </ImageCard>
        <HotelInformations>
          <h2>{name}</h2>
          <h6><strong>Quarto reservado</strong></h6>
          <Description>{number} ({type})</Description>
          <h6><strong>Pessoas no seu quarto</strong></h6>
          <Description>você e mais {vacancy}</Description>
        </HotelInformations>
      </div>
      <Link to='/dashboard/hotel'>
        <ButtonContainer>TROCAR QUARTO</ButtonContainer>
      </Link>
    </Main>
  );
};

const Main = styled.div`
  width: 200px;
  height: 264px;
  background-color: ${colors.selectedItemBackground};

  padding: 15px 0px;
  margin-right: 20px;
  border-radius: 10px;

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
