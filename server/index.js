import "dotenv/config"
import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import morgan from "morgan"
import User from "./models/User.js"
import { auth, generateToken } from "./utils/jwt.js"

mongoose.connect(process.env.MONGO_URL)

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.get("/api", (req, res) => res.send("Hello World!"))

app.post("/api/register", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email })
  if (existingUser) {
    res.status(409).send("email already exist").end()
    return
  }

  const newUser = await User.create({
    ...req.body,
  })

  const token = generateToken({
    id: newUser.id,
  })

  res.status(201).json({ token }).end()
})

app.post("/api/login", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email })

  if (!existingUser) {
    res.status(404).send("user not exist").end()
  }

  if (existingUser.password !== req.body.password) {
    res.status(403).send("wrong password").end()
    return
  }

  const token = generateToken({
    id: existingUser.id,
  })

  res.status(201).json({ token }).end()
})

app.get("/api/info", auth, (req, res) => {
  res.json(req.user)
})

app.listen(process.env.PORT, () =>
  console.log(`Server running at port http://localhost:${process.env.PORT}`)
)
