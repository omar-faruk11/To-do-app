import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from './firebase.config';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );
    const handleResetPassword = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success('Reset Email send', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/login')
              }, 7000);
            
        }
    };
    return (
        <>
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto">
                    <form onSubmit={handleResetPassword} className="p-8 mt-6 mb-0 space-y-4 rounded-2xl shadow-2xl">
                        <p className="text-3xl font-medium">Forgot Password</p>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium">Email</label>

                            <div className="relative mt-1">
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    className="input input-bordered"
                                    placeholder="Enter email"
                                    required
                                />

                            </div>
                        </div>
                        <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-rose-500 rounded-lg">
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;