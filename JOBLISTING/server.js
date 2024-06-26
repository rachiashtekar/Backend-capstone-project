require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require ("./routes/auth");
const jobRoute = require("./routes/job")
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  console.log("i am in health api");
  res.json({
    service: "Backend job listing API Server",
    status: "active",
    time: new Date(),
  });
});


app.use("/api/v1/auth",authRoute)
app.use("/api/v1/job",jobRoute)
app.use((error,req,res,next)=>{
  console.log(error);
  res.status(500).json({errorMessage:"something went wrong"})
})

console.log('connect',process.env.MONGODB_URI)

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Db connected!");
    })
    .catch((error) => {
        console.log("Db failed to connect", error);
    });

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Backend server listening at port: ${PORT}`);
});