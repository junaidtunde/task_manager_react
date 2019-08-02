const initState = {
    tasks: [],
    users: [],
    loading: false,
    submit: false
}

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GOTTEN_TASKS':
            return {
                ...state,
                tasks: action.data,
                loading: false
            }

        case 'GOTTEN_USERS':
            return {
                ...state,
                users: action.data,
                loading: false
            }

        case 'REQUESTING_SOMETHING':
            return {
                ...state,
                loading: true
            }

        case 'REQUESTING_TASK':
            return {
                ...state,
                submit: true
            }

        case 'CREATED_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.data],
                submit: false
            }
        
        case 'ARCHIVED_TASK':
            const newTask =  state.tasks.map(element => {
                if (element._id === action.data) {
                    element.status = 'archived';
                }
                return element;
            })
            // console.log(newTask)
            return {
                ...state,
                tasks: newTask
            }
    
        default:
            return state
    }
}

export default taskReducer;