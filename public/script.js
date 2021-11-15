// this file is FRONTEND js

//Event listener to pass the info from newStudent.hbs to the backend
const createStudentButton = document.getElementById('create-student-button')

createStudentButton.addEventListener('click', () => {
    const name = document.getElementById('name').value //These go inside to get the values after clicking
    const lastName = document.getElementById('lastName').value
    const age = document.getElementById('age').value
    const classroom = document.getElementById('class').value
    const allInputs = {
        name, //Written like this when key and value are named the same
        lastName,
        age,
        class: classroom
    }

    //Send info to the backend using axios
    axios({
        method: 'POST',
        url: 'http://localhost:3000/new-student',
        data: allInputs //data is what's sent to the backend
    })
})