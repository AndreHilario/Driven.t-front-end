/* eslint-disable */
import dayjs from 'dayjs';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import useAtvDayID from '../../../hooks/api/useAtvDayId';
import useSeatTicket from '../../../hooks/api/useSeatTicket';
import CardAtv from './CardAtv';

export default function Atv({ dayId }) {
  
  let data = useAtvDayID(dayId)
  
  const token = useToken()
  const hashTable = {}
  const AtvUser = useSeatTicket(token)
  


  data.activities?.forEach((current) => {

    if (hashTable[current.venueId] === undefined) {
      hashTable[current.venueId] = [current]
    } else {

      hashTable[current.venueId].push(current)
    }
  })


  const hashTableKeys = Object.keys(hashTable)


  hashTableKeys.forEach((currentKey) => {

    hashTable[currentKey].sort((a, b) => {
      return (dayjs(a.startTime).get('hour') - dayjs(b.startTime).get('hour'))
    })

  })



  return (
    <>

      <TituloAtv gridLength={hashTableKeys.length}>
        {hashTableKeys.map((currentKey) => {
          return <div key={currentKey}>{hashTable[currentKey][0].Venue.name}</div>;
        })}
      </TituloAtv>


      <TableAtv gridLength={hashTableKeys.length}>
        {hashTableKeys.map((currentKey) => {
          return (
            <div key={currentKey}>
              {hashTable[currentKey].map((currentActivity) => {
                let booked = false
                if(AtvUser.UserSeats !== null) {
                  const reservado = AtvUser.UserSeats.seats.filter((seat) => seat.activityId === currentActivity.id).length
                  if(reservado>0) {
                    booked = true
                  }
                }

                return <CardAtv key={currentActivity.id} activity={currentActivity} booked ={booked}/>

              })}
            </div>
          )
        })}
      </TableAtv>
    </>
  )
}



//Grid
const TituloAtv = styled.div`
  display: grid;
  ${({ gridLength }) => gridLength && `grid-template-columns: repeat(${gridLength}, 1fr);`}
  grid-gap: 1px;

  & > * {
    text-align: center;
    color: #7b7b7b;
    font-size: 17px;
    font-weight: 400;
    line-height: 40px;
  }
`


//Grid
const TableAtv = styled.div`
  display: grid;
  ${({ gridLength }) => gridLength && `grid-template-columns: repeat(${gridLength}, 1fr);`}
  grid-gap: 1px;
  background-color: #d7d7d7;
  border: 1px solid #d7d7d7;

  & > * {
    padding: 10px;
    min-height: 200px;
    background-color: #fff;
    & > div:nth-child(n + 2) {
      margin-top: 10px;
    }
  }
`