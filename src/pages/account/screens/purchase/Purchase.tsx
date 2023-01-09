import { useState } from 'react';
import { useAccountContext } from '../../context/index';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import AccountService from '../../services';
import { useNavigate } from 'react-router';
import Error from '../../../shared/Error';
import { Navbar } from 'react-bootstrap';

export default () => {
    const {
        purchaseValue, serPurchaseValue,
        purchaseDescription, setPurchaseDescription,
    } = useAccountContext();
    const navigate = useNavigate();

    const service = new AccountService()
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const purchase = async () => {
        if(purchaseDescription == ''){
            setError('Description cannot be empty')
            setShowError(true)
            return
        }
        if(purchaseValue == 0){
            setError('Please set a purchase value')
            setShowError(true)
            return
        }
        const response = await service.purchase({
            id: '',
            value: purchaseValue,
            description: purchaseDescription
        })
        if (response.status != 201) {
            setError(response.data.message)
            setShowError(true)
        } else {
            navigate('/balance', { replace: true })
            navigate(0)
        }

    }
    const handleChangeValue = (value: string) => {
        if (/^-?\d+$/.test(value))
            serPurchaseValue(value)
    }

    return (
        <Container>
            <Error showError={showError} error={error} close={() => setShowError(false)} />
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Purchase</Navbar.Brand>
            </Navbar>

            <Form>

                <Form.Group className="mb-3">
                    <Form.Label>Purchase value</Form.Label>
                    <Form.Control type="text" value={purchaseValue} onChange={(e) => handleChangeValue(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="" value={purchaseDescription} onChange={(e) => setPurchaseDescription(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={() => purchase()}>
                    Finish
                </Button>
            </Form>
        </Container>
    );
}