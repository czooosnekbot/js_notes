const noteAddForm = document.querySelector('#add-note')
const noteContentInput = document.querySelector('#content-note')
let notes = []
let customStyles = []

const notesJSON = localStorage.getItem('notes')
const customStylesJSON = localStorage.getItem('customs')
if (notesJSON !== null & notesJSON !== '') {
    notes = JSON.parse(notesJSON)
}
if (customStylesJSON !== null & customStylesJSON !== '') {
    customStyles = JSON.parse(customStylesJSON)
}

const updateLocalStorage = function () {
    localStorage.setItem('notes', JSON.stringify(notes))
    localStorage.getItem('notes')
    localStorage.setItem('customs', JSON.stringify(customStyles))
    localStorage.getItem('customs')
}

const setTheme = function () {
    const stylesheet = document.querySelector('#stylesheetLink')
    const selectedTheme = localStorage.getItem('theme')
    if (selectedTheme === 'dark') {
        stylesheet.href = './css/dark.css'
    } else {
        stylesheet.href = './css/style.css'
    }
}
setTheme()

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
    const stickyNotes = document.querySelectorAll('.note')
    stickyNotes.forEach(function (note) {
        note.remove()
    })
}

const newNote = function () {
    noteAddForm.addEventListener('submit', function(e) {
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
                colorPicker.style.transition = '.4s'
            } else {
                colorPicker.value = 'Brak'
            }
            buttonSaveNote.addEventListener('click', function (e) {
                const pushNotesChanges = function () {
                    notesArray[containerId] = {
                        content: modalTextArea.value,
                        changed: new Date(),
                        color: colorPicker.value
                    }
                }
                pushNotesChanges()
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
            presets.done.addEventListener('click', (e) => (colorPicker.value = '57EB55', colorPicker.style.background = '#57EB55'))
            presets.important.addEventListener('click', (e) => (colorPicker.value = 'EB6565', colorPicker.style.background = '#EB6565'))
            presets.neutral.addEventListener('click', (e) => (colorPicker.value = '63BCEB', colorPicker.style.background = '#63BCEB'))
            presets.default.addEventListener('click', (e) => (colorPicker.value = 'EBEB00', colorPicker.style.background = '#EBEB00'))
            colorPicker.addEventListener('change', (e) => (saveStyleButton.style = `border: 1px solid #${e.target.value} !important`))
        })
    })
}
editNote()

const settingsHandler = function () {
    const wipeAllButton = document.querySelector('#wipeAll')
    const wipeNotesButton = document.querySelector('#wipeNotes')
    const wipeCustomsButton = document.querySelector('#wipeCustoms')
    const wipeHandler = function () {
        wipeAllButton.addEventListener('click', function (e) {
            localStorage.setItem('notes', '')
            localStorage.getItem('notes')
            localStorage.setItem('customs', '')
            localStorage.getItem('customs')
            $("#settingsModal").modal('hide')
            location.reload()
        })
        wipeNotesButton.addEventListener('click', function (e) {
            localStorage.setItem('notes', '')
            localStorage.getItem('notes')
            $("#settingsModal").modal('hide')
            location.reload()
        })
        wipeCustomsButton.addEventListener('click', function (e) {
            localStorage.setItem('customs', '')
            localStorage.getItem('customs')
            $("#settingsModal").modal('hide')
            location.reload()
        })
    }
    wipeHandler()
    const lightThemeButton = document.querySelector('#lightTheme')
    const darkThemeButton = document.querySelector('#darkTheme')
    const selectedTheme = localStorage.getItem('theme')
    const themeRadioboxChecker = function () {
        if (selectedTheme === 'dark') {
            darkThemeButton.checked = true
        } else {
            lightThemeButton.checked = true
        }
    }
    themeRadioboxChecker()
    const themeApplier = function () {
        lightThemeButton.addEventListener('click', (e) => (localStorage.setItem('theme', 'light'), setTheme()))
        darkThemeButton.addEventListener('click', (e) => (localStorage.setItem('theme', 'dark'), setTheme()))
    }
    themeApplier()
    const customThemesManager = function () {
        const customsListerManager = function () {
            const customsDropdownRenderedItems = document.querySelectorAll('.customsmanagerlist')
            if (customsDropdownRenderedItems !== 0) {
                customsDropdownRenderedItems.forEach(function (elem) {
                    elem.remove()
                })
            }
            if (customStyles.length !== 0) {
                customStyles.forEach(function (custom, style, name) {
                    const customsDropdown = document.querySelector('#customsManager')
                    const customsDropdownItem = document.createElement('option')
                    customsDropdownItem.className = 'customsmanagerlist'
                    customsDropdownItem.textContent = custom.name
                    customsDropdownItem.value = `customTheme${customStyles.indexOf(custom)}`
                    customsDropdown.appendChild(customsDropdownItem)
                    customsManagerButton.className = 'ml-2 btn btn-info text-center'
                })
            } else {
                const customsManagerButton = document.querySelector('#customsManagerButton')
                customsManagerButton.className = 'ml-2 btn btn-info text-center disabled'
            }
        }
        const customsDeleter = function () {
            const deleteButton = document.querySelector('#customsManagerButton')
            deleteButton.addEventListener('click', function (e) {
                const selected = $("#customsManager :selected").val();
                const selectedId = selected.slice(11)
                customStyles.splice(selectedId, 1)
                updateLocalStorage()
            })
        }
        customsListerManager()
        customsDeleter()
    }
    customThemesManager()
}

