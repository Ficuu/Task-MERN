const express = require('express')
const { mongoose } = require('./database')
const app = express()

const morgan = require('morgan')
const path = require('path')
const router = require('./routes/task.routes')

app.use(morgan('dev'))
app.use(express.json())

app.set('port', process.env.PORT || 3001)

app.use('/task/api', router)

//static files
app.use(express.static(path.join(__dirname, 'public')))


app.listen(app.get('port'), () => {
    console.log(`Server listen on port ${app.get('port')}`)
})