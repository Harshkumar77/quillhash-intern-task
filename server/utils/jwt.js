import jwt from "jsonwebtoken"
import User from "../models/User.js"

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1day",
  })
}

export async function auth(req, res, next) {
  const token = req.headers.authorization

  try {
    const j = jwt.verify(token.split(" ").pop(), process.env.JWT_KEY)
    req.user = await User.findById(j.id)
  } catch (error) {
    console.log(error.message)
    if (error.message === "jwt expired") res.status(401).send("token expired")
    else if (error.message.startsWith("invalid"))
      res.status(401).send("Invalid token")
    else res.status(500)
  }
  return next()
}
