"use client";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../store/slices/FavoritesSlice'
import { RootState } from '@/store';
import { 
  WiDaySunny, 
  WiStrongWind, 
  WiHumidity,
  WiRain,
  WiCloudy,
  WiDayCloudy
} from "react-icons/wi";
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-toastify';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  wind: number;
  humidity: number;
}

const WeatherCard = ({ data }: { data: WeatherData }) => {
const dispatch = useDispatch();
const router = useRouter(); 
const favorites = useSelector((state: RootState) => state.favorites.list);
const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
const isFavorite = favorites.some(city => city.city === data.city);


const handleAddToFavorites = () => {
  if(!isAuthenticated){
     toast.warning('Please login to add favorites');
      router.push('/login');
      return;
  }
  if (isFavorite) {
    dispatch(removeFavorite(data.city));
  } else {
    dispatch(addFavorite(data));
  }
};


  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear')) {
      return <WiDaySunny className="text-yellow-400 text-5xl" />;
    } else if (conditionLower.includes('cloud')) {
      return <WiCloudy className="text-gray-400 text-5xl" />;
    } else if (conditionLower.includes('rain')) {
      return <WiRain className="text-blue-400 text-5xl" />;
    } else {
      return <WiDayCloudy className="text-gray-400 text-5xl" />;
    }
  };

  return (
 <div className="
  bg-gradient-to-br 
  from-blue-50 via-blue-100 to-blue-50
  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
  p-6 
  rounded-2xl 
  shadow-xl 
  hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)]
  dark:hover:shadow-[0_0_25px_-5px_rgba(29,78,216,0.5)]
  transition-all 
  duration-500 
  w-full 
  max-w-4xl 
  mx-auto
  border border-blue-100 dark:border-gray-700
  relative
  overflow-hidden
">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <WiDaySunny className="text-blue-500 dark:text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.city}
          </h2>
        </div>
        <button
          onClick={handleAddToFavorites}
          className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Add ${data.city} to favorites`}
        >
               <svg  className={`w-5 h-5 ${isFavorite ? 'text-red-500' : 'text-gray-400 dark:text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
     
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          {getWeatherIcon(data.condition)}
          <div className="ml-4">
            <p className="text-5xl font-bold text-gray-900 dark:text-white">
              {Math.round(data.temperature)}°C
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">
              {data.condition}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm flex items-center">
            <WiStrongWind className="text-blue-500 text-3xl mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {data.wind} km/h
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm flex items-center">
            <WiHumidity className="text-blue-500 text-3xl mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {data.humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;