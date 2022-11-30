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
const noteReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NOTE: {
            state[action.note.id] = action.note
            return { ...state }
        }

        case LOAD_NOTES: {
            action.notes.Notes.forEach(note => state[note.id] = note)
            return { ...state.notes }
        }

        case UPDATE_NOTE: {
            state[action.note.id] = action.note
            return { ...state.notes }
        }

        case DELETE_NOTE: {
            delete state[action.note.id]
            return { ...state }
        }

        case DELETE_NOTEBOOK_NOTES: {
            for (const note in state) {
                if (note.notebookId === action.notebookId) delete state[note.id]
            }
            return { ...state.notes }
        }

        default:
            return state
    }
}

export default noteReducer
