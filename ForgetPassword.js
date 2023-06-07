import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import {useRef} from 'react';



const ForgetPassword = () => {
 const emailInputRef= useRef()

 const submitHandler = async(event) =>{
    {console.log('clicked')}
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value;

    const  response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD6VduszkD-9r7WcI4G7HN3VlPpyGhtjCo',
    {
        method: "POST",
        body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: enteredEmail
        })
    })
    console.log(response)
    if(response.ok)   { 
        const data = await response.json();
        console.log(data)
        alert('Link sent to Entered Email')
    }else{
        const data = await response.json();
        alert(data.error.message)
    }
    emailInputRef.current.value=""
 }

    return (

        <Container className='mt-1'>
            <Row className='container justify-content-center m-5'>
                <Col lg={5}>
                    <Card className='container shadow-lg m-5'>
                        <Card.Body>
                            <Form className='container' onSubmit={submitHandler}>
                                <Card.Header className='p-3' style={{ textAlign: 'center' }}>
                                    <h4>Entered Registered Email</h4>
                                </Card.Header>

                                <Form.Group className='m-2' >
                                    <Form.Control type='text' placeholder='Email' ref={emailInputRef}>

                                    </Form.Control>
                                </Form.Group>
                                <div>
                                    <Button
                                        className='mt-2'
                                        style={{
                                            marginLeft: "45%"
                                        }}>
                                        ChangePassword
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>

    )

}

export default ForgetPassword;