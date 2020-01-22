const noteCard = document.querySelectorAll('p')
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
        const noteDeletionTrigger = document.createElement('i')
        noteContainer.className = `d-flex flex-column flex-wrap note-${id}`
        noteDeletionTrigger.className = 'fas fa-times delete-note'
        noteContainer.textContent = note.content
        noteContainer.appendChild(noteDeletionTrigger)
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
        content: noteContentInput.value,
        id: notes.length
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    noteContentInput.value = ''
    showNotes()
})