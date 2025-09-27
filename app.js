require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const meetingRouter = require("./routes/meetingRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://interview-client-topaz.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/meeting", meetingRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));