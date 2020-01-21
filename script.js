const noteCard = document.querySelectorAll('p')
const noteAddForm = document.querySelector('#add-note')
const noteContentInput = document.querySelector('#content-note')
const notes = {
    
}
for (i=0;i<=20;i++) {
    const objectLength = Object.keys(notes).length
    localStorage.getItem(`Note${(objectLength + 1)}`)
}
noteAddForm.addEventListener('submit', function(e, note) {
    e.preventDefault()
    const objectLength = Object.keys(notes).length
    if (noteContentInput.value != "") {
        notes[`Note${(objectLength + 1)}`] = noteContentInput.value
        localStorage.setItem(`Note${(objectLength + 1)}`, noteContentInput.value)
        noteContentInput.value = ''
    }
    if (notes.lenght > 0) {
        document.removeChild(noteCard);
    }
    console.log(notes)
})