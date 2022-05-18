import React, { useEffect } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Components/firebase.config';
import Loading from '../../Components/Loading';
import GoogleSingIn from '../Register/GoogleSingIn';

const Login = () => {
    let navigate = useNavigate();
    let [user, loading, error] = useAuthState(auth);
    const [
        signInWithEmailAndPassword,
        euser,
        eloading,
        eerror,
      ] = useSignInWithEmailAndPassword(auth);
      useEffect(()=>{
        if(user || euser){
            
        navigate('/');
        }
    },[user,euser,navigate]);
    const handleLogin = event =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email ,password);
    }
    
    if(loading ||eloading){
        return <Loading/>
    }
    return (
        <div>
            <div class="hero min-h-screen ">
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' required class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' required class="input input-bordered" />
                            {
                                eerror? eerror: ' '
                            }
                            <label class="label">
                                <div onClick={() => navigate('/forgotPassword')} class="label-text-alt link link-hover">Forgot password?</div>
                            </label>
                        </div>
                        <div class="form-control mt-3">
                            <button type='submit' class="btn ">Login</button>
                        </div>
                        <p className="text-sm text-center text-gray-500">Alrady heve an account?<Link className='text-rose-500' to='/register'> Register</Link></p>
                    <GoogleSingIn/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;