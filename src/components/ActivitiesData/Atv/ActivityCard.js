/* eslint-disable */
import Vagas from './Vagas';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import dayjs from 'dayjs';
import { postSeat } from '../../../services/activitiesApi2';





export default function CardAtv({ activity, booked }) {
  


  const token = useToken()
 
  const comeco = dayjs(activity.startTime).get('hour') + 3 + ':00'
  const fim = dayjs(activity.endTime).get('hour') + 3 + ':00'
  const duration = dayjs(activity.endTime).diff(activity.startTime, 'hour', true)

  return (

    <DivCard duration={duration} onClick = {() => postSeat(token, activity.id)} booked = {booked}>
      <AtvNomeTempo>
        <AtvNome>{activity.name}</AtvNome>
        <AtvTempo>{comeco + ' - ' + fim}</AtvTempo>
      </AtvNomeTempo>
      <Vagas capacity={activity.Venue.capacity} occupiedSeats={activity._count.Seat} booked = {booked} />
    </DivCard>

  )

}

const DivCard = styled.div`
  cursor: pointer;
  ${({ duration }) => `height: calc(${duration} * 80px + ${duration - 1} * 10px);`}
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 12px 10px;
  background-color: ${(props) => props.booked ?'#D0FFDB': '#f1f1f1' };
`;

const AtvNomeTempo = styled.div`
  width: 100%;
  border-right: 2px solid #cfcfcf;
`;
const AtvNome = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
`;
const AtvTempo = styled.div`
  margin-top: 6px;
  font-weight: 400;
  width: 100%;
  font-size: 12px;
  line-height: 14px;
`;