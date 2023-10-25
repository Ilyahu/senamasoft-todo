import todosRoute from "./routes/todosRoute.js"
import express from 'express'
import cors from 'cors'
import { connect } from "./utils/mongo.js"

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

app.use("/api/todos", todosRoute)

app.use((err,req,res,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(3000, () => {
  // Connect to mongo
  connect()
})