// import libaries
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { VscSignIn } from 'react-icons/vsc';

// import components
import Container from 'react-bootstrap/Container';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import FormError from '../userControllers/FormError';

interface Props {
    errorMessage: string | null, 
    email: string, 
    password: string,
    setEmail(e: string): void 
    setPassword(e: string): void
    handleSubmit(e: any): void
}

function LoginView(props: Props) {

    const { handleSubmit, errorMessage, email, setEmail, password, setPassword} = props;

    return(
        <Container>
            <form onSubmit={e => handleSubmit(e)}>
                <FormGroup>
                <div className='form-box'>
                        <Link 
                          className='form-box-content is-active'
                          to='/react-calendar/users/login'>
                            <div className='fw-bold'>
                               <AiOutlineUser className='form-icon' />
                               <br /> 
                               Logga in
                             </div>
                        </Link>
                        <div className='form-box-content transparent'></div>
                        <Link 
                          className='form-box-content'
                          to='/react-calendar/users/signup'>
                            <div className='fw-bold'>
                               <VscSignIn className='form-icon' />
                               <br /> 
                               Skapa konto
                             </div>
                        </Link>
                    </div>
                    <FormControl
                        required
                        type='text'
                        id='email'
                        placeholder='E-post'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <FormControl
                        required
                        type='text'
                        id='password'
                        placeholder='Lösenord'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage !== null ? (
                                <FormError errorMessage={errorMessage}/> 
                            ) : null}
                    <Button type='submit' className='fw-bold'>Logga in</Button>
                    <p className='form-or'> 
                        <span>eller</span>
                    </p>
                    <Button className='fw-bold facebook'>
                        <FaFacebookF className='btn-icon' /> 
                        {' '}
                        Logga in med Facebook
                    </Button>
                    <Button className='fw-bold google'>
                        <FcGoogle className='btn-cion' /> 
                        {' '}
                        Logga in med Google
                    </Button>
                </FormGroup>
                <p>Har du inget konto än?<Link to='/react-calendar/users/signup' className='text-color'> Skapa konto</Link></p>
            </form>
        </Container>
    )
}

export default LoginView;