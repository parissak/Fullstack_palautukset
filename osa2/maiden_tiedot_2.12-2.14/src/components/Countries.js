import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
    const [countryWeather, setCountryWeather] = useState([])
    const capital = country.capital
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setCountryWeather(response.data)
            })
    }, [capital, api_key])

    return (
        <div>
            <div>
                <h1>{country.name}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
            </div>

            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <br></br>

            <div>
                <img src={country.flag} alt="flag" height="80px"></img>
            </div>

            <div>
                <Weather capital={capital} weather={countryWeather} />
            </div>
        </div>
    )
}

const Weather = ({ capital, weather }) => {
    if (weather.length !== 0) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>temperature: {weather.main.temp}</p>
                <p>weather: {weather.weather[0].main}</p>
                <p>wind: {weather.wind.speed}</p>
            </div>
        )
    } else
        return (
            <div>
                <p>Loading weather data..</p>
            </div>
        )
}

const Countries = ({ list, chooseOne }) => {
    if (list.length === 0) {
        return (
            <div>zero matches, specify another filter</div>
        )
    }

    if (list.length > 10) {
        return (
            <div>too many matches, specify another filter</div>
        )
    }

    if (list.length === 1) {
        return (
            <Country country={list[0]} />)
    }

    else if (list.length <= 10) {
        return (
            <ul>
                {list.map(country =>
                    <li key={country.alpha2Code}>
                        {country.name}
                        <button onClick={() => chooseOne(country.name)}>show</button>
                    </li>)
                }
            </ul >)
    }
}

export default Countries