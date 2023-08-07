
import { useState, useEffect } from 'react';
import useBookingUserId from '../../hooks/api/useBookingUserId';
import styled from 'styled-components';

export default function BookingResumePage() {
  const { bookingIdUser } = useBookingUserId();
  const [toForward, setToForward] = useState(false);
  const [bookingByUserId, setBookingByUserId] = useState([]);
  const [userRoom, setUserRoom] = useState(null);
  const [userHotel, setUserHotel] = useState(undefined);
  const [ticketStatus, setTicketStatus] = useState('');

  useEffect(() => {
    const fetchData = async() => {
      try {
        const bookingByUser = await bookingIdUser();
        setBookingByUserId(bookingByUser);
      } catch (error) {
  
      }
    };
    fetchData();}, []);

  const fetchChange = () => {setToForward(true);};

  const fetchList = () => {
    if (bookingByUserId.id) {
      if (userRoom) {

        try {

          // Limpar o histórico de reserva anterior 
          
          setBookingByUserId([]);
          setUserRoom(null);
  
          // Recarregar a página para voltar à parte de escolhas de hoteis

          window.location.reload();
        } catch (error) {
        }
      }
    }
  }; 

  const roomCapacity = (capacity) => {
    switch (capacity) {
    case 1:
      return 'Single';
    case 2:
      return 'Double';
    case 3:
      return 'Triple';
    case 4:
      return 'Group';
    default:
      return '';
    }
  };

  function roomOccupants(occupants) {
    if (occupants < 2) return 'Apenas você';
    else return `Você e mais ${occupants - 1} pessoa${occupants > 2 ? 's' : ''}`;
  }  

  if (userHotel === true && ticketStatus === 'PAID') {
    if (bookingByUserId.id && toForward === false) {
      
      return (
        <BookingResumeContainer>
          <MainTitle>
            <h1>Escolha de hotel e quarto</h1>
            <h2>Você já escolheu seu quarto:</h2>
          </MainTitle>
          <BigBox>
            <ResumeBox isSelected={true}>
              <img src={bookingByUserId.Room.Hotel.image} alt={bookingByUserId.Room.Hotel.image} />
              <h3>{bookingByUserId.Room.Hotel.name}</h3>
              <h4>Quarto reservado:</h4>
              <h5>
                {bookingByUserId.Room.name}, {roomCapacity(bookingByUserId.Room.capacity)}
              </h5>
              <h4>Pessoas no seu quarto:</h4>
              <h5>{roomOccupants(bookingByUserId.Room.occupants)}</h5>
            </ResumeBox>
          </BigBox>
          <ChangeButton onClick={fetchChange}>TROCAR DE QUARTO</ChangeButton>
        </BookingResumeContainer>
      );
    }
  }
}

const BookingResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  h2 {
    margin: 10px 15px 10px 15px;
  }
`;

const MainTitle = styled.div`
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
    margin: 0px 0px 0px 15px;
  }
  h2 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin: 26px 15px 10px 15px;
  }
`;

const BigBox = styled.div`
  display: flex;
`;

const ChangeButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 182px;
height: 37px;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-align: center;
background: #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
margin: 30px 15px 10px 15px;
cursor: default;
`;

const ResumeBox = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${props => (props.isSelected ? '#FFEED2' : '#EBEBEB')};
  border-radius: 10px;
  margin: 9.5px;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin: 16px 14px 0px 14px;
  }
  h3 {
    margin: 10px 15px 0px 15px;
  }
  h4 {
    margin: 10px 15px 0px 15px;
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;
  }
  h5 {
    margin: 5px 15px 0px 15px;
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 14px;
  }
`;


