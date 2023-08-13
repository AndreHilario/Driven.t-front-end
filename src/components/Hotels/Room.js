import styled from 'styled-components';
import colors from '../../constants/colors';
import person from '../../assets/images/person.svg';
import personOccupied from '../../assets/images/filledPerson.svg';
import personSelected from '../../assets/images/pinkPerson.svg';
import { useEffect, useState } from 'react';
import { bookingByRoomId } from '../../services/bookingUserIdApi';
import useToken from '../../hooks/useToken';
import { calculateOcuppiedRooms } from '../../pages/Dashboard/Hotel/utils';

export default function Room({ room, selected, setSelectedRoomId }) {
  const { id, name, capacity, hotelId } = room;
  const token = useToken();
  const [beds, setBeds] = useState(null);
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  useEffect(async() => {
    const bookings = await bookingByRoomId(token, id);
    const { beds } = calculateOcuppiedRooms(room, bookings);
    setBeds(beds);
  }, []);
  
  useEffect(() => {
    setIsRoomSelected(selected);
  }, [selected]);

  return (
    <Main onClick={() => { setSelectedRoomId(id); setIsRoomSelected(true); }} selected={selected}>
      <div>
        {name}
      </div>
      <div>
        {beds ? (
          beds.map((bed, index) => {
            return (
              <img
                key={index}
                src={bed.bed === 'person' && isRoomSelected && index === 0 ? personSelected : bed.bed === 'personOccupied' ? personOccupied : person}
                alt='bed'
              />
            );
          })
        ) : (
          ''
        )}
      </div>
    </Main>
  );
}

const Main = styled.div`
  width: 190px;
  height: 45px;
  margin: 4px 8px;
  padding: 0px 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.selected ? colors.selectedItemBackground : 'initial'};
  border: 1px solid ${colors.itemBackground};
  border-radius: 10px;
`;

const IconPerson = styled.img`
  margin: 2px;
`;
