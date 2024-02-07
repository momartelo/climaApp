import axios from "axios";

import pkg from "winston";
const { createLogger } = pkg;
const logger = createLogger();

import { config } from "../settings/config.js";



export const getWeatherData = async (ubicacion) => {
    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=${config.openweather_api_key}&units=metric`,
        );
        return response.data;
    } catch (error) {
        logger.error(error.message, error.stack);
        throw error;
    }
};


export const getForecastData = async (ubicacion) => {
    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&appid=${config.openweather_api_key}&units=metric`,
        );
        return response.data;
    } catch (error) {
        logger.error(error.message, error.stack);
        throw error;
    }
};