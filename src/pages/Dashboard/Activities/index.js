/* eslint-disable*/
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketByUserId from '../../../hooks/api/useTicketByUserId';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { activitiesApi } from '../../../services/activitiesApi';
import { fortmatEventDays } from '../../../helpers/formatdays';
import { formatAuditoriumsActivities } from '../../../helpers/formatAuditoriums';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

export default function Activities() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicketByUserId();
  const [day, setDay] = useState(null);
  const [auditoriums, setAuditoriums] = useState(null);
  

  const token = useToken();

  useEffect(async() => {
    const data = await activitiesApi(token);
    const {daysList, hashDates} = fortmatEventDays(data)
    const {auditoriums:a} = formatAuditoriumsActivities(hashDates[daysList[0]])
    setDay(daysList[0])
    setAuditoriums(a);}, []);

  const isEnrollmentValid = !enrollment || !ticket || ticket?.status === 'RESERVED';
  return  (
    
    <Main>
    {/* {isEnrollmentValid ? (
      <ErrorContainer><AtividadeErrorText>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</AtividadeErrorText></ErrorContainer> 
    ) : ( */}
    
    <><h1>Escolha de atividades</h1><p>Primeiro, filtre pelo dia do evento: </p></>
    
    <ActivitesConteiner>
      {auditoriums?.map(({activities}) => (
        activities.map(activity => {
          return <div>{activity.title}</div>
        })
      ))}
    </ActivitesConteiner>
    
  </Main>
  )
}

const Main = styled.main`
  font-family: 'Roboto', sans-serif;
  h1{
    font-size: 34px;
    margin-bottom: 50px;
  }
  p{
    color: #8E8E8E;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 65vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const AtividadeErrorText = styled.div`
  color: #8E8E8E;
  width: 464px;
  font-size: 20px;
  text-align: center;
`;

const ActivitesConteiner = styled.div `
  color: black;
  ;
`;

const ActivitiesComponents = styled.div`
  color: blue;
`;
