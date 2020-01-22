const noteCard = document.querySelectorAll('p')
const noteAddForm = document.querySelector('#add-note')
const noteContentInput = document.querySelector('#content-note')
let notes = []

const notesJSON = localStorage.getItem('notes')
if (notesJSON !== null) {
    notes = JSON.parse(notesJSON)
}

const showNotes = function () {
    notes.forEach(function (note) {
        const noteContainer = document.createElement('p')
        noteContainer.textContent = note.content
        document.querySelector('.content').appendChild(noteContainer)
    })
}
showNotes()

const refreshNotes = function () {
    document.querySelector('.content').remove()
    var refreshedContainer = document.createElement('div')
    refreshedContainer.className = 'content col-12 col-md-10 d-flex align-items-start flex-wrap'
    document.querySelector('.notes-container').appendChild(refreshedContainer)
}


noteAddForm.addEventListener('submit', function(e, note) {
    e.preventDefault()
    refreshNotes()
    notes.push({
        content: noteContentInput.value
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    noteContentInput.value = ''
    showNotes()
})