require('dotenv').config() //Import dotenv as soon as possible

const mongoose = require('mongoose')
const express = require('express')
const chalk = require('chalk')

const app = express()
const PORT = 3000

const id = process.env.ID
const password = process.env.PASSWORD

//Models
const Student = require('./models/Student.js')

const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${id}:${password}@cluster0.rmq47.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useFindAndModify: false
        })
        console.log(chalk.bgBlue('Connected to Mongo'))
    }
    catch (err) {
        console.log(chalk.bgRed('Error:', err))
    }
}

connectToMongo()

//Middleware for the view engine
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

//Middleware for the public
app.use(express.static('public'))

//Middleware for body parser, comes included with express
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.render('home.hbs')
})

app.get('/all-students', async(req, res) => { //all-students is the browser link
    const allStudents = await Student.find({}, {name: 1, lastName: 1}) //Passing an empty object will find all students     
    res.render('allStudents.hbs', {allStudents})
})

app.get('/student/:id', async(req, res) => {
    try{
        const student = await Student.findById(req.params.id)
        res.render('student.hbs', student)
    }
    catch(err){
        res.render('error.hbs', {errorMsg: 'No student with matching ID found'})
    }
})

app.get('/new-student', (req, res) => {
    res.render('newStudent.hbs')
})

app.post('/new-student', async(req, res) => {
    try{
        const createdStudent = await Student.create(req.body) //req.body NEEDS the body parser middleware   
        // res.redirect('/all-students')           
    }
    catch(err){
        console.log(chalk.bgRed('Error:', err))
    }
}) 


//Server listener
app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server open at ${PORT}`))
})


