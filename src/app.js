const express = require("express")

const app = express();

// In Express 4.x.x version if you use "app.use" will not work as expected but in the Express version 5.1.0 you need use app.get method

// app.use("/",(req, res)=>{
//   res.send("Hello World from Server")
// })

// app.use("/hello", (req, res) => {
//   res.send("Hello Hello Hello Hello");
// });

// app.use("/get",(req, res)=>{
//   res.send("Hello from GET request, its not working");
// })

app.get("/",(req, res)=>{
  res.send("Hello World from Server")
})

app.get("/hello", (req, res) => {
  res.send("Hello Hello Hello Hello");
});

app.get("/get",(req, res)=>{
  res.send("Hello from GET request, its not working");
})

app.listen(7777, ()=>{
  console.log("Server is successfully running on port 3000...")
})