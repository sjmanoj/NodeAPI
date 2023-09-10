const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require('dotenv').config()


const app = express()

const port = process.env.PORT || 9090

app.use(express.json())
app.use('/api/items', require('./routes/itemRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port,()=>{
    connectDb()
    console.log(`Server running on port ${port}`)
})