const express = require('express')
const app = express()
const port = 8000
const host = '127.0.0.1'
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

//http://127.0.0.1:8000/
app.get('/', function (req, res) {
    console.log('Node Server is running')
    res.send('Node Server is running')
})

//http://127.0.0.1:8000/hello
app.get('/hello', function (req, res) {    
    console.log('Hello From Node Server')
    res.render('index',{text :'EJS World' })
})

const useRouter = require('./routes/users')
app.use('/users', useRouter)

app.listen(port, host, (req, res, next) => {
    console.log(`Server running at http://${host}:${port}/`)
})




