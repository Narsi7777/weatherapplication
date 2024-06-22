import react, { useEffect, useState } from "react"
import clouds from "./Assets/cloud.png";
import sun from "./Assets/clear.png";
import { useNavigate } from "react-router-dom";
function Weather(){
    const [Celsius,setCelsius]=useState("--------");
    const [sunStatus,setSunstatus]=useState("---------");
    const [cityName,setCityName]=useState("----------");
    const [displayCurrentCity,setdisplayCurrentCity]=useState(true);
    const [displayInputField,setDisplayInputField]=useState(false);
   
    const [inputCity,setInputCity]=useState("");

    const navigate=useNavigate();
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(currentLocation,error);
    },[]);

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
    }
   }


    
    async function getCityName(lat,lon){

        const apiKeyForCityInfo="pk.8598eb549b83c48f1b3339c29a40d0f9";
        const urlForCityNameGeneration=`https://us1.locationiq.com/v1/reverse?key=${apiKeyForCityInfo}&lat=${lat}&lon=${lon}&format=json`;

        try{
            const resoponce=await fetch(urlForCityNameGeneration);
            const data=await resoponce.json();
            // console.log(data);
            // console.log(data.address.city);
            setCityName(data.address.city);
            getWeatherData(data.address.city);

        }
        catch(err){
            console.log("error is ",err.message);
        }

     

    }
   
    const weatherimage=parseFloat(Celsius) <= 30 ? clouds : sun;
    function currentLocation(coordinates){
        const latitude=coordinates.coords.latitude;
        const longitude=coordinates.coords.longitude
        // console.log(latitude);
        // console.log(longitude);
        getCityName(latitude,longitude);   
    }
    function error(err){
        console.log(err.message);
    }   

    function wantAnotherCity(){
        setdisplayCurrentCity(false);
        setDisplayInputField(true);
        
    }
    function FetchAnotherCity(event){
        event.preventDefault();
        console.log(inputCity);
        setCityName(inputCity);
        getWeatherData(inputCity);
        navigate('/another-city',{state:{city:inputCity.toUpperCase()}});

    }
    function handleinputChange(event){
        setInputCity(event.target.value);
        console.log(inputCity);
    }
    return(
        
        <div className="weather-card">
            <div className="box">
              {displayCurrentCity&&(
                <div>
                <div className="temprature">
                <h1>{Celsius}</h1> 
                </div>

                <div className="city">
                <h2>{cityName}</h2>
                 </div>
                <img src={weatherimage}></img>

                </div>
            )}
            {displayInputField&&(<div>
                <input type="text" className="inputText" placeholder="Enter City Name" onChange={handleinputChange}></input>
            </div>)}

            {displayInputField&&(<button className="fetch-button" onClick={FetchAnotherCity}>Fetch</button>)}

            {displayCurrentCity&&(<button className="check-button" onClick={wantAnotherCity}>Want<br/>Another City??</button>)}
            </div>
            
        </div>
    );
}   
export default Weather;