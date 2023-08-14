/* eslint-disable */
import useToken from '../useToken';//
import useAsync from '../useAsync';//
import * as dateApi from '../../services/dateApi';//



export default function useDates() {
  const token = useToken();
  const {
    data: dates,
    loading: datesLoading,
    error: datesError,
    act: getDates
  } = useAsync(() => dateApi.getDates(token))

  return {
    dates,
    datesLoading,
    datesError,
    getDates,
  }
}