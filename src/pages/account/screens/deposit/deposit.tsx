import { useState } from 'react';
import { useAccountContext } from '../../context/index';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import AccountService from '../../services';
import { useNavigate } from 'react-router-dom';
import Error from '../../../shared/Error';
import AsyncStorage from '../../../../common/AsyncStorage';
import { Navbar } from 'react-bootstrap';

export default () => {
    const {
        depositValue, setDepositValue,
    } = useAccountContext();
    const navigate = useNavigate();

    const service = new AccountService()
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    const [selectedFile, setSelectedFile] = useState<any>()
    // On file select (from the pop up)
    const onFileChange = (event: any) => {
        // Update the state
        setSelectedFile(event.target.files[0]);

    };

    // On file upload (click the upload button)
    const deposit = async () => {
    const account_id = await AsyncStorage.getItem("account_id");


        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "image",
            selectedFile,
            selectedFile.name
        );
        formData.append('value', depositValue.toString())
        formData.append('id', account_id ? account_id : '0')

        await service.deposit(formData)
        navigate('/balance', { replace: true })
        navigate(0)
    };

    const handleChangeValue = (value: string) => {
        if (/^-?\d+$/.test(value))
            setDepositValue(value)
    }

    return (
        <Container>
            <Error showError={showError} error={error} />

            <Navbar bg="light" expand="lg">
            <Navbar.Brand>Deposit</Navbar.Brand>
            </Navbar>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>File receipt</Form.Label>
                    <Form.Control type="file" onChange={e => onFileChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Value to add</Form.Label>
                    <Form.Control type="text" value={depositValue} onChange={(e) => handleChangeValue(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={() => deposit()}>
                    Deposit
                </Button>
            </Form>
        </Container>
    );
}