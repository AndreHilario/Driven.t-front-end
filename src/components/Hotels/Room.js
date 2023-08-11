import styled from 'styled-components';
import colors from '../../constants/colors';
import person from '../../assets/images/person.svg';
import personOccupied from '../../assets/images/filledPerson.svg';
import personSelected from '../../assets/images/pinkPerson.svg';
import { useState } from 'react';
export default function Room({ room }) {
  console.log(room);
  const { id, name, capacity, hotelId } = room;
  return (
    <Main>
      <div>{name}</div>
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

  border: 1px solid ${colors.itemBackground};
  border-radius: 10px;
`;

const IconPerson = styled.img`
  margin: 2px;
`;
