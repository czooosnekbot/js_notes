const noteAddForm = document.querySelector('#add-note')
const noteContentInput = document.querySelector('#content-note')
let notes = []

const notesJSON = localStorage.getItem('notes')
if (notesJSON !== null) {
    notes = JSON.parse(notesJSON)
}

const showNotes = function () {
    notes.forEach(function (note, id) {
        const noteContainer = document.createElement('p')
        noteContainer.className = `d-flex flex-column flex-wrap note`
        noteContainer.id = id
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

const newNote = function () {
    noteAddForm.addEventListener('submit', function(e, note) {
        e.preventDefault()
        refreshNotes()
        notes.push({
            content: noteContentInput.value,
            added: new Date()
        })
        localStorage.setItem('notes', JSON.stringify(notes))
        noteContentInput.value = ''
        showNotes()
    })
}
newNote()

const noteCard = document.querySelectorAll('.note')

const deleteNote = function () {
    noteCard.forEach(function (target) {
        target.addEventListener('click', function (e) {
            notes.splice(target.id,1)
            refreshNotes()
            showNotes()
            localStorage.setItem('notes', JSON.stringify(notes))
            localStorage.getItem('notes')
        })
    })
}
deleteNote()