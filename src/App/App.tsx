import React, {useEffect} from 'react';
import CityImage from '../widgets/CityImage/CityImage';
import WeatherDetails from "../widgets/WeatherDetails/WeatherDetails";
import axios from "axios";
import {getRandomNumber} from "../features/getRandomNumber";


const App = () => {
    const [city, setCity] = React.useState<string>("Moscow");
    const [weatherValue, setWeatherValue] = React.useState<string>("");
    const [imageUrl, setImageUrl] = React.useState<any>('');
    const [totalLength, setTotalLength] = React.useState<number>(0);
    const [country, setCountry] = React.useState<string>("");
    const [countryCity, setCountryCity] = React.useState<string>("");

    const isValidInput = /^[a-zA-Z]+$|^[а-яА-ЯёЁ]+$/u.test(city);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (city && city.length > 3 && isValidInput) {

                const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a2f95c66fe283f70a91d81fc6d884ba&units=metric`);
                const imageData = await axios.get(`https://pixabay.com/api/?key=37799826-336d51b861720bd97ca31c775&q=${city}&image_type=photo`);

                setWeatherValue(weatherData.data);
                setImageUrl(imageData.data.hits);
                setTotalLength(imageData.data.hits.length);
                }
            } catch {
                console.log("error");
            }
        }
        if (city) {
            fetchData();
        }
    }, [city]);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get(
                    `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=45107bda43504b39839adbd57126c873`
                );

                const country = response.data.results[0].components.country;
                const countryCity = response.data.results[0].components.city;
                setCountry(country);
                setCountryCity(countryCity);
            } catch (error) {
                console.log("Ошибка при получении данных о стране");
            }
        };

        if (weatherValue) {
            fetchCountryData();
        }
    }, [weatherValue]);

    const randomIdx = getRandomNumber(totalLength);


    return (
        <>
            <div className={"absolute z-0 w-screen h-screen rotate-180 "}>
                {!imageUrl &&
                <img
                    src={require("../shared/images/mos.jpeg")}
                    alt="city"
                    className={"h-full w-full blur-[30px] opacity-90 scale-110"}
                />
                }
                {imageUrl &&
                    <img
                        src={imageUrl[randomIdx].largeImageURL}
                        alt="city"
                        className={"h-full w-full blur-[80px] opacity-100"}
                    />
                }
            </div>
            <div className={"flex justify-center items-center flex-col w-full h-screen bg-gray-100 shadow-lg"}>
                <CityImage
                    imageUrl={imageUrl}
                    setCity={setCity}
                    randomIdx={randomIdx}
                    country={country}
                    countryCity={countryCity}
                />
                <WeatherDetails weatherValue={weatherValue}/>
            </div>
        </>
    );
};

export default App;
