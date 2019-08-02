import toastr from '../../../assets/toast'
import axios from 'axios';
import { baseUrl } from '../../../config/server';

const signInAdmin = (credentials) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: 'REQUESTING' })

            // Make async request
            axios.post(baseUrl + '/admin/login', credentials).then(res => {
                localStorage.setItem('payld_token_s', res.data.token)
                toastr.showSuccessToast('Admin login was successful')
                dispatch({ type: 'ADMIN_SUCCESSFUL' });
                resolve()
            }).catch(err => {
                console.log(err.response)
                toastr.showDangerToast(err.response.data.message)
                dispatch({ type: 'ERROR' })
                reject(err.response.data.message)
            })
        })
    }
}

export default signInAdmin