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
export const createNewNote = () => async dispatch => {
    const notebookResponse = await fetch('/api/notebooks/default')
    const defaultNotebook = await notebookResponse.json()

    const response = await fetch('/api/notes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: '', text: '', notebookId: defaultNotebook.id })
    })

    if (response.ok) {
        const newNote = await response.json()
        dispatch(addNote(newNote))
    }
}

export const getAllNotes = () => async dispatch => {
    const response = await fetch('/api/notes/')

    if (response.ok) {
        const notes = await response.json()
        dispatch(loadNotes(notes))
    }
}

export const getNotebookNotes = (id) => async dispatch => {
    const response = await fetch(`/api/notebooks/${id}/notes`)

    if (response.ok) {
        const notes = await response.json()
        dispatch(loadNotes(notes))
        return notes
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const updateNote = note => async dispatch => {
    const response = await fetch(`/api/notes/${note.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notebookId: note.notebookId, title: note.title, text: note.text })
    })

    if (response.ok) {
        const editedNote = await response.json()
        dispatch(editNote(editedNote))
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
            state = {}
            action.notes.Notes.forEach(note => state[note.id] = note)
            return { ...state }
        }

        case UPDATE_NOTE: {
            state[action.note.id] = action.note
            return { ...state.notes }
        }

        case DELETE_NOTE: {
            delete state[action.noteId]
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
