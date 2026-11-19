import React, { useEffect, useState } from 'react';
import {
    Search, Wind, Droplets, Sun, CloudSun, Cloud,
    CloudFog, CloudDrizzle, CloudRain, CloudRainWind,
    CloudSnow, Snowflake, CloudLightning, CloudHail,
    Cloudy, Umbrella, MapPin, Navigation, ArrowUpRight, ChevronRight
} from "lucide-react";
import axios from 'axios';

const CLEAR_SKY_IMAGE_URL = "https://images.unsplash.com/photo-1594156596782-656c93e4d504?auto=format&fit=crop&w=1200&q=80";
const MAINLY_CLEAR_IMAGE_URL = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80";
const PARTLY_CLOUDY_IMAGE_URL = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80";
const OVERCAST_IMAGE_URL = "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80";

const FOG_IMAGE_URL = "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=1200&q=80";

const DRIZZLE_IMAGE_URL = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1200&q=80";
const FREEZING_DRIZZLE_IMAGE_URL = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1200&q=80";

const LIGHT_RAIN_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";
const MODERATE_RAIN_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";
const HEAVY_RAIN_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";

const FREEZING_RAIN_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";
const HEAVY_FREEZING_RAIN_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";

const LIGHT_SNOW_IMAGE_URL = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1200&q=80";
const MODERATE_SNOW_IMAGE_URL = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1200&q=80";
const HEAVY_SNOW_IMAGE_URL = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1200&q=80";
const SNOW_GRAINS_IMAGE_URL = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1200&q=80";

const LIGHT_SHOWERS_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";
const MODERATE_SHOWERS_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";
const HEAVY_SHOWERS_IMAGE_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80";

const LIGHT_SNOW_SHOWERS_IMAGE_URL = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1200&q=80";
const HEAVY_SNOW_SHOWERS_IMAGE_URL = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1200&q=80";

const THUNDERSTORM_IMAGE_URL = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1200&q=80";
const HAIL_STORM_IMAGE_URL = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1200&q=80";
const HEAVY_HAIL_STORM_IMAGE_URL = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1200&q=80";

const weatherIcons = {
    0:  [Sun, CLEAR_SKY_IMAGE_URL, "Clear Sky"],

    1:  [CloudSun, MAINLY_CLEAR_IMAGE_URL, "Mainly Clear"],
    2:  [CloudSun, PARTLY_CLOUDY_IMAGE_URL, "Partly Cloudy"],
    3:  [Cloudy, OVERCAST_IMAGE_URL, "Overcast"],

    45: [CloudFog, FOG_IMAGE_URL, "Fog"],
    48: [CloudFog, FOG_IMAGE_URL, "Depositing Rime Fog"],

    51: [CloudDrizzle, DRIZZLE_IMAGE_URL, "Light Drizzle"],
    53: [CloudRain, DRIZZLE_IMAGE_URL, "Moderate Drizzle"],
    55: [CloudRainWind, DRIZZLE_IMAGE_URL, "Dense Drizzle"],

    56: [CloudDrizzle, FREEZING_DRIZZLE_IMAGE_URL, "Light Freezing Drizzle"],
    57: [CloudRainWind, FREEZING_DRIZZLE_IMAGE_URL, "Dense Freezing Drizzle"],

    61: [CloudDrizzle, LIGHT_RAIN_IMAGE_URL, "Slight Rain"],
    63: [CloudRain, MODERATE_RAIN_IMAGE_URL, "Moderate Rain"],
    65: [CloudRainWind, HEAVY_RAIN_IMAGE_URL, "Heavy Rain"],

    66: [CloudRain, FREEZING_RAIN_IMAGE_URL, "Light Freezing Rain"],
    67: [Umbrella, HEAVY_FREEZING_RAIN_IMAGE_URL, "Heavy Freezing Rain"],

    71: [Snowflake, LIGHT_SNOW_IMAGE_URL, "Slight Snowfall"],
    73: [CloudSnow, MODERATE_SNOW_IMAGE_URL, "Moderate Snowfall"],
    75: [CloudSnow, HEAVY_SNOW_IMAGE_URL, "Heavy Snowfall"],

    77: [Snowflake, SNOW_GRAINS_IMAGE_URL, "Snow Grains"],

    80: [CloudDrizzle, LIGHT_SHOWERS_IMAGE_URL, "Slight Rain Showers"],
    81: [CloudRain, MODERATE_SHOWERS_IMAGE_URL, "Moderate Rain Showers"],
    82: [CloudRainWind, HEAVY_SHOWERS_IMAGE_URL, "Violent Rain Showers"],

    85: [CloudSnow, LIGHT_SNOW_SHOWERS_IMAGE_URL, "Slight Snow Showers"],
    86: [Snowflake, HEAVY_SNOW_SHOWERS_IMAGE_URL, "Heavy Snow Showers"],

    95: [CloudLightning, THUNDERSTORM_IMAGE_URL, "Thunderstorm"],
    96: [CloudHail, HAIL_STORM_IMAGE_URL, "Thunderstorm with Slight Hail"],
    99: [CloudHail, HEAVY_HAIL_STORM_IMAGE_URL, "Thunderstorm with Heavy Hail"]
};

