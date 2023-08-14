/* eslint-disable */
import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi2 from '../../services/activitiesApi2';


export default function useSeatTicket() {
  const token = useToken()
  

  const {
    data: UserSeats,
    loading: UserSeatsLoading,
    error: UserSeatsError,
    act: getUserSeats
  } = useAsync(() => activitiesApi2.getUserSeats(token))


  return {
    UserSeats,
    UserSeatsLoading,
    UserSeatsError,
    getUserSeats
  }
}