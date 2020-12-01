const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("Hello")
})

app.listen(Number(process.env.PORT || 80))