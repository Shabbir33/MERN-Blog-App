const express = require("express")
const cors = require("cors")
const connectDB = require("./db/connect")
const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")
require("dotenv").config()
const cookieParser = require('cookie-parser')

//Express App
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}));
app.use("/uploads",express.static(__dirname+"/uploads"))

//Routers
app.use("/", userRouter)
app.use("/posts", postRouter)


const PORT = process.env.PORT || 3000;

const start = async () => {
    try{
        //connect DB
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);
        })
    }catch(err){
        console.log(err);
    }
}

start()