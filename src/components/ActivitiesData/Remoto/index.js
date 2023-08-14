/* eslint-disable */
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Remoto() {
  return (
    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 102px)' }}>

      <StTypo variant="body1" color="textSecondary" align="center">

        {'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.'}

      </StTypo>

    </Box>
  )
}



const StTypo = styled(Typography)`
  max-width: 329px;
  line-height: 1.16rem !important;
`