import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../action/UserAction'


const initialState = {
    user: null,
    loading: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer