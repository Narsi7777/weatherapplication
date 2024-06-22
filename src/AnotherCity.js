import React, { useEffect, useState } from "react";
import clouds from "./Assets/cloud.png";
import sun from "./Assets/clear.png"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function AnotherCity(){
    const location=useLocation();
    const [cityName,setCityName]=useState(location.state?.city);
    const [Celsius,setCelsius]=useState(0);
    const [sunStatus,setSunstatus]=useState("---------");
    const navigate=useNavigate();
    const [found,setCityFound]=useState(true);
    async function getWeatherData(cityName){
        const apiKeyForCity="72b0f5ca6dd9bf56ee44425efb2811a1";
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeyForCity}`;
        try{
            const responce=await fetch(url);
            const data=await responce.json();
            const kelvin=data.main.temp;
           setCelsius((kelvin-273).toFixed(2).toString()+"°C");
            // Celsius=Celsius.toFixed(2);
            // console.log(data);
            // console.log(`${cityName}'s Temperature is `+Celsius);
            // console.log(data.weather[0].main);
            setSunstatus(data.weather[0].description);
            // console.log(sunStatus);
    
        }catch(error){ 
            console.log("Error is",error.message);  
            // setCityFound(false);
            // navigate('/');
            setCityName("cityNotFound");
            setCelsius("Null");

        }
       }
       const weatherimage=parseFloat(Celsius) <= 30 ? clouds : sun;
       useEffect(()=>{
        getWeatherData(cityName);
       },[]);

    return (
        <div>
             {found&&(<div className="weather-card">
            <div className="box">
                <div>
                <div className="temprature">
                <h1><center>{Celsius}</center></h1> 
                </div>

                <div className="city">
                     <h2><center>{cityName}</center></h2>
                 </div>
                 <center> <img src={weatherimage} lt="Weather Image"></img></center>
               
                </div>
                <button className="check-button" onClick={()=>{
                    navigate('/');
                }}>Back</button>
            </div>
            </div>)}
            
        
        </div>
    );
}

export default AnotherCity;

