// Imports 
const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const routes = require('./routes/api')
const path = require('path')
require('dotenv').config()

const corsOptions = {
    origin:['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
// -----Connect to the database
mongoose.connect(config.mongoURI,
    {useNewUrlParser: true,useUnifiedTopology:true,
    createIndexes : true}).then(()=>{
    console.log("Database connected")
}).catch((error)=>{
    console.log(error)
})

// ----setting up middleware 

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', routes);


// ---- Setting up server to listen on port 5000
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

// Set static folder
app.use(express.static("app/client/build"));

// index.html for all page routes
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
}

const port = process.env.PORT || 5000

app.listen(port, () => {
console.log(`Server Running at ${port}`)
});