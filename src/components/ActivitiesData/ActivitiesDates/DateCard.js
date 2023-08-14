/* eslint-disable */
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';



export default function DateCard({ item, chosen, setChosen }) {
  const CClick = () => {
    
    if (chosen === null) {
      setChosen(item)
    } else if (chosen?.id === item.id) {
      setChosen(null)
    } else if (chosen?.id !== item.id && chosen.id !== null) {
      setChosen(item)
    }
  }



  let lts = item.day.split('-');

  const diaSemana = new Date(`${item.day.slice(0, 22)}`)

  let dia = diaSemana.getDay()

  const semana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  const string = `${semana[dia]}, ${lts[1]}/${lts[2].slice(0, 2)} `;




  return (

    <DateCards
      key={item.id}
      onClick={CClick}
      alignitems='center'
      className={chosen?.id === item.id ? true : false}
    >

      <StTypo alignitems='center' variant='body2' align='center'>
        {string}
      </StTypo>
    </DateCards>

  )
}




const StTypo = styled(Typography)`
`



const DateCards = styled(Box)`
  ${({ className }) => className && 'background-color: #FFD37D'};
  ${({ className }) => !className && 'background-color: #E0E0E0;'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 131px;
  border-radius: 4px;
  margin-right: 24px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.22);
`