/* eslint-disable */
import { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import useDates from '../../../hooks/api/useDates';
import styled from 'styled-components';
import DateCard from './DateCard';



export default function AtvDates({ chosen, setChosen }) {

  const data = useDates()
  const [dates, setDates] = useState([])




  useEffect(() => {
    if (data.dates !== null) {
      setDates(data.dates)
    }
  }, [data.datesLoading === false])

  const display = {

    true: (

      <Titulo variant="h6" color="textSecondary">
        Primeiro, filtre pelo dia do evento
      </Titulo>

    ),
    false: '',
  }


  if (dates.length === 0) {
    return (

      <Datas>
        <StTypo variant="body1" color="textSecondary" align="center">
          {'Carregando tickts'}
        </StTypo>
      </Datas>

    )
  } else {
    return (
      <>

        {display[chosen === null]}
        <Datas>
          {dates.map((item) => (
            <DateCard key={item.id} item={item} chosen={chosen} setChosen={setChosen} />
          ))}
        </Datas>

      </>
    )
  }
}




const Datas = styled(Box)`
  display: flex;
  margin-top: 17px;
  margin-bottom: 46px;
`



const Titulo = styled(Typography)`
  margin-top: 25px !important;
  margin-bottom: 10px !important;
`



const StTypo = styled(Typography)`
  line-height: 1 !important;
`
