import "dotenv/config";

export const config = {
    port: process.env.PORT || 3000,
    openweather_api_key: process.env.OPENWEATHERMAP_API_KEY,
    mongo:
        process.env.MONGO_URI ||
        "mongodb://127.0.0.1:27017/wheather-app",
    jwt_secret: process.env.JWT_SECRET || "secret",
    database: process.env.DATABASE_NAME || "wheather-app",
};
