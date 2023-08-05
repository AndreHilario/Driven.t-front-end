import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketByUserId from '../../../hooks/api/useTicketByUserId';

export default function Hotel() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicketByUserId();

  return (
    (!enrollment || !ticket || ticket?.status === 'RESERVED') ?
      <ErrorContainer>
        <HotelErrorText>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</HotelErrorText>
      </ErrorContainer>
      :
      (ticket?.status === 'PAID' && (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false)) ?
        <ErrorContainer>
          <HotelErrorText>
            Sua modalidade de ingresso não inclui hospedagem <br />
            Prossiga para a escolha de atividades
          </HotelErrorText>
        </ErrorContainer>
        :
        'HOTEIS'
  );
}

const ErrorContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HotelErrorText = styled.div`
  color: #8E8E8E;
  width: 464px;
  font-size: 20px;
  text-align: center;
  line-height: 20px;
`;

