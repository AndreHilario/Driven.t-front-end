import useAsync from '../useAsync';

import * as ticketTypeApi from '../../services/ticketApi';
import useToken from '../useToken';

export default function useTicketByUserId() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
  } = useAsync(() => ticketTypeApi.getTicket(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
  };
}
