
import { useState, useRef } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import {useDispatch} from 'react-redux'
import  {authActions}  from './store/authentication';
import {useHistory} from 'react-router-dom';

const Login = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [loading, setIsLoading] = useState(false)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const cPassowrdInputRef = useRef()

    const dispatch = useDispatch()
    const history = useHistory()


    const toggleHandler = () => {
        setIsLogin(prev => !prev)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        setIsLoading(true)

        if (isLogin) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6VduszkD-9r7WcI4G7HN3VlPpyGhtjCo',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true
                    })
                })
            setIsLoading(false)
            if (response.ok) {
                const data = await response.json()
                dispatch(authActions.login({token : data.idToken, email : data.email}))
                history.replace('/welcome')
                console.log(data)
            } else {
                const data = await response.json()
                alert("login", data.error.message)
            }
        } else {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6VduszkD-9r7WcI4G7HN3VlPpyGhtjCo',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email: enteredEmail,
                            password: enteredPassword,
                            returnSecureToken: true
                        })
                    })
                setIsLoading(false)
                if (response.ok) {
                    const data = await response.json()
                    history.replace('/welcome')
                    alert('user register successfully')
                }
                else {
                    const data = await response.json()
                    alert("sign", data.error.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const forgetHandler = () =>  {  
        history.push('/forget')
    }


    return (
        <div>
            <Container className='mt-1'>
                <Row className='container justify-content-center m-5'>
                    <Col lg={5}>
                        <Card className='container shadow-lg m-5'>
                            <Card.Body>
                                <Form className='container' onSubmit={submitHandler} >
                                    <Card.Header className='p-3'>

                                        <h4>{isLogin ? 'Login' : "signup"}</h4>
                                    </Card.Header>

                                    <Form.Group className='m-2' >
                                        <Form.Control
                                            type='text'
                                            placeholder='Email'
                                            ref={emailInputRef}
                                        />
                                    </Form.Group>

                                    <Form.Group className='m-2'>
                                        <Form.Control
                                            type='password'
                                            placeholder='password'
                                            ref={passwordInputRef}
                                        />
                                    </Form.Group>

                                    <Form.Group className='m-2'>
                                        <Form.Control
                                            type='password'
                                            placeholder='ConfirmPassword'
                                            ref={cPassowrdInputRef}
                                        />
                                    </Form.Group>

                                    <div>
                                        {loading ? 'loading...' : <Button
                                            className='mt-2'
                                            style={{ marginLeft: '45%' }}
                                            type='submit'
                                        >
                                            {isLogin ? 'login' : 'signup'}
                                        </Button>}
                                    </div>

                                    <div>
                                        <Button
                                            className='col-md-12 mt-12 mt-3 text-primary'
                                            style={{
                                                border: "none",
                                                backgroundColor: "transparent",
                                                color: 'black'
                                            }}
                                            type='button'
                                            onClick={forgetHandler}>
                                            {isLogin && 'Forget Password'}
                                        </Button>
                                    </div>

                                    <div>
                                        <Button
                                            className='col-md-12 mt-12 mt-3 text-primary'
                                            style={{
                                                border: "none",
                                                backgroundColor: "transparent",
                                                color: 'black'
                                            }}
                                            type='button'
                                            onClick={toggleHandler}>
                                            {isLogin ? 'Creating New Account' :
                                                'Login With Existing Account'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


            {/* <Navbar bg='dark' expand='sm' varient='dark'>
                <Navbar.Brand>Reactbootstarp</Navbar.Brand>
            </Navbar> */}
        </div>
    )
}

export default Login;