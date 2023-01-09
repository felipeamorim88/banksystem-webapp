import { useState } from 'react';
import { UserContextProvider, useUserContext } from '../context/index';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import LoginService from '../services';
import Error from '../../shared/Error';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '../../../common/AsyncStorage';


export default () => {
    const {
        setNome,
        nome,
        setPassword,
        password,
    } = useUserContext();
    const navigate = useNavigate();

    const loginService = new LoginService()

    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const login = async () => {
        const response = await loginService.login({
            name: nome,
            password: password
        })
        if (response.status != 200) {
            setError(response.data.message)
            setShowError(true)
        } else {
            await AsyncStorage.setItem('user_id', response.data.user_id)
            await AsyncStorage.setItem('user_type', response.data.user_type)
            await AsyncStorage.setItem('account_id', response.data.account_id)
            await AsyncStorage.setItem('access_token', response.data.access_token)
            response.data.account_Id == 0 ? navigate('/create-account', { replace: true }) : navigate('/verify-account', { replace: true })
            navigate(0)
        }
    }

    const handleChange = (e: any) => {
        switch (e.target.name) {
            case 'username':
                setNome(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
        }

    }

    return (
        <UserContextProvider>
            <Container>
                <Error showError={showError} error={error} close={() => setShowError(false)}/>
                <Form className='centered'>
                    <Form.Group className="mb-3">
                        <Form.Label>User name</Form.Label>
                        <Form.Control name="username" type="text" placeholder="username" onChange={(e) => { handleChange(e) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => { handleChange(e) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <a href='signup'>Signup?</a>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={() => login()}>
                        Login
                    </Button>
                </Form>
            </Container>
        </UserContextProvider>
    );
}