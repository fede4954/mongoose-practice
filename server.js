require('dotenv').config() //Import dotenv as soon as possible

//Import the other packages
const mongoose = require('mongoose')
const express = require('express')
const chalk = require('chalk')

//Create my express app and assing a port
const app = express()
const PORT = 3000

//ENV variables
const id = process.env.ID
const password = process.env.PASSWORD

//Model
const Student = require('./models/Student.js')


//DATABASE CONNECTION
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


//MIDDLEWARE
//View Engine
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

//Public folder
app.use(express.static('public'))

//Body parser (comes bundled in express)
app.use(express.json())


//ROUTES
//Home route
app.get('/', (req, res) => {
    res.render('home.hbs')
})

//All students route
app.get('/all-students', async(req, res) => { //all-students is the browser link
    const allStudents = await Student.find({}, {name: 1, lastName: 1}) //Passing an empty object will find all students     
    res.render('allStudents.hbs', {allStudents})
})

//Specific route
app.get('/student/:id', async(req, res) => {
    try{
        const student = await Student.findById(req.params.id)
        res.render('student.hbs', student)
    }
    catch(err){
        res.render('error.hbs', {errorMsg: 'No student with matching ID found'})
    }
})

//Access (get) student creation route
app.get('/new-student', (req, res) => {
    res.render('newStudent.hbs')
})

//Create (post) a new student route
app.post('/new-student', async(req, res) => {
    try{
        const createdStudent = await Student.create(req.body) //req.body NEEDS the body parser middleware   
        res.send(createdStudent)         
    }
    catch(err){
        console.log(chalk.bgRed('Error:', err))
    }
}) 

//Delete student route
app.delete('/student/:id', async(req, res) => {
    try{
        const deletedStudent = await Student.findByIdAndDelete(req.params.id)
        res.send(deletedStudent)
    }
    catch(err){
        console.log(err)
    }
    Student.findByIdAndDelete(req.params.id)
})

//Edit student route
app.put('/edit-student/:id', async(req, res) => {
    try{
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body)
        res.send(updatedStudent)
      }catch(err){
        console.log(err)
      } 
})


//SERVER
app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server open at ${PORT}`))
})


