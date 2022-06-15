import "dotenv/config"
import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))

const port = app.get("/api", (req, res) => res.send("Hello World!"))

app.listen(process.env.PORT, () =>
  console.log(`Server running at port http://localhost:${process.env.PORT}`)
)
