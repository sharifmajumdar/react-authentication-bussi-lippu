import React from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { useContext } from 'react';
import { BusContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app();
}


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
    const [loggedInUser, setLoggedInUser] = useContext(BusContext);
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const token = credential.accessToken;
                const user = result.user;
                setUser(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.Message;
                const errorEmail = error.email;
                const credential = error.credential;
            });
    }
    const handleFacebookSignIn = () => {
        firebase.auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const credential = result.credential;
                const accessToken = credential.accessToken;
                const user = result.user;
                setUser(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.Message;
                const errorEmail = error.email;
                const credential = error.credential;
            });
    }
    const handleBlur = (e) => {
        /*         if(e.target.name === "name"){
        
                } */
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
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    //updateUserName(user.name);  
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
        }
        const updateUserName = (name) => {
            const user = firebase.auth().updateCurrentUser;
            user.updateProfile({
                displayName: name
            }).then(function () {
                console.log('User name updated');
            }).catch(function(error){
                console.log(error);
            });
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
                                user.isSignIn ? <button onClick={handleSignIn}>Log In</button> :
                                <button onClick={handleSignIn}>Sign In</button>
                            }
                            <br />
                            <button onClick={handleFbSignIn}>Sign in using Facebook</button>
                            {
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
                            <p style={{ color: 'red' }}>{user.error}</p>
                            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>}
                            <button onClick={handleGoogleSignIn}>Sign in using Google</button>
                            <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;