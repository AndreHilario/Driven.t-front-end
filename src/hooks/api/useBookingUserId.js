
import * as bookingApi from '../../services/bookingUserIdApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useBookingUserId() {
  const token = useToken();
  const { data: bookingByUserId, loading: bookingByUserIdLoading,
    error: bookingByUserIdError, act: bookingUserId, } = useAsync(() => bookingApi.bookingUserId(token));
  
  return {
    bookingByUserId, bookingByUserIdLoading, bookingByUserIdError, bookingUserId
  };
}
   
