import { Toast } from "react-bootstrap"

export default (props:any) => {

    return(
        <Toast
        className="d-inline-block m-1"
        style={{position:'relative',left: '37%'}}
        bg={'danger'} 
        show={props.showError} onClick={() => props.close()}
        onClose={() => props.close()}
        delay={3000} autohide>
        <Toast.Body className={'text-white'}>
            {props.error}
        </Toast.Body>
    </Toast>
    )
}