const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// This route will only handle the GET Call to /user
// app.get("/user", (req, res) => {
//   res.send({
//     firstName: "Praveen",
//     lastName: "Revatagaon",
//   })
// })

// Following route is the dynamic routing
// app.get("/user/:userid/:name/:password",(req, res)=>{
//   console.log(req.params);
//   res.send({
//     firstName: "Praveen",
//     lastName: "Revatagaon",
//   })
// })

// app.post("/user", (req, res) => {
//   res.send("User created successfully");
// })

// app.delete("/user", (req, res) => {
//   res.send("User Deleted Succesfully")
// })

// If we not send any response then in the postman it will be keep sending(infinite) and in the browser it will get timeout
// app.use("/user",(req,res)=>{
// The call back function is known as Route Handler
// })

// The Array can be used with any number of Route Handlers, like one, or two or three and anywhere in the route
// app.use("route", rH1, rH2, rH3, rH4, [rH5, rH6], rH7)
// app.use("route", rH1, rH2, [rH3, rH4, rH5], rH6, rH7)
// app.use("route", [rH1, rH2, rH3, rH4], rH5, rH6, rH7)

// app.use("/user", [
//   (req, res, next) => {
//     console.log("Reuote Handler 1")
//     // res.send("1st Response")
//     next();
//   },
//   (req, res, next) => {
//     console.log("Reuote Handler 2")
//     // res.send("2nd Response")
//     next();
//   },
//   (req, res, next) => {
//     console.log("Reuote Handler 3")
//     // res.send("3rd Response")
//     next();
//   },
//   (req, res, next) => {
//     console.log("Reuote Handler 4")
//     // res.send("4th Response")
//     next();
//   },
//   (req, res, next) => {
//     console.log("Reuote Handler 5")
//     res.send("5th Response")
//     next();
//   },
// ]
// )

// This route will match all the HTTP API request that starts with /test
// The following route will match all the HTTP methods like GET, POST, PUT, DELETE etc
// app.use("/test", (req, res) => {
//   res.send("Hello from test method");
// });

// For Admin checking

app.use("/admin", adminAuth)

app.get("/admin/getAllData", (req, res) => {
  res.send("Got all the User Data")
})

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a User")
})

app.use("/user", userAuth, (req, res) => {
  res.send("User data sent")
})

// Error Handling
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong")
  }
})

app.use("/getUserData", (req, res) => {
  try {
    throw new Error("This is a test error")
    res.send("User data sent")
  } catch (err) {
    res.status(500).send("Some error contact support team")
  }
})

app.listen(7777, () => {
  console.log("Server is successfully running on port 3000...")
})

// The order of the app.use matters, and it executes the app.use in a synchronous way

// The app.use is used to handle the middleware, and it can be used to handle the request and response in a synchronous way
// The function which sends the response is known as Route Handler and rest of the functions are known as Middleware