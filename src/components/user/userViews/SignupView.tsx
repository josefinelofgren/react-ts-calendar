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
import FormError from '../../error/FormError';

interface Props {
    errorMessage: string | null, 
    email: string, 
    passOne: string,
    passTwo: string,
    setEmail(e: string): void 
    setPassOne(e: string): void
    setPassTwo(e: string): void
    handleSubmit(e: any): void
}


function SignupView(props: Props){

    const { handleSubmit, errorMessage, email, setEmail, passOne, setPassOne, passTwo, setPassTwo } = props;

    return(
        <Container>
            <form onSubmit={e => handleSubmit(e)}>
                <FormGroup>
                <div className='form-box'>
                        <Link 
                          className='form-box-content'
                          to='/react-calendar/users/login'>
                            <div className='fw-bold'>
                               <AiOutlineUser className='form-icon' />
                               <br /> 
                               Logga in
                             </div>
                        </Link>
                        <div className='form-box-content transparent'></div>
                        <Link 
                          className='form-box-content is-active'
                          to='/react-calendar/users/signup'>
                            <div className='fw-bold'>
                               <VscSignIn className='form-icon' />
                               <br /> 
                               Skapa konto
                             </div>
                        </Link>
                    </div>
                    <Button className='fw-bold facebook'>
                        <FaFacebookF className='btn-icon' /> 
                        {' '}
                        Fortsätt med Facebook
                    </Button>
                    <Button className='fw-bold google'>
                        <FcGoogle className='btn-cion' /> 
                        {' '}
                        Fortsätt med Google
                    </Button>
                    <p className='form-or'> 
                        <span>eller</span>
                    </p>
                    <FormControl
                        required
                        type='text'
                        id='email'
                        placeholder='E-post'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <FormControl
                        required
                        type='text'
                        id='passOne'
                        placeholder='Lösenord'
                        name='passOne'
                        value={passOne}
                        onChange={e => setPassOne(e.target.value)}
                        />
                    <FormControl
                        required
                        type='text'
                        id='passTwo'
                        placeholder='Upprepa lösenord'
                        name='passTwo'
                        value={passTwo}
                        onChange={e => setPassTwo(e.target.value)}
                        />
                        {errorMessage !== null ? (
                                <FormError errorMessage={errorMessage}/> 
                            ) : null}
                    <Button type='submit' className='fw-bold'>Registrera</Button>
                </FormGroup>
                <p>Har du redan ett konto?<Link to='/react-calendar/users/login' className='text-color'> Logga in</Link></p>
            </form>
        </Container>
    )
}

export default SignupView;