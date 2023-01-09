import axios from 'axios';
const urlBase = process.env.REACT_APP_BACKEND_BASE_URL

export default class ProfessionalService {

    login = async (obj:any) => {        
        try {
            const response = await axios.post(`${urlBase}/api/user/login`,obj)
            return response
        } catch (error:any) {
            return error.response
        }
    }

    signup = async (obj: any) => {        
        try {

            const response = await axios.post(`${urlBase}/api/user/signup`,obj)
            return response
        } catch (error:any) {
            return error.response
        }
    }

}