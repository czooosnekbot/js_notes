const global = {
    stylesheet: document.querySelector('#stylesheetLink'),
}

let data = {
    notes: [],
    customStyles: [],
    notesJSON: localStorage.getItem('notes'),
    customStylesJSON: localStorage.getItem('customs'),
    fetcher: function () {
        if (this.notesJSON !== null & this.notesJSON !== '') {
            data.notes = JSON.parse(this.notesJSON)
        }
        if (this.customStylesJSON !== null & this.customStylesJSON !== '') {
            data.customStyles = JSON.parse(this.customStylesJSON)
        }
    },
    updater: function () {
        localStorage.setItem('notes', JSON.stringify(notes))
        localStorage.getItem('notes')
        localStorage.setItem('customs', JSON.stringify(customStyles))
        localStorage.getItem('customs')
    },
}

const notes = {
    container: document.querySelectorAll('.note'),
    add: function () {
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
    },
    edit: function () {
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
    },
    show: function () {
        notes.forEach(function (note, id) {
            const noteContainer = document.createElement('p')
            noteContainer.className = `d-flex flex-column flex-wrap note`
            noteContainer.textContent = note.content
            noteContainer.id = id
            noteContainer.style.background = `#${notes[id].color}`
            document.querySelector('.content').appendChild(noteContainer)
        })
    },
    refresh: function () {
        const stickyNotes = document.querySelectorAll('.note')
        stickyNotes.forEach(function (note) {
            note.remove()
        })
    },
}

const settings = {
    currentTheme: localStorage.getItem('theme'),
    buttons = {
        wipeAll: document.querySelector('#wipeAll'),
        wipeNotes: document.querySelector('#wipeNotes'),
        wipeCustoms: document.querySelector('#wipeCustoms'),
        lightTheme: document.querySelector('#lightTheme'),
        darkTheme: document.querySelector('#darkTheme'),
        showSettings: document.querySelector('#buttonSettings'),
    },
    show: function () {
        this.buttons.showSettings.addEventListener('click', function (e) {
            settingsHandler()
            $("#settingsModal").modal('toggle')
        })    
    },
    wipe: function () {
        this.buttons.wipeAll.addEventListener('click', function (e) {
            localStorage.setItem('notes', '')
            localStorage.getItem('notes')
            localStorage.setItem('customs', '')
            localStorage.getItem('customs')
            $("#settingsModal").modal('hide')
            location.reload()
        })
        this.buttons.wipeNotes.addEventListener('click', function (e) {
            localStorage.setItem('notes', '')
            localStorage.getItem('notes')
            $("#settingsModal").modal('hide')
            location.reload()
        })
        this.buttons.wipeCustoms.addEventListener('click', function (e) {
            localStorage.setItem('customs', '')
            localStorage.getItem('customs')
            $("#settingsModal").modal('hide')
            location.reload()
        })
    },
    radioboxUpdater: function () {
        if (selectedTheme === 'dark') {
            this.buttons.darkTheme.checked = true
        } else {
            this.buttons.lightTheme.checked = true
        }
    },
    themeSaver: function () {
        this.buttons.lightTheme.addEventListener('click', (e) => (localStorage.setItem('theme', 'light'), setTheme()))
        this.buttons.darkTheme.addEventListener('click', (e) => (localStorage.setItem('theme', 'dark'), setTheme()))
    },
    themeApplier: function () {
        if (this.currentTheme === 'dark') {
            global.stylesheet.href = './css/dark.css'
        } else {
            global.stylesheet.href = './css/style.css'
        }
    }
}

const customs = {
    settingsElements = {
        dropdown: document.querySelectorAll('.customsmanagerlist'),
        dropdownItem: document.createElement('option'),
    },
    manager: function () {
        const customsLister = function () {
            if (this.settingsElements.dropdown !== 0) {
                this.settingsElements.dropdown.forEach(function (elem) {
                    elem.remove()
                })
            }
            if (customStyles.length !== 0) {
                customStyles.forEach(function (custom, style, name) {
                    const customsDropdown = document.querySelector('#customsManager')
                    this.settingsElements.dropdownItem.className = 'customsmanagerlist'
                    this.settingsElements.dropdownItem.textContent = custom.name
                    this.settingsElements.dropdownItem.value = `customTheme${customStyles.indexOf(custom)}`
                    customsDropdown.appendChild(this.settingsElements.dropdownItem)
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
                customsListerManager()
            })
        }
        customsLister()
        customsDeleter()
    }
}