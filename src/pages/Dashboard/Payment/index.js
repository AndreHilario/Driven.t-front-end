import styled from 'styled-components';
import useTicketByUserId from '../../../hooks/api/useTicketByUserId';
import Tickets, { TicketTitle } from './tickets';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import ConfirmedPayment from '../../../components/Pagamentos/ConfirmedPayment';
import AreaDePagamentoComCartao from '../../../components/Pagamentos/Cartãoform';

export default function Payment() {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [hotelPrice, setHotelPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(ticketPrice + hotelPrice);
  const { ticket } = useTicketByUserId();
  const { enrollment } = useEnrollment();

  useEffect(() => {
    const sumPrice = ticketPrice + hotelPrice;
    setTotalAmount(sumPrice);
  }, [ticketPrice, hotelPrice]);

  return (
    !enrollment ?
      <ErrorContainer>
        <EnrollmentErrorText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</EnrollmentErrorText>
      </ErrorContainer>
      :
      ticket ?
        <>
          <TicketSelectedContainer>
            <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
            <TicketTitle>Ingresso escolhido</TicketTitle>
            <Ticket>
              <TicketContent>
                {ticket.TicketType.includesHotel
                  ? ticket.TicketType.name.replace('Presencial', 'Presencial +')
                  : !ticket.TicketType.isRemote
                    ? ticket.TicketType.name.replace('Presencial', 'Presencial +')
                    : ticket.TicketType.name}
              </TicketContent>
              <TicketPrice>
                R$ {ticket.TicketType.includesHotel
                  ? ticket.TicketType.price
                  : !ticket.TicketType.isRemote
                    ? ticket.TicketType.price
                    : ticket.TicketType.price}
              </TicketPrice>
            </Ticket>
          </TicketSelectedContainer>
          <PaymentContainer>
            <TicketTitle>Pagamento</TicketTitle>
            {ticket.status === 'RESERVED' ?
              <AreaDePagamentoComCartao ticket={ticket} />
              :
              <ConfirmedPayment />
            }
          </PaymentContainer>
        </>
        :
        <Tickets
          setTicketPrice={setTicketPrice}
          setHotelPrice={setHotelPrice}
          totalAmount={totalAmount}
          ticketPrice={ticketPrice}
        />
  );
}//

const ErrorContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EnrollmentErrorText = styled.div`
  color: #8E8E8E;
  width: 388px;
  font-size: 20px;
  text-align: center;
`;
const TicketSelectedContainer = styled.main`
`;

const Ticket = styled.div`
  background-color: #FFEED2;
  width: 290px;
  height: 108px;
  border: 1px solid #FFEED2;
  border-radius: 20px;
  margin-top: 25px;
  gap: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const TicketContent = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #454545;
`;

const TicketPrice = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #898989;
`;

const PaymentContainer = styled.main`
  margin-top: 40px;
`;
