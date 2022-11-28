const CREATE_NOTEBOOK = 'notebook/CREATE_NOTEBOOK'
const LOAD_NOTEBOOKS = 'notebook/LOAD_NOTEBOOKS'
const UPDATE_NOTEBOOK = 'notebook/UPDATE_NOTEBOOK'
const DELETE_NOTEBOOK = 'notebook/DELETE_NOTEBOOK'


// Action Creators
const addNotebook = notebook => ({
    type: CREATE_NOTEBOOK,
    notebook
})

const loadNotebooks = notebooks => ({
    type: LOAD_NOTEBOOKS,
    notebooks
})

const editNotebook = notebook => ({
    type: UPDATE_NOTEBOOK,
    notebook
})

const removeNotebook = notebookId => ({
    type: DELETE_NOTEBOOK,
    notebookId
})


// Thunks
export const createNewNotebook = note => async dispatch => {
    const response = await fetch('/api/notebooks', { method: 'POST' })

    if (response.ok) {
        dispatch(addNotebook(note))
    }
}

export const getAllNotebooks = notebooks => async dispatch => {
    const response = await fetch('/api/notebooks')

    if (response.ok) {
        dispatch(loadNotebooks(notebooks))
    }
}

export const updateNotebook = notebook => async dispatch => {
    const response = await fetch(`/api/notes/${notebook.id}`, { method: 'PUT' })

    if (response.ok) {
        dispatch(editNotebook({ title: note.title, text: note.text }))
    }
}

export const deleteNotebook = notebookId => async dispatch => {
    const response = await fetch(`/api/notes/${notebookId}`, { method: 'DELETE' })

    if (response.ok) {
        dispatch(removeNotebook(notebookId))
    }
}

// Reducer
const notebookReducer = (state = { notebooks: {} }, action) => {
    switch (action.type) {
        case CREATE_NOTEBOOK: {
            state.notebooks[action.notebook.id] = action.notebook
            return { notebooks: { ...state.notebooks } }
        }

        case LOAD_NOTEBOOKS: {
            action.notebooks.Notebooks.forEach(notebook => state.notebooks[notebook.id] = notebook)
            return { notebooks: { ...state.notebooks } }
        }

        case UPDATE_NOTEBOOK: {
            state.notebooks[action.notebook.id] = notebook
            return { notebooks: { ...state.notebooks } }
        }

        case DELETE_NOTEBOOK: {
            delete state.notebooks[action.notebook.id]
            return { notebooks: { ...state.notebooks } }
        }

        default:
            return state
    }
}

export default notebookReducer
