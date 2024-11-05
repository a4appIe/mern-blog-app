const express = require("express");
const dbConnect = require('./config/dbConnect')
const userRoute = require('./routes/userRoutes')
const blogRoute = require('./routes/blogRoutes')
const cors = require("cors");
const cloudinaryConfig = require("./config/cloudinaryConfig");
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', userRoute);
app.use('/api/v1', blogRoute);



app.listen(3000, () => {
  console.log("Server started");
  dbConnect();
  cloudinaryConfig();
});
