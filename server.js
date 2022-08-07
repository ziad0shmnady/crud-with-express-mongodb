const express = require('express')
const dotenv=require('dotenv');
const { config } = require('process');
const bodyParser=require('body-parser')
const path=require('path')
const connectDB=require('./server/database/connection')


const app = express();

dotenv.config({ path: 'config.env' })
const port = process.env.port

connectDB();

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

app.use('/',require('./server/routes/router'))

app.listen(port, () => {
    console.log(`server running on ${port }... `)
})