import styled from 'styled-components';
import colors from '../../constants/colors';
import person from '../../assets/images/person.svg';
import personOccupied from '../../assets/images/filledPerson.svg';
import personSelected from '../../assets/images/pinkPerson.svg';
import { useState } from 'react';

export default function Room({
  beds,
  hotelId,
  selectedHotelId,
  id,
  number,
  selectedRoomId,
  setSelectedRoomId,
  selectedPersonIndex,
  setSelectedPersonIndex,
}) {
  const [ setRoomSelected] = useState(null);

  function checkRenderView(hotelId, selectedHotelId) {
    if (hotelId === selectedHotelId) {
      return true;
    }
    return false;
  }

  function isDisabled(beds) {
    let numberOfBedsOccupieds = 0;
    beds.forEach((bed) => {
      if (bed.bed !== 'person') {
        numberOfBedsOccupieds++;
      }
    });
    return numberOfBedsOccupieds === beds.length;
  }

  const canRender = checkRenderView(hotelId, selectedHotelId);
  const disabled = isDisabled(beds);

  return canRender ? (
    <Main onClick={() => setSelectedRoomId(id)} disabled={disabled} roomSelected={selectedRoomId === id} >
      <div>{number}</div>
      <div>
        {beds.map((bed, index) => (
          <IconPerson
            key={index}
            src={
              selectedPersonIndex !== null && selectedPersonIndex === number + index && bed.bed !== 'personOccupied'
                ? personSelected
                : bed.bed === 'person'
                  ? person
                  : personOccupied
            }
            alt='person'
            onClick={() => {
              setSelectedPersonIndex(selectedPersonIndex === number + index ? null : number + index);
              setRoomSelected(selectedPersonIndex === number + index ? null : number + index);
            }}
          />
        ))}
      </div>
    </Main>
  ) : null;
}

const Main = styled.div`
  width: 190px;
  height: 45px;
  margin: 4px 8px;
  padding: 0px 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${colors.itemBackground};
  border-radius: 10px;

  background-color: ${(props) => {
    if (props.disabled) {
      return colors.disabledBackground;
    } else if (props.roomSelected) {
      return colors.selectedItemBackground;
    } else {
      return 'initial';
    }
  }};

  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
`;

const IconPerson = styled.img`
  margin: 2px;
`;
