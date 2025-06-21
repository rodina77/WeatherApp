"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFavorite } from '../../store/slices/FavoritesSlice';
import Navbar from '../components/navBar/NavBar';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const FavoritesList = () => {
  const favorites = useSelector((state: RootState) => state.favorites.list);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (cityName: string) => {
    dispatch(removeFavorite(cityName));
  };

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <WiDaySunny className="text-yellow-500 text-4xl" />;
    } else if (lowerCondition.includes('rain')) {
      return <WiRain className="text-blue-400 text-4xl" />;
    } else if (lowerCondition.includes('cloud')) {
      return <WiCloudy className="text-gray-400 text-4xl" />;
    } else if (lowerCondition.includes('snow')) {
      return <WiSnow className="text-blue-200 text-4xl" />;
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return <WiThunderstorm className="text-purple-500 text-4xl" />;
    } else {
      return <WiFog className="text-gray-300 text-4xl" />;
    }
  };

  return (
    <>
  <Navbar/>
    <div className="w-full h-screen md:min-h-[300px] p-8 border-l border-b border-gray-300 dark:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(to right, white, #bbdefb, white)",
      }}>
      <h2 className="text-3xl font-bold mb-6">Favorite Cities</h2>
      
      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No favorite cities added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((city) => (
            <div 
              key={city.city}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 relative"
            >
            <button
         onClick={() => handleRemoveFavorite(city.city)}
          className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Add ${city.city} to favorites`}
        >
               <svg  className={`w-5 h-5 text-red-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
     
        </button>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{city.city}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{new Date().toLocaleDateString()}</p>
                </div>
                {getWeatherIcon(city.condition)}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">
                  {city.temperature}°C
                </span>
                <span className="text-gray-600 dark:text-gray-300 capitalize">
                  {city.condition}
                </span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Humidity: {city.humidity || '--'}%</span>
                  <span>Wind: {city.wind || '--'} km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
 
  );
};

export default FavoritesList;