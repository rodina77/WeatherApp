export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  wind: number;
  humidity: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherProps {
  coordinates: Coordinates | null;
}

export interface Props {
  placeholder?: string;
  onWeatherUpdate:(city:string)=> void
}
