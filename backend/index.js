const express = require("express");

const bodyParser = require("body-parser"); //to fetch post request from clint side...

const cors = require("cors"); // connect the server request from fronend and backend...

require("dotenv").config(); //require env configuration...

require("./Models/db"); //require database connections...

const cookieParser = require("cookie-parser");

//All routes
const AuthRouter = require("./Routes/AuthRouter");
// const ProductRouter = require('./Routes/ProductRouter');

//initialize express
const app = express();

//define port env variable
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});

// app.listen(PORT, ()=>{
// 	connectDB();
// 	console.log(`SERVER IS CONNCETED ON ${PORT}`);

// })

//for test the port
app.get("/ping", (req, res) => {
	res.send("PONG");
});

//middlewire
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));


app.use(express.json());//allows us to parse incoming requests:req.body
app.use(cookieParser());//allows us to parse incoming cookies

//routes
app.use("/auth", AuthRouter);
// app.use('/products', ProductRouter);
