import useAsync from '../useAsync';

import * as ticketTypeApi from '../../services/ticketApi';
import useToken from '../useToken';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
  } = useAsync(() => ticketTypeApi.getTicketTypes(token));

  return {
    ticketType,
    ticketTypeLoading,
    ticketTypeError,
  };
}
