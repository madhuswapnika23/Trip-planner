import React, { useState, useEffect } from 'react';
import { WEATHER_DATA, WeatherReport } from '@/data/mockData';
import { Wind, Droplets, MapPin, Search, Shirt } from 'lucide-react';
import { useItineraryContext } from '@/context/ItineraryContext';

export const WeatherPage: React.FC = () => {
  const itineraryContext = useItineraryContext();
  const activeItinerary = itineraryContext.itinerary;

  const [selectedCity, setSelectedCity] = useState<string>('Tokyo');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [customSearch, setCustomSearch] = useState('');

  useEffect(() => {
    if (activeItinerary?.destination) {
      const mainCity = activeItinerary.destination.split(',')[0].trim();
      setSelectedCity(mainCity);
    }
  }, [activeItinerary]);

  const availableCities = Object.keys(WEATHER_DATA);

  const getWeatherData = (cityName: string): WeatherReport => {
    const directMatch = availableCities.find(c => c.toLowerCase() === cityName.toLowerCase());
    if (directMatch && WEATHER_DATA[directMatch]) {
      return WEATHER_DATA[directMatch];
    }

    const hash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseTemp = 15 + (hash % 15);
    return {
      current: {
        temp: baseTemp,
        feels: baseTemp - 1,
        condition: 'Partly Sunny',
        humidity: 55 + (hash % 25),
        wind: 10 + (hash % 12),
        icon: '🌤',
      },
      forecast: [
        { day: 'Mon', high: baseTemp + 2, low: baseTemp - 5, icon: '☀️', condition: 'Sunny' },
        { day: 'Tue', high: baseTemp + 3, low: baseTemp - 4, icon: '🌤', condition: 'Partly Sunny' },
        { day: 'Wed', high: baseTemp + 1, low: baseTemp - 6, icon: '🌦', condition: 'Light Showers' },
        { day: 'Thu', high: baseTemp, low: baseTemp - 5, icon: '⛅', condition: 'Overcast' },
        { day: 'Fri', high: baseTemp + 4, low: baseTemp - 3, icon: '☀️', condition: 'Clear Sky' },
        { day: 'Sat', high: baseTemp + 5, low: baseTemp - 2, icon: '☀️', condition: 'Warm & Sunny' },
        { day: 'Sun', high: baseTemp + 2, low: baseTemp - 4, icon: '🌤', condition: 'Partly Sunny' },
      ],
    };
  };

  const currentData = getWeatherData(selectedCity);

  const formatTemp = (celsius: number) => {
    if (unit === 'F') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

  const getPackingAdvice = (temp: number, condition: string) => {
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('thunderstorm') || condition.toLowerCase().includes('showers')) {
      return 'Pack a compact waterproof rain jacket, umbrella, and waterproof footwear. Outdoor activities are best scheduled for morning hours.';
    }
    if (temp < 10) {
      return 'Heavy coat, thermal layers, gloves, and warm socks recommended. Great weather for cozy indoor cafes and museums!';
    }
    if (temp > 25) {
      return 'Light linen shirts, shorts, sunglasses, and high-SPF sunscreen. Stay hydrated and schedule outdoor walking in early morning/evening.';
    }
    return 'Comfortable layers, breathable walking shoes, and a light jacket for evenings. Ideal climate for city walking tours!';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSearch.trim()) {
      setSelectedCity(customSearch.trim());
      setCustomSearch('');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Weather Forecast & Apparel AI</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time climate metrics, 7-day outlook, and smart packing suggestions.</p>
        </div>

        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1 self-start sm:self-auto">
          <button
            onClick={() => setUnit('C')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              unit === 'C' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('F')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              unit === 'F' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* City Search */}
      <div className="space-y-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search any destination city (e.g. Kyoto, Paris, Goa, Mumbai)..."
            value={customSearch}
            onChange={(e) => setCustomSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-semibold text-slate-400 uppercase shrink-0">Featured:</span>
          {availableCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold transition border ${
                selectedCity.toLowerCase() === city.toLowerCase()
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Main Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5 w-fit">
              <MapPin className="h-3 w-3 text-cyan-400" /> {selectedCity} Climate
            </span>

            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-5xl sm:text-6xl font-extrabold text-white">{formatTemp(currentData.current.temp)}</span>
              <span className="text-4xl">{currentData.current.icon}</span>
            </div>

            <p className="text-lg font-semibold text-slate-200">{currentData.current.condition}</p>
            <p className="text-xs text-slate-400">Feels like {formatTemp(currentData.current.feels)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 min-w-[220px]">
            <div className="flex items-center gap-3">
              <Droplets className="h-5 w-5 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">Humidity</p>
                <p className="text-sm font-bold text-white">{currentData.current.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Wind className="h-5 w-5 text-teal-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">Wind</p>
                <p className="text-sm font-bold text-white">{currentData.current.wind} km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apparel AI Advice */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl flex items-start gap-4">
        <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <Shirt className="h-5 w-5 text-amber-400" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-white text-base">AI Apparel Suggestion for {selectedCity}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {getPackingAdvice(currentData.current.temp, currentData.current.condition)}
          </p>
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">7-Day Climate Outlook</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {currentData.forecast.map((f, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center space-y-2">
              <p className="text-xs font-bold text-white">{f.day}</p>
              <div className="text-2xl">{f.icon}</div>
              <p className="text-[10px] text-slate-400 truncate">{f.condition}</p>
              <div className="pt-2 border-t border-slate-800 flex justify-center gap-2 text-xs">
                <span className="font-bold text-white">{formatTemp(f.high)}</span>
                <span className="text-slate-500">{formatTemp(f.low)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
