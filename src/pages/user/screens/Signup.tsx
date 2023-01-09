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
        setEmail,
        email,
        setPassword,
        password,
    } = useUserContext();
    const navigate = useNavigate();

    const loginService = new LoginService()
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const signup = async () => {
        if (nome == '' || email == '' || password == '') {
            setError('There are empty values')
            setShowError(true)
            return
        }
        const response = await loginService.signup({
            name: nome,
            email: email,
            password: password,
        })
        if (response.status != 201) {
            setError('Internal server Error')
            setShowError(true)
        } else {
            const userData = await loginService.login({
                name: nome,
                password: password
            })
            console.log(userData)
            await AsyncStorage.setItem('user_id', userData.data.user_id)
            await AsyncStorage.setItem('user_type', userData.data.user_type)
            await AsyncStorage.setItem('access_token', userData.data.access_token)
            navigate('/create-account', { replace: true })
            navigate(0)
        }

    }

    return (
        <UserContextProvider>
            <Error showError={showError} error={error} close={() => setShowError(false)} />
            <Container>
                <Form className='centered'>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="user name" onChange={(e) => setNome(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={() => signup()}>
                        Signup
                    </Button>
                </Form>
            </Container>
        </UserContextProvider>
    );
}