import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import { useState } from 'react';
import { useContext } from 'react';
import { BusContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramewrok, signInWithEmailAndPassword } from './loginManagers';


const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: 'false',
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });
    initializeLoginFramewrok();
    const [loggedInUser, setLoggedInUser] = useContext(BusContext);
    const navigate = useNavigate();
    const location = useLocation();
    //const { from } = location.state;
    const from  = location.state?.from?.pathname || '/';

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const fbSignIn = () => {
        handleFacebookSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const signOut = () => {
        handleSignOut()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            navigate("/", { replace: true });
        })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        /* if(location.state?.from){
            navigate(location.state.from);
        }  */
        redirect && navigate(from, {replace: true});
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            });
        }
        if(!newUser && user.email && user.password){
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }
        e.preventDefault();
        }

    const buttonStyle = {
        width: '250px',
        borderRadius: '25px'
    }
    return (
        <div className='container'>
            <div className='card shadow'>
                <div className='card body'>
                    <div className='row'>
                        <div className='col-md-12 d-flex flex-column align-items-center mt-5'>
                            <h1>Login Credential</h1>
                            <hr />
{/*                             {
                                !user.isSignIn ? <button onClick={signOut}>Sign Out</button> :
                                <button onClick={googleSignIn}>Sign In using Google</button>
                            }
                            <br />
                            <button onClick={fbSignIn}>Sign In using Facebook</button> */}
{/*                             {
                                user.isSignIn && <div>
                                    <p>Welcome, {user.name}!</p>
                                    <p>Your Email: {user.email}</p>
                                    <img src={user.photo} alt="" />
                                    <p></p>
                                </div>
                            } */}
                            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                            <label htmlFor="newUser">New User Sign up</label>
                            <form onSubmit={handleSubmit}>
                                {newUser &&
                                    <div className='form-group'>
                                        <label className='mb-1'>Full Name</label>
                                        <input type="text" name='name' className='form-control' onBlur={handleBlur} placeholder='Enter full name' />
                                    </div>
                                }
                                <div className='form-group'>
                                    <label className='mb-1'>Email Address</label>
                                    <input type="text" name='email' className='form-control' onBlur={handleBlur} placeholder='Enter your email' required />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-1'>Password</label>
                                    <input type="password" name='password' className='form-control' onBlur={handleBlur} placeholder='Enter your password' required />
                                </div>
                                <div className='form-group py-3'>
                                    {/* <Link to="/login" onClick={handleSignIn} className='btn btn-primary shadow w-100'>Submit</Link> */}
                                    <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                                </div>
                            </form>
                            Or
                            <button style={buttonStyle} onClick={googleSignIn}>
                                <FontAwesomeIcon icon={faFacebook} />Sign In using Google</button> <br />
                            <button style={buttonStyle} onClick={fbSignIn}>
                                <FontAwesomeIcon icon={faGoogle} />Sign In using Facebook</button>

                            <p style={{ color: 'red' }}>{user.error}</p>
                            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>}
{/*                             <button onClick={handleGoogleSignIn}>Sign in using Google</button>
                            <button onClick={handleFacebookSignIn}>Sign in using Facebook</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;