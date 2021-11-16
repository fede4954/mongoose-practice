//FRONTEND JS

//CREATE STUDENT
const createStudentButton = document.getElementById('create-student')

if(createStudentButton){ //Check whether the button exists on the page you're in
    createStudentButton.addEventListener('click', () => {
        const name = document.getElementById('name').value //These go inside to get the values after clicking
        const lastName = document.getElementById('lastName').value
        const age = document.getElementById('age').value
        const classroom = document.getElementById('class').value
        const pendingBills = document.getElementById('pendingBills').value
        const allInputs = {
            name, //Written like this when key and value are named the same
            lastName,
            age,
            class: classroom,
            pendingBills
        }
    
        //Send REQUEST to the backend using axios
        axios({
            method: 'POST',
            url: 'http://localhost:3000/new-student',
            data: allInputs //data is what's sent to the backend
        })

        //Code here executes after the AXIOS request gets a response
        window.location.assign('http://localhost:3000/all-students')
    })
}



//EDIT AND DELETE
const editStudentButton = document.getElementById('edit-student')
const deleteStudentButton = document.getElementById('delete-student')

if (editStudentButton && deleteStudentButton) { 
    editStudentButton.addEventListener('click', async() => {
        const studentId = editStudentButton.getAttribute('data')//Gets id of the student saved in the button
        const classroom = document.getElementById('class-edit').value
        const pendingBills = document.getElementById('pendingBills-edit').value
        await axios({
            method: 'PUT',
            url: `http://localhost:3000/edit-student/${studentId}`,
            data: {class: classroom, pendingBills}
        })
        window.location.assign(`http://localhost:3000/student/${studentId}`)
    })

    deleteStudentButton.addEventListener('click', async() => {
        const studentId = deleteStudentButton.getAttribute('data')
        await axios({ 
            method: 'DELETE',
            url: `http://localhost:3000/student/${studentId}`
        })
        window.location.assign('http://localhost:3000/all-students')
    })
}
