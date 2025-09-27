require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const meetingRouter = require("./routes/meetingRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:1234";

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [FRONTEND_URL, "http://localhost:5173"];
        // Allow non-browser requests (like curl/postman) where origin may be undefined
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/meeting", meetingRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
