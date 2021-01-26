import React, { useState, useRef, useContext } from 'react'
import { Card,Container, Form, Button, Alert } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import { signInWithGoogle } from '../firebase';
import {Link} from 'react-router-dom'

const Signup = () => {

    const nameRef = useRef()
    const surnameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { value } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match ')
        }
        try {
            setError('')
            setLoading('true')
            await value.signup( emailRef.current.value, 
                                passwordRef.current.value,
                                nameRef.current.value,
                                surnameRef.current.value)

        } catch {
            setError('Failed to create an account ')
            console.log(passwordRef.current.value)
        }
        setLoading('false')
    }

    return (

        <>
        <Container className='align-items-center d-flex justify-content-center' style={{minHeight : '100vh'}}>
            <div className='w-100' style={{maxWidth:'400px'}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                  {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='name'>

                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' ref={nameRef} required />

                        </Form.Group>
                        <Form.Group id='surname'>

                            <Form.Label>Surname</Form.Label>
                            <Form.Control type='text' ref={surnameRef} required />

                        </Form.Group>
                        <Form.Group id='email'>

                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />

                        </Form.Group>

                        <Form.Group id='password'>

                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />

                        </Form.Group>
                        <Form.Group id='password-confirm'>

                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required />

                        </Form.Group>
                        <Button disable={loading} className='w-100' type='Submit'>Sing Up</Button>
                    </Form>
                    <div className='text-center h-500px'> OR</div>
                    <div className='d-flex justify-content-center'>
                        <Button variant='danger' onClick={signInWithGoogle}><i className='fab fa-google'></i></Button>
                    </div>
                    <div>Already have an account ? <Link to='/login' className='variant'>Login</Link> </div>
                </Card.Body>


            </Card>
            </div>
            </Container>


        </>
    )
}

export default Signup
