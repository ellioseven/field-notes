const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const redis = require("redis")

const storage = redis.createClient({
  host: process.env.REDIS_HOST
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

storage.on("error", function(error) {
  console.error(error)
})

const _error = ({ res, error }) => {
  res.writeHead(500)
  res.end(error)
}

app.get("/param/:key", (req, res) => {
  const { key } = req.params
  storage.get(key, (error, value) => {
    if (error) return _error({ res, error })
    return res.json({ value })
  })
})

app.put("/param/:key", (req, res) => {
  const { key } = req.params
  const { value = null } = req.body
  storage.set(key, value, (error, value) => {
    if (error) return _error({ res, error })
    return res.json({ status: value })
  })
})

const port = process.env.API_PORT || 8080
app.listen(port, () => console.log("Listening on " + port))
