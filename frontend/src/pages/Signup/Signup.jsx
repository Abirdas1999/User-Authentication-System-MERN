import { useState } from "react"
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"
import { Loader, LockIcon, Mail, User } from "lucide-react";
import { ToastContainer } from "react-toastify"
// import { handleError, handleSuccess } from "../../Utils/utils";
// import SignupCSS from './Signup.module.css'
import FloatingShape from "../../Components/Floating/FloatingShape";
import Input from "../../Components/Form/Input";
import PasswordStrengthMeter from "../../Components/Form/PasswordStrengthMeter";
import { useAuthStore } from "../../Store/authStore";

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const Navigate = useNavigate();
    const { signup, error, isLoading } = useAuthStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(signupInfo.email, signupInfo.password, signupInfo.name);
            Navigate("/verification");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br
        from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
            <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
            <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
            <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                        Create Account
                    </h2>
                    <form onSubmit={handleSignup}>
                        <Input
                            icon={User}
                            type='text'
                            placeholder='Full Name'
                            value={signupInfo.name}
                            name='name'
                            onChange={handleChange}
                            autoFocus
                        />
                        <Input
                            icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={signupInfo.email}
                            name='email'
                            onChange={handleChange}
                            autoFocus
                        />
                        <Input
                            icon={LockIcon}
                            type='password'
                            placeholder='Enter Password'
                            value={signupInfo.password}
                            name='password'
                            onChange={handleChange}
                        />
                        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                        <PasswordStrengthMeter password={signupInfo.password} />
                        <motion.button
                            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Already have an account?{" "}
                        <Link to={"/login"} className='text-green-400 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>

            </motion.div>
            <ToastContainer />
        </div>

    )
}

export default Signup