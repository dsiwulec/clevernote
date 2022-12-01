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
export const createNewNotebook = name => async dispatch => {
    const response = await fetch('/api/notebooks/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })

    if (response.ok) {
        const newNotebook = await response.json()
        dispatch(addNotebook(newNotebook))
        return newNotebook
    }
}

export const getAllNotebooks = () => async dispatch => {
    const response = await fetch('/api/notebooks/')

    if (response.ok) {
        const notebooks = await response.json()
        dispatch(loadNotebooks(notebooks))
        return notebooks
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const updateNotebook = notebook => async dispatch => {
    const response = await fetch(`/api/notebooks/${notebook.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: notebook.name })
    })

    if (response.ok) {
        const editedNotebook = await response.json()
        dispatch(editNotebook(editedNotebook))
        return editedNotebook
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const deleteNotebook = notebookId => async dispatch => {
    const response = await fetch(`/api/notebooks/${notebookId}`, { method: 'DELETE' })

    if (response.ok) {
        dispatch(removeNotebook(notebookId))
    }
}

// Reducer
const notebookReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NOTEBOOK: {
            state[action.notebook.id] = action.notebook
            return { ...state }
        }

        case LOAD_NOTEBOOKS: {
            action.notebooks.Notebooks.forEach(notebook => state[notebook.id] = notebook)
            return { ...state }
        }

        case UPDATE_NOTEBOOK: {
            state[action.notebook.id] = action.notebook
            return { ...state }
        }

        case DELETE_NOTEBOOK: {
            delete state[action.notebookId]
            return { ...state }
        }

        default:
            return state
    }
}

export default notebookReducer
