import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';
import { toast } from 'react-toastify';
import useTicketType from '../../../hooks/api/useTicketType';
import Payment from '.';

export default function Tickets({ setTicketPrice, setHotelPrice, totalAmount, ticketPrice }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [reservationMade, setReservationMade] = useState(false);

  const { salveTicketLoading, saveTicket } = useTicket();
  const { ticketType } = useTicketType();

  const selectTycketType = (ticketType, price) => {
    setSelectedButton(ticketType);
    setTicketPrice(price);
    setSelectedHotel(null);
    setHotelPrice(0);
  };

  const selectHotelType = (ticketType, price) => {
    setSelectedHotel(ticketType);
    setHotelPrice(price);
  };

  const reserveTicket = async() => {
    let ticketTypeId;

    const selectedTicket = ticketType?.find((ticket) => {
      if (selectedButton === 'Online') {
        return ticket.isRemote === true;
      }
      if (selectedHotel === 'Com Hotel') {
        return ticket.isRemote === false && ticket.includesHotel === true;
      } else if (selectedHotel === 'Sem Hotel') {
        return ticket.isRemote === false && ticket.includesHotel === false;
      }
      return false;
    });

    if (selectedTicket) {
      ticketTypeId = selectedTicket.id;
    } else {
      toast('Seleção inválida');
      return;
    }

    try {
      await saveTicket({ ticketTypeId });
      toast('Ingresso reservado com sucesso!');
      setReservationMade(true);
    } catch (err) {
      toast('Não foi possível reservar seu ingresso!');
    }
  };

  const renderReservationSection = () => {
    return (
      <>
        <TicketTitle>
          Fechado! O total ficou em <span>R$ {totalAmount}</span>. Agora é só confirmar:
        </TicketTitle>
        <ReserveButton disabled={salveTicketLoading} onClick={reserveTicket}>
          RESERVAR INGRESSO
        </ReserveButton>
      </>
    );
  };

  const splitFirstString = (str) => {
    return str.split(' ')[0];
  };

  const splitAndSliceLastString = (str) => {
    return str.split(' ').slice(1).join(' ');
  };

  return (
    <>
      {
        reservationMade ? (
          <Payment />
        ) : (
          <>
            <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
            <TicketTitle>Primeiro, escolha sua modalidade de ingresso</TicketTitle>
            <TicketInfos>
              {ticketType?.map((ticket) => {
                if (ticket.isRemote === true || ticket.includesHotel === false) {
                  return (
                    <TicketButton
                      key={ticket.id}
                      onClick={() => selectTycketType(splitFirstString(ticket.name), ticket.price)}
                      selectedButton={selectedButton === splitFirstString(ticket.name)}
                    >
                      <h6>{splitFirstString(ticket.name)}</h6>
                      <p>R$ {ticket.price}</p>
                    </TicketButton>
                  );
                }
                return null;
              })}
            </TicketInfos>

            {selectedButton && (
              <>
                {selectedButton === 'Presencial' && (
                  <>
                    <TicketTitle>Ótimo! Agora escolha sua modalidade de hospedagem</TicketTitle>
                    <TicketInfos>
                      {ticketType?.map((hotel) => {
                        if (hotel.isRemote === false && hotel.includesHotel === false) {
                          return (
                            <TicketButton
                              key={hotel.id}
                              onClick={() => selectHotelType(splitAndSliceLastString(hotel.name), 0)}
                              selectedButton={selectedHotel === splitAndSliceLastString(hotel.name)}
                            >
                              <h6>{splitAndSliceLastString(hotel.name)}</h6>
                              <p>+ R$ 0</p>
                            </TicketButton>
                          );
                        } else if (hotel.isRemote === false && hotel.includesHotel === true) {
                          return (
                            <TicketButton
                              key={hotel.id}
                              onClick={() => selectHotelType(splitAndSliceLastString(hotel.name), hotel.price - ticketPrice)}
                              selectedButton={selectedHotel === splitAndSliceLastString(hotel.name)}
                            >
                              <h6>{splitAndSliceLastString(hotel.name)}</h6>
                              <p>+ R$ {hotel.price - ticketPrice}</p>
                            </TicketButton>
                          );
                        }
                        return null;
                      })}
                    </TicketInfos>
                  </>
                )}
                {selectedButton === 'Online' && renderReservationSection()}
                {selectedHotel && renderReservationSection()}
              </>
            )}
          </>
        )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

export const TicketTitle = styled.h5`
  color: #8E8E8E;
  font-size: 20px;
  span {
    font-weight: bold;
  }
`;

const TicketInfos = styled.main`
  display: flex;
  gap: 25px;
  margin-top: 20px;
  margin-bottom: 45px;
`;

const TicketButton = styled.button`
  width: 145px;
  height: 145px;
  border: 1px solid #CECECE;
  border-radius: 20px;
  background-color: ${(props) => !props.selectedButton ? '#FFFFFF' : '#FFEED2'};
  cursor: pointer;
  h6 {
    color: #454545;
    font-size: 16px;
  }
  p {
    color: #898989;
    font-size: 14px;
  }
`;

const ReserveButton = styled.button`
  background-color: #E0E0E0;
  color: #000000;
  font-size: 14px;
  width: 172px;
  height: 37px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  margin-top: 25px;
  cursor: pointer;
`;//

