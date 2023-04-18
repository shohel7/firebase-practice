import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, sendEmailVerification, updateProfile  } from "firebase/auth";
import app from '../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // console.log(name, email, password);
    
    const [user, setUser] = useState({})
    const [gitUser, setGitUser] = useState({})
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleSubmit = (e)=>{
        // 1. prevent page refresh
        e.preventDefault()
        setSuccess('')
        setError('')
        // 2. collect from data
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value
        console.log(name, email, password);

        // validation
        if(!/(?=.*[A-Z])/.test(password)){
            setError("Please add at least one uppercase")
            return;
        }
       else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError("Please add at least two number")
            return;
        }
       else if(password.length<6){
            setError("Please add at least 6 character in your password")
            return;
        }

        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
         .then((result) => {
       // Signed in 
        const user = result.user;
        console.log(user);
        setError("")
        e.target.reset()
        setSuccess("User Created Successful")
        sendVerificationEmail(result.user)
        updateUserData(result.user, name)
        // ...
      })
      .catch((error) => {
       const errorMessage = error.message;
       setError(errorMessage)
      // ..
      });
    }

    // Email verification
    const sendVerificationEmail = (user) => {
      sendEmailVerification(user)
      .then(result => {
        console.log(result);
        alert("Please verify your email address")
      })
    }

    // User profile
    const updateUserData = (user, name) => {
      updateProfile(user, {
        displayName: name
      })
      .then(() => {
        console.log("user name updated")
      })
      .catch(error => {
        setError(error.message);
      })
    }

    const handleGoogleSignIn = ()=> {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
          const loggedInUser = result.user;
          console.log(loggedInUser);
          setUser(loggedInUser)
        }).catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }

    const handleGithubSignIn = ()=> {
        signInWithPopup(auth, githubProvider)
        .then((result) => {
          const loggedInUser = result.user;
          console.log(loggedInUser);
          setGitUser(loggedInUser)
        }).catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }

    const handleLogout =()=>{
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser("")
            setGitUser("")
          }).catch((error) => {
            console.log(error);
          });
    }
    return (
        // user ? logout : signIn
        <div>
            <h1>{user.email}</h1>
            <h1>{user.displayName}</h1>
            <h1>{gitUser.email}</h1>
            <h1>{gitUser.displayName}</h1>
            <form onSubmit={handleSubmit} className='text-center' action="">
                <input
                onChange={(e)=> setName(e.target.value)}
                className='bg-gray-200 w-1/3 py-2 pl-2 rounded-lg mt-10 my-2'
                 type="text" name='name' id='name' placeholder='Enter your name' required />
                 <br />
                <input
                  onChange={(e)=> setEmail(e.target.value)}
                className='bg-gray-200 w-1/3 py-2 pl-2 rounded-lg my-2'
                 type="email" name='email' id='email' placeholder='Enter your email' required />
                 <br />
                <input
                  onBlur={(e)=> setPassword(e.target.value)}
                className='bg-gray-200 w-1/3 py-2 pl-2 rounded-lg my-2'
                 type="password" name='password' id='password' placeholder='Enter your password' required />
                 <br />
                 <button
                 className='bg-amber-500 py-2 px-5 rounded-lg my-3'
                  type='submit'>Submit</button>
            </form>
            <p className='text-center'><small>Already have an account? Please <Link to="/login" className='text-sky-500'>Login</Link></small></p>
            <p className='text-center text-red-500'>{error}</p>
            <p className='text-center text-green-500'>{success}</p>
            <div className='text-center space-x-5'>
              { user ? 
               <button
                 onClick={handleLogout}
                 className='bg-violet-500 py-2 px-5 rounded-lg my-3' >Logout
                </button> :
               <button
                  onClick={handleGoogleSignIn}
                  className='bg-violet-500 py-2 px-5 rounded-lg my-3' >Google Login
               </button>
               }
                <button
                onClick={handleGithubSignIn}
                 className='bg-violet-500 py-2 px-5 rounded-lg my-3' >Github Login
                 </button>
            </div>
        </div>
    );
};

export default Register;