const showSettings = function () {
    const settingsButton = document.querySelector('#buttonSettings')
    settingsButton.addEventListener('click', function (e) {
        settingsHandler()
        $("#settingsModal").modal('toggle')
    })    
}
showSettings()

const customThemesHandler = function () {
    const customTemplatesSaver = function () {
        const templatesSaverButton = document.querySelector('#saveStyleButton')
        templatesSaverButton.addEventListener('click', function (e) {
            if (customStyles.length > 5) {
                templatesSaverButton.style = 'transition: .6s; color: gray; background: rgba(227, 91, 64, .2)'
                templatesSaverButton.textContent = 'Only 6 styles allowed!'
            } else {
                const colorPicker = document.querySelector('#colorValue')
                customStyles.push({
                    style: colorPicker.value,
                    name: `Style ${(customStyles.length + 1)}`
                })
                console.log(customStyles)
                updateLocalStorage()
                customTemplatesShower()
            }
        })
    }   
    customTemplatesSaver()
    const customTemplatesShower = function () {
        const templatesListRefresher = function () {
            const container1 = document.querySelector('.availableStyles')
            const container2New = document.createElement('div')
            const container2Rendered = document.querySelector('#renderedStyles')
            if (container2Rendered) {
                container2Rendered.remove()
                container2New.id = 'renderedStyles'
                container1.appendChild(container2New)
            } else {
                container2New.id = 'renderedStyles'
                container1.appendChild(container2New)
            }
        }
        templatesListRefresher()
        const colorPicker = document.querySelector('#colorValue')
        if (customStyles.length === 0) {
            const noTemplatesLabel = document.createElement('span')
            const templatesMenu = document.querySelector('#renderedStyles')
            noTemplatesLabel.textContent = 'You have no saved custom styles!'
            noTemplatesLabel.id = 'noSavedCustoms'
            templatesMenu.appendChild(noTemplatesLabel)
        } else {
            const templatesLister = function () {
                customStyles.forEach(function (template, style, name) {
                    const templatesLabel = document.createElement('span')
                    const templatesMenu = document.querySelector('#renderedStyles')
                    console.log(template)
                    templatesLabel.textContent = template.name
                    templatesLabel.style = `color: #${template.style}; padding-left: .4rem;`
                    templatesLabel.addEventListener('click', function (e) {
                        colorPicker.value = template.style
                        colorPicker.style.background = `#${template.style}`
                    })
                    templatesMenu.appendChild(templatesLabel)
                })
            }
            templatesLister()
        }
    }
    customTemplatesShower()
}
customThemesHandler()