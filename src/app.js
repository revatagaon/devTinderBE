const express = require("express")

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello Hello");
});

app.use("/get",(req, res)=>{
  res.send("Hello from GET request, its not working");
})

app.use("/",(req, res)=>{
  res.send("Hello World from Server")
})

app.listen(7777, ()=>{
  console.log("Server is successfully running on port 3000...")
})

// The order of the app.use matters, and it executes the app.use in a synchronous way