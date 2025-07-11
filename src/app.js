const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
// const { adminAuth, userAuth } = require("./middlewares/auth");

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

// app.use("/admin", adminAuth)

// app.get("/admin/getAllData", (req, res) => {
//   res.send("Got all the User Data")
// })

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("Deleted a User")
// })

// app.use("/user", userAuth, (req, res) => {
//   res.send("User data sent")
// })

// Error Handling
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong")
//   }
// })

// app.use("/getUserData", (req, res) => {
//   try {
//     throw new Error("This is a test error")
//     res.send("User data sent")
//   } catch (err) {
//     res.status(500).send("Some error contact support team")
//   }
// })

app.use(express.json()); // The Middleware to parse JSON request body to javascript object

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  // let user = new User({
  //   firstName: "Sangu",
  //   lastName: "Ballolli",
  //   emailId: "sangu@gmail.com",
  //   password: "Sangu@123",
  // })

  let user = new User(req.body)

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving user " + err.message);
  }
})

// Feed API to get all the users from the database
app.get("/feed", async (req, res) => {
  // Following code is to get a single data from the database and it will return an array of object
  // const userEmail = req.body.emailId
  // const users = await User.find({ emaidId: userEmail })
  try {
    // This will return all the users from the database
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    res.status(404).send("Data not found")
  }
})

// This API will update the user data in the database
app.patch("/user/:userId", async (req, res) => {
  const userID = req.params?.userId;
  const data = req.body;
  try {

    // This is API level validation
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills", "age"]

    const isAllowed = Object.keys(data).every((key) => {
      ALLOWED_UPDATES.includes(key);
    });

    if(!isAllowed) {
      return res.status(400).send("Invalid data provided for update");
    }

    if(data.skills.length > 10) {
      return res.status(400).send("Skills should not be more than 10");
    }

    await User.findByIdAndUpdate({_id:userID}, data, {returnDocument:"after", runValidators:true});
    res.send("User updated successfully");    
  } catch (error) {
    res.status(404).send("User not found")
  }
});

// Delete API to delete a user from the database
app.delete("/user", async (req, res) => {
  const userID = req.body.userId;
  console.log("User ID to delete:", userID);
  try {
    const user = User.findByIdAndDelete(userID);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(404).send("User not found")
  }
})

connectDB().then(() => {
  console.log("Database connected successfully");

  app.listen(7777, () => {
    console.log("Server is successfully running on port 7777...")
  })
}).catch((err) => {
  console.error("Database connection failed:", err);
});

// The order of the app.use matters, and it executes the app.use in a synchronous way

// The app.use is used to handle the middleware, and it can be used to handle the request and response in a synchronous way
// The function which sends the response is known as Route Handler and rest of the functions are known as Middleware