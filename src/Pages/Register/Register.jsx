import React, { useEffect } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../Components/firebase.config';
import Loading from '../../Components/Loading';
import GoogleSingIn from './GoogleSingIn';

const Register = () => {
    let navigate = useNavigate();
    let [user, loading, error] = useAuthState(auth);

    const [
        createUserWithEmailAndPassword,
        euser,
        eloading,
        eerror,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updeterror] = useUpdateProfile(auth);
    const handleRegister = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const displayName = event.target.name.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password);
            updateProfile({ displayName });
            toast.success('Send email verification');

        }
    };
    useEffect(()=>{
        if(user || euser){
            navigate('/')
        }
    },[user, euser,navigate])

    if (loading || eloading) {
        return <Loading />
    }
    
    return (
        <div>
            <div class="hero min-h-screen ">
                <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" id='name' name='name' required class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" id='email' name='email' required class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password"
                                id="password"
                                name='password'
                                placeholder="Confirm  password"
                                required
                                class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Confirm Password</span>
                            </label>
                            <input type="password"
                                id="confirm-password"
                                name='confirmPassword'
                                placeholder="Confirm  password"
                                required
                                class="input input-bordered" />
                        </div>
                        {
                            eerror? error : ' '
                        }
                        <div class="form-control mt-3">
                            <button type='submit' class="btn ">Login</button>
                        </div>
                        <p className="text-sm text-center text-gray-500"> Alrady heve an account?<Link className='text-rose-500' to='/login'> LogIn</Link></p>
                        <GoogleSingIn />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;