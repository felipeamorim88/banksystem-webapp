import axios from 'axios';
const urlBase = process.env.REACT_APP_BACKEND_BASE_URL
const token = localStorage.getItem("access_token");
const user_id = localStorage.getItem("user_id");
const account_id = localStorage.getItem("account_id");

const headerAuth = {
    headers: {
        'Authorization': `Bearer ${token}`
    },
}

export default class AccountService {

    createAccount = async (password: string) => {
        try {
            const response = await axios.post(`${urlBase}/api/account`, { password: password }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            return response
        } catch (error: any) {
            return error.response
        }
    }
    verifyAccount = async (username: string, password: string) => {
        console.log(headerAuth)
        try {
            const data = {
                username: username,
                password: password
            }
            const response = await axios.post(`${urlBase}/api/account/verification`,data, headerAuth)
            return response
        } catch (error: any) {
    return error.response
}
    }
getBalance = async () => {
    try {
        const response = await axios.get(`${urlBase}/api/financial-movement/user/${user_id}`, headerAuth)
        return response
    } catch (error: any) {
        return error.response
    }
}
deposit = async (form: FormData) => {
    try {
        const response = await axios.post(`${urlBase}/api/account/deposit`, form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            },
        })
        return response
    } catch (error: any) {
        return error.response
    }
}
getPending = async () => {
    try {
        const response = await axios.get(`${urlBase}/api/financial-movement/pending`, headerAuth)
        return response
    } catch (error: any) {
        return error.response
    }
}
approve = async (id: string) => {
    try {
        const response = await axios.post(`${urlBase}/api/account/transaction/accept/${id}`, {}, headerAuth)
        return response
    } catch (error: any) {
        return error.response
    }
}
reject = async (id: string) => {
    try {
        const response = await axios.post(`${urlBase}/api/account/transaction/reject/${id}`, {}, headerAuth)
        return response
    } catch (error: any) {
        return error.response
    }
}
purchase = async (obj: any) => {
    try {
        obj.id = account_id
        const response = await axios.post(`${urlBase}/api/purchasing`, obj, headerAuth)
        return response
    } catch (error: any) {
        return error.response
    }
}
}