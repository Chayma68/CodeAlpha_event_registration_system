require('dotenv').config();
const mongoose=require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express(); // initialize express application instance 



//middleware
app.use(cors());
app.use(express.json());


//connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(()=>{console.log('connected to DB')})
.catch((err)=>{console.error('Error connecting to DB', err)});

//import routes
const eventRoutes = require("./routes/eventRoutes"); 
app.use("/api", eventRoutes);

const registrationRoutes = require("./routes/registrationRoutes");
app.use("/api", registrationRoutes);


//start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});