/* eslint-disable*/

import dayjs from "dayjs";


export function fortmatEventDays(auditoriums) {
    const hashDates = {};
    auditoriums.forEach(({ Activity,name }) => {

      Activity.forEach((activity) => {
        const inputDate = activity.startsAt;
        const formattedDate = dayjs(inputDate).format('ddd, DD/MM');
        if(hashDates[formattedDate] === undefined) {
          hashDates[formattedDate] = [];
        };
  
        // hashDates[formattedDate].push({...activity, auditoriumName:name});
      });
    });
    
    const daysList = Object.keys(hashDates);
    
    return { hashDates, daysList}
}
