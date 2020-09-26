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

// All Kubernetes services must serve a 200 page on '/'.
// @url https://github.com/kubernetes/kubernetes/issues/20555
app.get("/", (req, res) => {
  return res.json({ status: "OK" })
})

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

app.listen(4000, () => console.log("Listening"))
