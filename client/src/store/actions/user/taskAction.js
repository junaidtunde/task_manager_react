import toastr from '../../../assets/toast'
import axios from 'axios';
import { baseUrl } from '../../../config/server';

let config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('payld_token_s')
    }
}

export const getAllTasks = () => {
    return ((dispatch, getState) => {
        dispatch({type: 'REQUESTING_SOMETHING'})

        // Make async request
        axios.get(baseUrl + '/task/all').then(res => {
            // console.log(res.data);
            dispatch({type: 'GOTTEN_TASKS', data: res.data.data})
        }).catch(err => {
            console.log(err.response.data.message)
        })
    })
}

export const getAllUsers = () => {
    return ((dispatch, getState) => {
        return new Promise ((resolve, reject) => {
            dispatch({type: 'REQUESTING_SOMETHING'})
    
            // Make async request
            axios.get(baseUrl + '/user/all').then(res => {
                // console.log(res.data);
                dispatch({type: 'GOTTEN_USERS', data: res.data.data})
                resolve()
            }).catch(err => {
                console.log(err.response.data.message)
                reject()
            })
        })
    })
}

export const create_new_task = (task) => {
    return ((dispatch, getState) => {
        dispatch({type: 'REQUESTING_TASK'})

        // Make async request
        axios.post(baseUrl + '/task/create', task, config).then(res => {
            // console.log(res.data);
            const obj = {
                description: res.data.data.description,
                user: {
                    username: res.data.user_name
                },
                comments: [],
                status: res.data.data.status,
                _id: res.data.data._id
            }
            dispatch({type: 'CREATED_TASK', data: obj})
            toastr.showSuccessToast(res.data.message)
        }).catch(err => {
            console.log(err.response.data)
            toastr.showDangerToast(err.response.data.message)
        })
    })
}

export const archiveTask = (task_id) => {
    return ((dispatch, getState) => {
        // Make async function
        const obj = {
            task_id
        }
        axios.put(baseUrl + '/task/archive', obj, config).then(res => {
            console.log(res.data);
            toastr.showSuccessToast('Successfully archived the task')
            dispatch({type: 'ARCHIVED_TASK', data: task_id})
        }).catch(err => {
            console.log(err.response);
            toastr.showDangerToast(err.response.data.message)
        })
    })
}