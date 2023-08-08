import styled from 'styled-components';
import { CircleCheckFill } from 'akar-icons';

export default function ConfirmedPayment() {
  return (
    <PaymentContent>
      <CircleCheckFill size={44} color="#36B853" />
      <Text>
        <span>Pagamento confirmado!</span>
        <p>Prossiga para escolha de hospedagem e atividades</p>
      </Text>
    </PaymentContent>
  );
} 

const PaymentContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 25px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #454545;
  span {
    font-weight: 700;
  }
  p {
    font-weight: 400;
  }
`;
