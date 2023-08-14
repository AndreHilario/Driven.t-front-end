/* eslint-disable */
import * as activitiesApi2 from '../../services/activitiesApi2';//
import useAsync from '../useAsync';//
import useToken from '../useToken';//

export default function useAtvDayID(dayId) {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync(() => activitiesApi2.getActivitiesByDayId(token, dayId));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities,
  };
}