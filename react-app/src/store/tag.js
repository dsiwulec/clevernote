const CREATE_TAG = 'notebook/CREATE_TAG'
const LOAD_TAGS = 'notebook/LOAD_TAGS'
const UPDATE_TAG = 'notebook/UPDATE_TAG'
const DELETE_TAG = 'notebook/DELETE_TAG'


// Action Creators
const addTag = tag => ({
    type: CREATE_TAG,
    tag
})

const loadTags = tags => ({
    type: LOAD_TAGS,
    tags
})

const editTag = tag => ({
    type: UPDATE_TAG,
    tag
})

const removeTag = tagId => ({
    type: DELETE_TAG,
    tagId
})


// Thunks
export const createNewTag = (tag) => async dispatch => {
    const response = await fetch('/api/tags/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag })
    })

    if (response.ok) {
        const newTag = await response.json()
        dispatch(addTag(newTag))
        return newTag
    }
}

export const getAllTags = () => async dispatch => {
    const response = await fetch('/api/tags/')

    if (response.ok) {
        const tags = await response.json()
        dispatch(loadTags(tags))
        return tags
    } else {
        const errors = await response.json()
        return errors;
    }
}


export const updateTag = tag => async dispatch => {
    const response = await fetch(`/api/tags/${tag.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: tag.tag })
    })

    if (response.ok) {
        const editedTag = await response.json()
        dispatch(editTag(editedTag))
        return editedTag
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const deleteTag = tagId => async dispatch => {
    const response = await fetch(`/api/tags/${tagId}`, { method: 'DELETE' })

    if (response.ok) {
        dispatch(removeTag(tagId))
    }
}

// Reducer
const tagReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_TAG: {
            state[action.tag.id] = action.tag
            return { ...state }
        }

        case LOAD_TAGS: {
            state = {}
            action.tags.Tags.forEach(tag => state[tag.id] = tag)
            return { ...state }
        }

        case UPDATE_TAG: {
            state[action.tag.id] = action.tag
            return { ...state }
        }

        case DELETE_TAG: {
            delete state[action.tagId]
            return { ...state }
        }

        default:
            return state
    }
}

export default tagReducer
