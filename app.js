if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const router = require('./routes/index')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const errHandler = require('./middlewares/errHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
app.use(errHandler)

app.listen(port, () => {
    console.log(`Sever is listening at http://localhost:${port}`)
})