const App = () => {
    const [search, setSearch] = useState(false);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [temperature, setTemperature] = useState();
    const [apparent_temperature, setApparent_temperature] = useState();
    const [windSpeed, setWindSpeed] = useState('');
    const [humidity, setHumidity] = useState('');
    const [maxTemperature, setMaxTemperature] = useState();
    const [minTemperature, setMinTemperature] = useState();
    const [dayTemperature, setDayTemperature] = useState([]);
    const [location, setLocation] = useState('');
    const [currentWeatherCode, setCurrentWeatherCode] = useState();
    const [hourlyWeatherCondition, setHourlyWeatherCondition] = useState();
    const [weeklyWeatherCode, setWeeklyWeatherCode] = useState([]);
    const [weeklyMaxTemperature, setWeeklyMaxTemperature] = useState([]);
    const [weeklyMinTemperature, setWeeklyMinTemperature] = useState([]);
    const [weekdays, setWeekdays] = useState([]);
    const [hourlyTime, setHourlyTime] = useState([]);
    const [recentSearch, setRecentSearch] = useState([])
    const[localStorageData, setLocalStorageData] = useState([]);
    async function getCurrentLocation() {
        try {
            const currentLocation = await axios.get("https://ipwho.is/");
            if (currentLocation.data.success) {
                setLatitude(currentLocation.data.latitude);
                setLongitude(currentLocation.data.longitude);
                setCity(currentLocation.data.city);
                setRegion(currentLocation.data.region);
                setCountry(currentLocation.data.country);
            } else {

            }
        } catch (error) {
            console.error("CORS / Network Error getting location by IP:", error);
        }
    }

    useEffect(() => {
        getCurrentLocation().then(()=>{});
    }, []);
    async function getCoordinates(search){
        if (!search.trim()) return;
        try{
            const coordinates = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`);

            if (!coordinates.data.results) {
                alert("Location not found");
                return;
            }
            setSearch(true);

            setLatitude(coordinates.data.results[0].latitude);
            setLongitude(coordinates.data.results[0].longitude);
            setCity(coordinates.data.results[0].name);
            // noinspection JSUnresolvedReference
            setRegion(coordinates.data.results[0].admin1 || '');
            setCountry(coordinates.data.results[0].country || '');


        }
        catch (error){
            alert("Connection failed");
        }
    }

    async function getWeather(latitude, longitude){
        try{
            const currentTemperature = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code`);

            setApparent_temperature(currentTemperature.data.current.apparent_temperature);
            setTemperature(currentTemperature.data.current.temperature_2m);
            setMaxTemperature(currentTemperature.data.daily.temperature_2m_max[0]);
            setMinTemperature(currentTemperature.data.daily.temperature_2m_min[0]);
            setWindSpeed(currentTemperature.data.current.wind_speed_10m);
            setHumidity(currentTemperature.data.current.relative_humidity_2m);
            setDayTemperature(currentTemperature.data.hourly.temperature_2m.slice(0,24));
            setCurrentWeatherCode(currentTemperature.data.current.weather_code);
            setHourlyWeatherCondition(currentTemperature.data.hourly.weather_code);
            setWeeklyWeatherCode(currentTemperature.data.daily.weather_code);
            setWeeklyMaxTemperature(currentTemperature.data.daily.temperature_2m_max);
            setWeeklyMinTemperature(currentTemperature.data.daily.temperature_2m_min);
            setWeekdays(currentTemperature.data.daily.time);
            setHourlyTime(currentTemperature.data.hourly.time.slice(0, 24));


            if(search){
                const newSearch = {
                city: city,
                region: region,
                country: country,
                temperature: currentTemperature.data.current.temperature_2m,
                weatherCode: currentTemperature.data.current.weather_code
                };
                setRecentSearch(prev => {
                    const updateSearch = [newSearch,...prev].slice(0,3);
                    localStorage.setItem('result', JSON.stringify(updateSearch));
                    return updateSearch;
                });

            }




        }
        catch (error) {
            alert("Currently Website is not Working..");
        }
    }

    useEffect(() => {
        if(latitude && longitude){
            getWeather(latitude, longitude).then(()=>{});
        }
    }, [latitude, longitude]);

    function getWeatherIcon(weatherCode, property){
        const Icon = weatherIcons[weatherCode]?.[0] || Cloud;
        return <Icon className={property}/>;
    }

    function getWeatherBackground(weatherCode){
        return weatherIcons[weatherCode]?.[1] || CLEAR_SKY_IMAGE_URL;
    }


    return (
        <div className="min-h-screen bg-[#121214] text-white flex justify-center items-center p-4 font-sans antialiased selection:bg-white/20">
            {/* Custom styled horizontal scrollbar for hourly forecast */}
            <style>{`
                .hourly-scroll::-webkit-scrollbar {
                    height: 6px;
                }
                .hourly-scroll::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 10px;
                }
                .hourly-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 10px;
                }
                .hourly-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>

            {/* Main Outer Glass Container */}
            <div className="w-full max-w-300 bg-white/3 backdrop-blur-2xl rounded-4xl p-6 lg:p-8 shadow-2xl border border-white/10 flex flex-col gap-6">

                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-xl backdrop-blur-md border border-white/10">
                            <MapPin className="w-4 h-4 text-white/90 shrink-0" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-white tracking-wide">
                                {[city, region, country].filter(Boolean).join(', ') || 'Loading location...'}
                            </h1>
                            <p className="text-xs text-zinc-400">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Location Search Input Component with Glass effect */}
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                getCoordinates(location).then(()=>{})
                            }}
                            className="relative flex-1 sm:w-72"
                        >
                            <input
                                type="text"
                                placeholder="Search location..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-white/5 backdrop-blur-md text-sm placeholder-zinc-400 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-white/30 border border-white/10 shadow-inner"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-all">
                                <Search className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Left Column (Main Weather Hero & Hourly/Daily Forecasts) */}
                    <div className="lg:col-span-2 flex flex-col gap-5">

                        {/* Current Hero Glass Card */}
                        <div className="relative rounded-3xl overflow-hidden min-h-55 p-6 flex flex-col justify-between bg-white/3 backdrop-blur-xl border border-white/10 shadow-xl">
                            {/* High-Visibility Cloud Background Image Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-700 pointer-events-none"
                                style={{ backgroundImage: `url(${getWeatherBackground(currentWeatherCode)})` }}
                            />

                            {/* Subtle Glass Gradient Tint for Readability */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    {/* Main Temperature & Weather Glass Icon Badge */}
                                    <div className="flex items-center gap-4 mb-1">
                                        <div className="text-7xl lg:text-8xl font-light tracking-tighter drop-shadow-md">
                                            {temperature !== '' ? `${temperature}°` : '--°'}
                                        </div>
                                        <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center shrink-0">
                                            {getWeatherIcon(currentWeatherCode, "w-10 h-10 lg:w-12 lg:h-12 text-white")}
                                        </div>
                                    </div>

                                    {/* Dynamic Weather Condition Title */}
                                    <div className="text-xl font-medium text-white drop-shadow-sm">
                                        {currentWeatherCode !== undefined ? (weatherIcons[currentWeatherCode]?.[2] || 'Weather Conditions') : 'Loading...'}
                                    </div>
                                    <div className="text-xs text-zinc-300 mt-0.5">
                                        Feels like {apparent_temperature !== '' ? `${Math.round(apparent_temperature)}°` : '--°'}
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        <span className="text-[11px] px-2.5 py-1 bg-white/10 rounded-full backdrop-blur-md text-zinc-200 border border-white/15 shadow-sm">
                                            H {maxTemperature !== '' ? `${Math.round(maxTemperature)}°` : '--'}
                                        </span>
                                        <span className="text-[11px] px-2.5 py-1 bg-white/10 rounded-full backdrop-blur-md text-zinc-200 border border-white/15 shadow-sm">
                                            L {minTemperature !== '' ? `${Math.round(minTemperature)}°` : '--'}
                                        </span>
                                    </div>
                                </div>

                                {/* Weather Detail Note Box */}
                                <div className="max-w-50 hidden sm:block bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-lg">
                                    <p className="text-[11px] text-zinc-200 leading-relaxed">
                                        With real-time data and advanced technology, we provide reliable forecasts for any location around the world.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hourly Forecast Glass Panel */}
                        <div className="bg-white/3 rounded-3xl p-4 border border-white/10 backdrop-blur-xl shadow-lg">
                            <h2 className="text-xs font-semibold text-zinc-400 mb-3 px-1 tracking-wide">24-HOUR FORECAST</h2>
                            <div className="hourly-scroll flex items-center overflow-x-auto gap-3 pb-2 pt-1">
                                {dayTemperature.length > 0 ? (
                                    dayTemperature.map((temp, idx) => {
                                        const timeStr = hourlyTime[idx]
                                            ? new Date(hourlyTime[idx]).toLocaleTimeString("en-US", { hour: "numeric", hour12: true })
                                            : '--';

                                        return (
                                            <div
                                                key={idx}
                                                className="min-w-18 shrink-0 py-3 px-2 rounded-2xl bg-white/2 border border-white/5 flex flex-col items-center justify-between gap-2 transition-all hover:bg-white/10 hover:border-white/20"
                                            >
                                                <span className="text-xs font-medium text-zinc-400 whitespace-nowrap">{timeStr}</span>
                                                <div className="my-1">
                                                    {getWeatherIcon(hourlyWeatherCondition?.[idx], "w-5 h-5 text-zinc-200")}
                                                </div>
                                                <span className="text-sm font-semibold">{Math.round(temp)}°</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-xs text-zinc-500 py-4 text-center w-full">Loading hourly forecast...</div>
                                )}
                            </div>
                        </div>

                        {/* Weekly Forecast Glass Cards */}
                        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                            {weeklyWeatherCode.length > 0 ? (
                                weeklyWeatherCode.slice(0, 7).map((code, idx) => {
                                    const dayName = weekdays[idx]
                                        ? new Date(`${weekdays[idx]}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" })
                                        : '--';

                                    return (
                                        <div
                                            key={idx}
                                            className="bg-white/3 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-between gap-2 backdrop-blur-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all shadow-sm"
                                        >
                                            <span className="text-xs font-medium text-zinc-400">{dayName}</span>
                                            <div className="my-0.5">
                                                {getWeatherIcon(code, "w-6 h-6 text-amber-400")}
                                            </div>
                                            <div className="flex flex-col items-center text-center w-full min-w-0">
                                                <p className="text-[10px] font-medium text-zinc-400 truncate w-full text-center mb-0.5" title={weatherIcons[code]?.[2] || ''}>
                                                    {weatherIcons[code]?.[2] || ''}
                                                </p>
                                                <p className="text-xs font-medium">
                                                    <span className="font-semibold">{Math.round(weeklyMaxTemperature[idx])}°</span>
                                                    <span className="text-zinc-500 text-[11px] ml-1">{Math.round(weeklyMinTemperature[idx])}°</span>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-7 text-xs text-zinc-500 py-4 text-center">Loading 7-day forecast...</div>
                            )}
                        </div>

                    </div>

                    {/* Right Column Details Side Glass Panel */}
                    <div className="flex flex-col gap-5">

                        {/* Live Conditions Glass Widget */}
                        <div className="bg-white/3 rounded-3xl p-5 border border-white/10 backdrop-blur-xl shadow-lg flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-semibold text-zinc-300 tracking-wide">LIVE CONDITIONS</span>
                                <ChevronRight className="w-4 h-4 text-zinc-500" />
                            </div>

                            <div className="flex items-center justify-between my-2">
                                <div className="flex items-center gap-1 text-xs text-zinc-400">
                                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>23.8%</span>
                                </div>
                                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-semibold rounded-full border border-amber-500/30 backdrop-blur-md">
                                    Dangerous
                                </span>
                            </div>

                            {/* Graph Wave Decorative Placeholder */}
                            <div className="w-full h-12 my-2 relative flex items-center">
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
                                    <path
                                        d="M 0 25 Q 50 5, 100 20 T 200 15"
                                        fill="none"
                                        stroke="url(#gradient)"
                                        strokeWidth="3"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#60a5fa" />
                                            <stop offset="50%" stopColor="#c084fc" />
                                            <stop offset="100%" stopColor="#f97316" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="150" cy="18" r="4" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
                                </svg>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                                <div>
                                    <div className="flex items-center justify-center gap-1 text-zinc-400 text-[11px] mb-1">
                                        <Droplets className="w-3 h-3" />
                                        <span>Humidity</span>
                                    </div>
                                    <div className="text-sm font-semibold">{humidity !== '' ? `${humidity}%` : '--'}</div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center gap-1 text-zinc-400 text-[11px] mb-1">
                                        <Wind className="w-3 h-3" />
                                        <span>Wind</span>
                                    </div>
                                    <div className="text-sm font-semibold">{windSpeed !== '' ? `${windSpeed} km/h` : '--'}</div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center gap-1 text-zinc-400 text-[11px] mb-1">
                                        <Navigation className="w-3 h-3" />
                                        <span>Pressure</span>
                                    </div>
                                    <div className="text-sm font-semibold">1 kPa</div>
                                </div>
                            </div>
                        </div>

                        {/* Recently Searched Glass Panel */}
                        <div className="bg-white/3 rounded-3xl p-5 border border-white/10 backdrop-blur-xl shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-semibold text-zinc-300 tracking-wide">RECENTLY SEARCHED</span>
                            </div>

                            {(JSON.parse(localStorage.getItem("result"))|| []).map((item,idx)=>{
                                return(
                                    <div key={idx} className="flex flex-col gap-3 my-2">
                                        <div className="flex justify-between items-center p-2.5 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/10 rounded-xl text-amber-300 backdrop-blur-md">
                                                    {getWeatherIcon(item.weatherCode,"w-5 h-5")}
                                                    {/*<CloudSun className="w-5 h-5" />*/}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-semibold text-white">{item.city}</div>
                                                    <div className="text-[10px] text-zinc-400">{weatherIcons[item.weatherCode][2]}</div>
                                                </div>
                                            </div>
                                            <div className="text-base font-semibold">{item.temperature}</div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                        {/* Wind Map Glass Card */}
                        <div className="relative rounded-3xl p-5 bg-white/3 border border-white/10 overflow-hidden backdrop-blur-xl min-h-32.5 flex flex-col justify-between shadow-lg">
                            {/* Dot Matrix Graphic Overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(#4a4856_1px,transparent_1px)] bg-size-[12px_12px] opacity-40 pointer-events-none" />

                            <div className="relative z-10">
                                <span className="text-xs font-semibold text-zinc-400 block mb-2 tracking-wide">WIND MAP</span>
                                <div className="text-sm font-semibold">{windSpeed !== '' ? `${windSpeed} km/h` : '12 km/h'}</div>
                                <div className="text-xs text-zinc-400">Northwest</div>
                            </div>

                            <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
                                <Navigation className="w-4 h-4 rotate-45" />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default App;
