const express = require('express')
const router = express.Router()

//using the middleware logger
router.use(logger)

//http://127.0.0.1:8000/users/user?name=Tom
router.get('/user', (req, res) => {
    // console.log(req.query.name)
    res.send(`Query Param username = ${req.query.name}`)
})

//http://127.0.0.1:8000/users/new
router.get('/new', (req, res) => {
    res.render('users/new')
})

router.post('/', (req, res) => {
    const isValid = true
    if (isValid) {
        users.push({ firstName: req.body.firstName })
        res.redirect(`/users/${users.length-1}`)
    } else {
        console.log('Error')   
        res.render('users/new',{firstName: req.body.firstName})
    }    
})

//http://127.0.0.1:8000/users/55
router.route('/:id').get((req, res) => {
        res.send(`New User, ID = ${req.params.id}`)
    }).put((res, req) => {
        res.send(`Update User, ID = ${req.params.id}`)
    }).delete((res, req) => {
        res.send(`Delete User, ID = ${req.params.id}`)
    })

users = [{name: 'Jim'}, {name:'Lucy'}]   
//middleware param allow us to access the request parameters
router.param('id', (req, res, next, id) => {
    req.user = users[id]
    console.log(`-Result: User ID = ${id}\n`)
    next() // Goes to next item in the req-res cycle
})

//creating our own middleware
function logger(req, res, next) {
    let date = new Date();
    let now = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    console.log('-HTTP Method: ' + req.method,
        '\n-HOST: ' + req.hostname,
        '\n-Function Path: ' + req.path,
        '\n-Date: ' +now)
    next() // Goes to next item in the req-res cycle
}

module.exports = router