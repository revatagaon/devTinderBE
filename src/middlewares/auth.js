const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked!!")
  const token = "ADMIN";
  const isAdminAuthorized = token === "ADMIN"
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request")
  } else[
    next()
  ]
}

const userAuth = (req, res, next) => {
  console.log("User auth is getting checked!!")
  const token = "USER";
  const isAdminAuthorized = token === "USER"
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request")
  } else[
    next()
  ]
}

module.exports = { adminAuth, userAuth }