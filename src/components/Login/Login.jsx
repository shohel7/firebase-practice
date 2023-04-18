import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef()
 
    const auth = getAuth(app);

    const handleLogin = (e)=>{
        // 1. prevent page refresh
        e.preventDefault()
        setSuccess('')
        setError('')
        // 2. collect from data
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value
        console.log(name, email, password);

        // 3. Sign in user in firebase
        signInWithEmailAndPassword(auth, email, password)
         .then((result) => {
        // Signed in 
       const user = result.user;
       console.log(user);
       setSuccess("User LoggedIn Successfully")
       setError("")
        // ...
       })
      .catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage)
      });
    }

    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        if(!email){
            alert("please provide your email address to reset password")
            return
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("please check your email")
        })
        .catch((error)=>{
            console.log(error.message);
            setError(error.message);
        })
    }

    return (
        // user ? logout : signIn
        <div>
            <form onSubmit={handleLogin} className='text-center' action="">
                <input
                ref={emailRef}
                className='bg-gray-200 w-1/3 py-2 pl-2 rounded-lg my-2'
                 type="email" name='email' id='email' placeholder='Enter your email' required />
                 <br />
                <input
                className='bg-gray-200 w-1/3 py-2 pl-2 rounded-lg my-2'
                 type="password" name='password' id='password' placeholder='Enter your password' required />
                 <br />
                 <button
                 className='bg-amber-500 py-2 px-5 rounded-lg my-3'
                  type='submit'>Submit</button>
            </form>
            <p
            onClick={handleResetPassword}
             className='text-center'><small>Forget password? Please <Link to="" className='text-sky-500'>Reset Password</Link></small></p>
            <p className='text-center'><small>New to this website? Please <Link to="/register" className='text-sky-500'>Register</Link></small></p>
            <p className='text-center text-red-500'>{error}</p>
            <p className='text-center text-green-500'>{success}</p>
        </div>
    );
};

export default Login;