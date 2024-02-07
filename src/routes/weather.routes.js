import { Router } from "express";
import { ctrlCurrentWeather, ctrlForecastWeather } from "../controllers/weather.controller.js";
import { locationWeatherValidation } from "../validations/location-validation.js";

const weatherRouter = Router();

weatherRouter.get("/current/:ubicacion", locationWeatherValidation ,ctrlCurrentWeather); 
weatherRouter.get("/forecast-simple/:ubicacion", locationWeatherValidation ,ctrlForecastWeather);


export { weatherRouter };
