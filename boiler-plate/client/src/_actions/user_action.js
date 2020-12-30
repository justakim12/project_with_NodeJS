import Axios from 'axios';
import {
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {

    const request = Axios.post('/api/user/login', body)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}