/* eslint-disable */
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';


export default function SemPagamento() {
  return (
    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 102px)' }}>

      <StTypo variant="body1" color="textSecondary" align="center">

        {'Você precisa ter confirmado pagamento antes de fazer a escolha de atividades'}

      </StTypo>

    </Box>
  )
}

const StTypo = styled(Typography)`
  max-width: 329px;
  line-height: 1.14rem !important;
`