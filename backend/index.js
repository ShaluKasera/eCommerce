require("dotenv").config(); 
const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan")
const cors = require("cors")
const authRoute = require('./routes/authRoute')
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'))


const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({
  origin:"http://localhost:5173",  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials:true                                                 
}));

//routes
app.use('/api/v1/auth',authRoute)
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
