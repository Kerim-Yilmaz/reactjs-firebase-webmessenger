import React,{useRef,useState,useContext} from 'react'
import {Card,Form,Button,Alert,Container} from 'react-bootstrap'
import {AuthContext} from '../context/AuthContext'
import {Link} from 'react-router-dom'
const Login = () => {

    const emailRef=useRef()
    const passwordRef=useRef()
  
    const {value} = useContext(AuthContext)
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
   async function handleSubmit(e) {
        e.preventDefault()
       try {
           
           setError('')
           setLoading('true')
           await value.login(emailRef.current.value,passwordRef.current.value)

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
                    <h2 className='text-center mb-4'>Login</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {loading && <Alert variant='success'>Welcome</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group id='email'>

                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />

                        </Form.Group>

                        <Form.Group id='password'>

                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />

                    
                        </Form.Group>
                        <Button   className='w-100' type='Submit'>Login</Button>
                    </Form>
                   
                    <div>Need an account? <Link to='/signup' className='danger'>Sign Up</Link></div>
                </Card.Body>
             

            </Card>
            </div>
            </Container>
        </>
    )
}

export default Login
