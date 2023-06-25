import React from 'react';import {ReactComponent as WeatherIcon} from "../../shared/icons/weatherIcon.svg";type WeatherDetailsProps = {    weatherValue: any;}const WeatherDetails = (props: WeatherDetailsProps) => {    const {weatherValue} = props;    const currentDate = new Date();    const dayOfWeek = currentDate.toLocaleString('ru-RU', {weekday: 'long'}).toUpperCase();    const dayOfMonth = currentDate.getDate();    const {main, wind} = weatherValue || {};    const temp = Math.round(main?.temp);    const maxTemp = Math.round(main?.temp_max);    const feelTemp = Math.round(main?.feels_like);    const windSpeed = wind?.speed;    console.log(weatherValue)    return (        <div className="flex h-[400px] w-[1000px]">            <div className="w-full flex justify-between items-center h-[200px] rounded-b-lg relative">                {main && (                    <>                        <div className="flex justify-center items-center w-[350px] h-full relative z-10">                            <div className="flex-col">                                <div className="text-white text-8xl w-[60%] p-4">                                    {`${temp}°`}                                </div>                                <div                                    className="text-white text-l w-full bg-gray-400 font-weight-bold opacity-80 rounded-xl pl-4 p-1">{`${dayOfWeek} ${dayOfMonth}`}</div>                            </div>                        </div>                        <div                            className="bg-gray-600 w-full h-[200px] opacity-10 absolute top-0 left-0 rounded-b-lg"></div>                        <div className={"flex absolute top-10 left-64"}>                            <WeatherIcon width={"140px"}/>                        </div>                            <div className={"flex-col pr-10 bg-blue-400 rounded-l-lg opacity-100 p-2"}>                                <div className={"p-2 text-white text-3xl"}>                                    Максимальная температура, °C: <strong>{`${maxTemp} °`}</strong>                                </div>                                <div className={"p-2 text-white text-xl"}>                                    По ощущению, °C: <strong>{`${feelTemp} °`}</strong>                                </div>                                <div className={"p-2 text-white text-2xl"}>                                    Порывы ветра, м/с: <strong>{windSpeed}</strong>                                </div>                            </div>                    </>                )}            </div>        </div>    );};export default WeatherDetails;