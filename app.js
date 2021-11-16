const mongoose = require('mongoose')
const chalk = require('chalk')
const DB = 'mongoose-example' //Save the DB in a variable

//Models
const Student = require('./models/Student')

//Connect DB to js file, mongo compass MUST be connected, returns promise
const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${DB}`, {
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

connectToMongo() //Call the function to connect


//CREATE
//Create new document
const createStudent = async() => {
    try{
        const student = await Student.create({
            name: 'Lachan',
            lastName: 'Cleta',
            age: 9,
            grades: [6, 5, 10, 6],
            class: 'A',
            pendingBills: false
        })
        // console.log(student)c
    }
    catch(err){
        console.log('Error:', err)
    }
}

// createStudent()


//READ
const findStudent = async() => {
    try{
        const students = await Student.find({age: 10}, {name: 1}) //Filter all students aged 10, project only their name
        console.log(students)
    }
    catch(err){
        console.log('Error:', err)
    }
}

// findStudent()

const findStudentById = async(id) => {
    try{
        const student = await Student.findById(id)
        console.log(student)
    }
    catch(err){
        console.log('Error:', err)
    }
}

// findStudentById('618e3d5895e77e4fc7405341')


//UPDATE
const updateStudent = async() => {
    try{
        const updatedStudent = await Student.findOneAndUpdate({name: 'Lachan'}, //Finds student named Lachan, 
        {pendingBills: true, age: 11}, //updates pending bills and age
        {new: true} //Returns the document  after being updated
        ) 
        console.log(updatedStudent)
    }
    catch(err){
        console.log('Error:', err)
    }
}

// updateStudent()

const updateSomeStudents = async() => {
    const response = await Student.updateMany({age: 10}, {age: 15}) //Change students aged 10 to 15
    console.log(response)
}

// updateSomeStudents()

const updateStudentById = async(id) => {
    try{
        const updatedStudent = await Student.findByIdAndUpdate(id,
            {age: 15},
            {new: true}
        )
        console.log(updatedStudent) //Returns student before update(?)
    }
    catch(err){
        console.log('Error:', err)
    }
}

// updateStudentById('618e4346567135e2c5afc18d')


//DELETE
const deleteOneStudent = async() => {
    try{
        await Student.findOneAndDelete({name: 'Andrea'})
    }
    catch(err){
        console.log('Error:', err)
    }
}

// deleteOneStudent()

const deleteManyStudents = async() => {
    try{
      const response = await Student.deleteMany({name: 'Dummy'})
      console.log(response) //Show deleted students
    }
    catch(err){
      console.log('Error:', err)
    }
}

// deleteManyStudents()

const deleteStudentById = async(id) => {
    try{
      const deletedStudent = await Student.findByIdAndDelete(id, {new: true})
      console.log(deletedStudent) //Shows deleted student
    }
    catch(err){
      console.log('Error:', err)
    }
}
  
// deleteStudentById('618e4360d9bc03f0caa995b8')




