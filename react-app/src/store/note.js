const CREATE_NOTE = 'note/CREATE_NOTE'
const LOAD_NOTES = 'note/LOAD_NOTES'
const UPDATE_NOTE = 'note/UPDATE_NOTE'
const DELETE_NOTE = 'note/DELETE_NOTE'
const DELETE_NOTEBOOK_NOTES = 'note/DELETE_NOTEBOOK_NOTES'


// Action Creators
const addNote = note => ({
    type: CREATE_NOTE,
    note
})

const loadNotes = notes => ({
    type: LOAD_NOTES,
    notes
})

const editNote = note => ({
    type: UPDATE_NOTE,
    note
})

const removeNote = noteId => ({
    type: DELETE_NOTE,
    noteId
})

const removeNotebookNotes = notes => ({
    type: DELETE_NOTEBOOK_NOTES,
    notes
})


// Thunks
export const createNewNote = note => async dispatch => {
    const response = await fetch('/api/notes', { method: 'POST' })

    if (response.ok) {
        dispatch(addNote(note))
    }
}

export const getAllNotes = notes => async dispatch => {
    const response = await fetch('/api/notes')

    if (response.ok) {
        dispatch(loadNotes(notes))
    }
}

export const updateNote = note => async dispatch => {
    const response = await fetch(`/api/notes/${note.id}`, { method: 'PUT' })

    if (response.ok) {
        dispatch(editNote({ title: note.title, text: note.text }))
    }
}

export const deleteNote = noteId => async dispatch => {
    const response = await fetch(`/api/notes/${noteId}`, { method: 'DELETE' })

    if (response.ok) {
        dispatch(removeNote(noteId))
    }
}

// Using a fetch is unneccessary, the delete cascade from deleting a notebook will remove associated notes from the database
export const deleteNotebookNotes = notebookId => async dispatch => dispatch(removeNotebookNotes(notebookId))


// Reducer
const noteReducer = (state = { notes: {} }, action) => {
    switch (action.type) {
        case CREATE_NOTE: {
            state.notes[action.note.id] = action.note
            return { notes: { ...state.notes } }
        }

        case LOAD_NOTES: {
            action.notes.Notes.forEach(note => state.notes[note.id] = note)
            return { notes: { ...state.notes } }
        }

        case UPDATE_NOTE: {
            state.notes[action.note.id] = note
            return { notes: { ...state.notes } }
        }

        case DELETE_NOTE: {
            delete state.notes[action.note.id]
            return { notes: { ...state.notes } }
        }

        case DELETE_NOTEBOOK_NOTES: {
            for (const note in state.notes) {
                if (note.notebookId === action.notebookId) delete state.notes[note.id]
            }
            return { notes: { ...state.notes } }
        }

        default:
            return state
    }
}

export default noteReducer
