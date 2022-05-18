import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../Components/firebase.config';

const GoogleSingIn = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <div>
              <div class="divider">OR</div>
              <div  onClick={()=> signInWithGoogle()} className=" btn  w-full px-5 btn-outline text-lg border rounded-lg flex justify-center items-center cursor-pointer">
                <div className='mx-2'>Sign in with Google</div>
            </div>
        </div>
    );
};

export default GoogleSingIn;