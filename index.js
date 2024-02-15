require('dotenv').config()
const express  = require("express");
const app = express();
const userlistRouter = require("./routes/userRoute");
app.use(express.json());

//database
const connectDB = require('./db/connect')

//router

app.use('/api/v1/userlist', userlistRouter )

//PORT
const port=process.env.PORT || 9001

// Connect to DB
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to Database Successfully');
        app.listen(port,() =>{
            console.log(`Server is listening on port: ${port}`)
        })
    } catch(error) {
        console.log(error)
    }
}
start();


