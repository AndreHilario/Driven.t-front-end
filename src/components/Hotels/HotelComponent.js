import styled from 'styled-components';
import colors from '../../constants/colors';
import { filterAccomodationType, sumVacancyOnRooms } from '../../pages/Dashboard/Hotel/utils';

export default function HotelComponent({ id, image, name, isSelected, setSelectedHotelId, Rooms }) {
  return (
    <Main onClick={() => setSelectedHotelId(id)} isSelected={isSelected}>
      <div>
        <ImageCard>
          <img src={image} alt='name' />
        </ImageCard>
        <HotelInformations>
          <h2>{name}</h2>
          <h6><strong>Tipos de acomodação:</strong></h6>
          <Description>{filterAccomodationType(Rooms)}</Description>
          <h6><strong>Vagas disponíveis:</strong></h6>

          <Description>{sumVacancyOnRooms(Rooms)}</Description>
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
