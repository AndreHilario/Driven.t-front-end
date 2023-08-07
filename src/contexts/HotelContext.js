import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const HotelContext = createContext();
export default HotelContext;

export function HotelProvider({ children }) {
  const [hotelData, setHotelData] = useLocalStorage('hotelData', {
    idHotel: '',
    idRoom: '',
  });

  return (
    <HotelContext.Provider value={{ hotelData, setHotelData }}>
      {children}
    </HotelContext.Provider>
  );
}
