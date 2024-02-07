import countryLookup from "country-code-lookup";

import { validateLocation } from "../validations/location-validation.js";
import { getWindDirection } from "../functions/windDirection.js";
import { getForecastData, getWeatherData } from "../functions/fetchs.js";

import pkg from "winston";
const { createLogger } = pkg;
const logger = createLogger();


export const ctrlCurrentWeather = async (req, res) => {
    const { ubicacion } = req.params;

    if (!ubicacion || typeof ubicacion !== "string") {
        return res.status(400).json({
            error: "ubicacion no valida o no proporcionada correctamente",
        });
    }
    const isValidLocation = validateLocation(ubicacion);
    if (!isValidLocation) {
        return res.status(400).json({ error: "Ubicacion no valida" });
    }

    try {
        const weatherData = await getWeatherData(ubicacion);
        const { main, weather, wind, sys, name } = weatherData;
        const countryCode = sys.country;
        const countryInfo = countryLookup.byIso(countryCode);
        const countryName = countryInfo
            ? countryInfo.country
            : "Desconocido";
        const datosClima = {
            temp: main.temp,
            humidity: main.humidity,
            pressure: main.pressure,
            descripcion: weather[0].description,
            windSpeedMxS: wind.speed,
            windSpeedKxH: (wind.speed * 3.6),
            windGustKxH: (wind.gust * 3.6),
            windDireccion: getWindDirection(wind.deg),
            city: name,
            country: countryName,
        };
        res.json(datosClima);
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
            res.status(404).json({
                error: "Ubicacion no encontrada en OpenWeatherMap",
            });
        } else {
            res.status(500).json({
                error: "Error al obtener datos metereologicos",
            });
        }
    }
};

export const ctrlForecastWeather = async (req, res) => {
    const { ubicacion } = req.params;
    const isValidLocation = validateLocation(ubicacion);
    if (!isValidLocation) {
        return res.status(400).json({ error: "Ubicacion no valida" });
    }

    try {
        const forecastData = await getForecastData(ubicacion);
        const countryCode = forecastData.city.country;
        const countryInfo = countryLookup.byIso(countryCode);
        const temperatures = forecastData.list.map((entry) => {
            return {
                dt: new Date(entry.dt * 1000),
                temp: entry.main.temp,
                feels_like: entry.main.feels_like,
                temp_min: entry.main.temp_min,
                temp_max: entry.main.temp_max,
                pressure: entry.main.pressure,
                humidity: entry.main.humidity,
                weatherMain: entry.weather[0].main,
                weatherDesc: entry.weather[0].description,
                windSpeedMxS: entry.wind.speed,
                windSpeedKxH: (entry.wind.speed * 3.6),
                windGustKxH: (entry.wind.gust * 3.6),
                windDirection: getWindDirection(entry.wind.deg),
                visibility: entry.visibility
                    ? entry.visibility * 100
                    : null,
                dt_txt: entry.dt_txt,
                city: forecastData.city.name,
                country: countryInfo.country,
            };
        });
        res.json(temperatures);
    } catch (error) {
        logger.error(error.message, error.stack);
        if (error.response && error.response.status === 404) {
            res.status(404).json({
                error: "Ubicación no encontrada en OpenWeatherMap",
            });
        } else if (
            error.isAxiosError &&
            error.response.status === 503
        ) {
            return { error: "Error al obtener datos del pronostico" };
        } else {
            res.status(500).json({
                error: "Error al obtener datos del pronóstico meteorológico",
            });
        }
    }
};

