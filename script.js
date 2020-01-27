const noteAddForm = document.querySelector('#add-note')
const noteContentInput = document.querySelector('#content-note')
let notes = []

const notesJSON = localStorage.getItem('notes')
if (notesJSON !== null) {
    notes = JSON.parse(notesJSON)
}

const updateLocalStorage = function () {
    localStorage.setItem('notes', JSON.stringify(notes))
    localStorage.getItem('notes')
}

const showNotes = function () {
    notes.forEach(function (note, id) {
        const noteContainer = document.createElement('p')
        noteContainer.className = `d-flex flex-column flex-wrap note`
        noteContainer.textContent = note.content
        noteContainer.id = id
        noteContainer.style.background = `#${notes[id].color}`
        document.querySelector('.content').appendChild(noteContainer)
    })
}
showNotes()

const refreshNotes = function () {
    document.querySelector('.content').remove()
    let refreshedContainer = document.createElement('div')
    refreshedContainer.className = 'content col-12 col-md-10 d-flex align-items-start flex-wrap'
    document.querySelector('.notes-container').appendChild(refreshedContainer)
}

const newNote = function () {
    noteAddForm.addEventListener('submit', function(e, note) {
        e.preventDefault()
        refreshNotes()
        notes.push({
            content: noteContentInput.value,
            added: new Date(),
            color: 'ebeb00'
        })
        localStorage.setItem('notes', JSON.stringify(notes))
        noteContentInput.value = ''
        showNotes()
        location.reload()
    })
}
newNote()

const noteCard = document.querySelectorAll('.note')

const editNote = function () {
    noteCard.forEach(function (target) {
        target.addEventListener('click', function (e) {
            let notesArray = notes
            const modalTextArea = document.querySelector('#editNoteValue')
            const buttonSaveNote = document.querySelector('#saveNote')
            const buttonRemoveNote = document.querySelector('#removeNote')
            const containerId = this.id
            const colorPicker = document.querySelector('#colorValue')
            const presets = {
                done: document.querySelector('#presetDone'),
                important: document.querySelector('#presetImportant'),
                neutral: document.querySelector('#presetNeutral'),
                default: document.querySelector('#presetDefault')
            }
            $("#editModal").modal('toggle')
            modalTextArea.value = e.target.innerHTML
            if (notesArray[this.id].color != undefined) {
                colorPicker.value = notesArray[this.id].color
                colorPicker.style.background = `#${notesArray[this.id].color}`
            } else {
                colorPicker.value = 'Brak'
            }
            buttonSaveNote.addEventListener('click', function (e) {
                const pushChanges = function () {
                    notesArray[containerId] = {
                        content: modalTextArea.value,
                        changed: new Date(),
                        color: colorPicker.value
                    }
                }
                pushChanges()
                updateLocalStorage()
                $("#editModal").modal('hide')
                location.reload()
            })
            buttonRemoveNote.addEventListener('click', function (e) {
                notesArray.splice(containerId,1)
                updateLocalStorage()
                $("#editModal").modal('hide')
                location.reload()
            })
            presets.done.addEventListener('click', function (e) {colorPicker.value = '57EB55'; colorPicker.style.background = '#57EB55'})
            presets.important.addEventListener('click', function (e) {colorPicker.value = 'EB6565'; colorPicker.style.background = '#EB6565'})
            presets.neutral.addEventListener('click', function (e) {colorPicker.value = '63BCEB'; colorPicker.style.background = '#63BCEB'})
            presets.default.addEventListener('click', function (e) {colorPicker.value = 'EBEB00'; colorPicker.style.background = '#EBEB00'})
        })
    })
}
editNote()