import { param , body } from "express-validator"
import { applyValidations } from "../middlewares/apply-validations.js";

export const locationWeatherValidation = [
    param("ubicacion")
    .notEmpty()
    .withMessage("El parametro { ubicacion } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { ubicacion } debe ser un string."),
    applyValidations,
]


//--------------------------------------------------------------------------

const VALIDATION_REGEX = /^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ0-9\s]+$/;


export function validateLocation(ubicacion) {
    if (typeof ubicacion !== "string") {
        return false;
    }

    return VALIDATION_REGEX.test(ubicacion.trim());
}
