import React, { useState, useEffect } from 'react'


const Weather = ({ weatherData }) => {

        //weather comp starts
        const [lat, setLat] = useState([])
        const [long, setLong] = useState([])
        const [data, setData] = useState({
                main: {
                        temp: "",
                        feels_like: "",
                        humidity: "",
                        pressure: "",
                },
                name: "",
                weather: [
                        {
                                icon: "",
                                main: "",
                                description: "",
                        },
                ],
        });
        let componentMounted = true;

        const fetchData = async () => {
                navigator.geolocation.getCurrentPosition(function (position) {
                        setLat(position.coords.latitude)
                        setLong(position.coords.longitude)
                        console.log(lat, long)
                })

                const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=33.6400863&lon=72.9879216&appid=ab10e75fb79b945a4eea043f7e9b17f3')
                if (componentMounted) {
                        setData(await response.json());
                        console.log(data)
                }
                else {
                        componentMounted = false;
                }
        }

        useEffect(() => {
                fetchData();
        }, [lat, long])
        //weather comp ends

        //give current date
        let newdate = new Date(); //Current Date        
        let date = newdate.getDate();
        //current date

        let day = newdate.toLocaleString('default', { weekday: 'long' });
        let month = newdate.toLocaleString('default', { month: 'long' });
        let temp = (data.main.temp - 273.15).toFixed(1)
        // toast.error("Weather not loading")


        return (
                <div>
                        <h1 class="font-family['Lato', sans-serif;] font-semibold text-2xl m-4 mb-1">Weather</h1>
                        <div class="block box-border bg-slate-200 rounded shadow-md px-4 py-3 mx-4 ">
                                <p class="text-lg text-gray-700 mb-2">{data.name}, {day}  {date} {month}</p>

                                <div class="flex justify-around items-center">
                                        <div>
                                                <h1 class="text-4xl text-gray-900 mt-1" >{temp}&deg;C</h1>
                                                <p class="mt-1 text-gray-400">Feels like: {(data.main.feels_like - 273.15).toFixed(1)}&deg;C</p>
                                        </div>
                                        <div>
                                                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" />
                                        </div>
                                </div>

                                <div class="my-3 flex justify-between">
                                        <p class=" text-gray-600">Humidity: {data.main.humidity}</p>
                                        <p class=" text-gray-600 mr-4">Pressure: {data.main.pressure}</p>
                                </div>
                                <hr class="m-2" />
                                <p class=" text-gray-800">{data.weather[0].main}; {data.weather[0].description}</p>
                        </div>
                </div>
        )
}

export default Weather