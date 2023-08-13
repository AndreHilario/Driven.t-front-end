import styled from 'styled-components';
import colors from '../../constants/colors';
import { filterAccomodationType, sumVacancyOnRooms } from '../../pages/Dashboard/Hotel/utils';
import { useEffect, useState } from 'react';
import { getRoomsByHotelId } from '../../services/hotelApi';
import useToken from '../../hooks/useToken';

export default function HotelComponent({ id, image, name, setRooms }) {
  const [vacancy, setVacancy] = useState(null);
  const [accomodation, setAccomodation] = useState(null);
  const [roomFromThisHote, setRoomFromThisHote] = useState(null);
  const token = useToken();

  useEffect(async() => {
    const { Rooms } = await getRoomsByHotelId(token, id);
    setVacancy(sumVacancyOnRooms(Rooms));
    setAccomodation(filterAccomodationType(Rooms));
    setRoomFromThisHote(Rooms);
  }, []);

  return (
    <Main onClick={() => setRooms(roomFromThisHote)}>
      <div>
        <ImageCard>
          <img src={image} alt='name' />
        </ImageCard>
        <HotelInformations>
          <h2>{name}</h2>
          <h6><strong>Tipos de acomodação:</strong></h6>
          <Description>{accomodation}</Description>
          <h6><strong>Vagas disponíveis:</strong></h6>

          <Description>{vacancy}</Description>
        </HotelInformations>
      </div>
    </Main>
  );
}

const Main = styled.div`
  width: 200px;
  height: 264px;
  background-color: ${props => props.isSelected ? colors.selectedItemBackground : colors.itemBackground};

  padding: 15px 0px;
  margin-right: 20px;
  border-radius: 10px;

  cursor: pointer;
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
