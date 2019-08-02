const initState = {
    user: localStorage.getItem('payld_token'),
    admin: localStorage.getItem('payld_token_s'),
    loading: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REQUESTING':
            return {
                ...state,
                loading: true
            }

        case 'SUCCESSFUL':
            return {
                ...state,
                user: localStorage.getItem('payld_token'),
                loading: false
            }

        case 'ERROR':
            return {
                ...state,
                loading: false
            }

        case 'ADMIN_SUCCESSFUL':
            return {
                ...state,
                admin: localStorage.getItem('payld_token_s'),
                loading: false
            }

        default:
            return state
    }
}

export default authReducer