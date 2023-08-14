/* eslint-disable */
import useTicket from '../../hooks/api/useTicket';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import Atv from './Atv';  //Atividade
import SemPagamento from './SemPagamento';
import Remoto from './Remoto'; //tipo de ticket remoto
import AtvDates from './ActivitiesDates'; // datas das atividades



//Colar somente esse componente no pages
export default function  AtPages(){

  const { ticket } =  useTicket()
  const [chosenDate,setChosenDate] = useState(null)

//tela cheia/vazia
  const displey = {
    true: <Atv key={chosenDate?.id} dayId={chosenDate?.id}></Atv>,
    false: <>
    </>
  }


  // logica ticket pago (tela branca)
  if (!ticket || ticket.status !== 'PAID') {
    return (
      <>
        <StTypo variant="h4">Escolha de atividades</StTypo>

        <SemPagamento />

      </>
    )
  }


  // logica modalidade online (tela branca)
  if (ticket.TicketType.isRemote) {
    return (
      <>
        <StTypo variant="h4">Escolha de atividades</StTypo>

        <Remoto/>

      </>
    )
  }
    return (
      //retornar datas de atividades
    <>

      <StTypo variant="h4">Escolha de atividades</StTypo>
       
      <AtvDates chosen={chosenDate} setChosen={setChosenDate} />
      {displey[chosenDate !== null]}

    </>
  )
}




const StTypo = styled(Typography)`

  margin-bottom: 39px !important;
`