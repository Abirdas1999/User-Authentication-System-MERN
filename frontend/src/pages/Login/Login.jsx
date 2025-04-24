import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../../Utils/utils"
import { motion } from "framer-motion";
import FloatingShape from "../../Components/Floating/FloatingShape"
import { Loader, LockIcon, Mail } from "lucide-react"
import Input from "../../Components/Form/Input";
import { useAuthStore } from "../../Store/authStore";



function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const { login, isLoading, error } = useAuthStore();
    const Navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);

    }


    const handleLogin = async (e) => {
		e.preventDefault();
		await login(loginInfo.email, loginInfo.password);
        Navigate("/home");
	};


    // const handleLogin = async (e) => {
    //     e.preventDefault()

    //     const { email, password } = loginInfo;

    //     if (!email || !password) {
    //         return handleError('All Fields are Require!')
    //     }
    //     try {
    //         const url = "http://localhost:8080/auth/login";
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(loginInfo)
    //         });
    //         const result = await response.json();
    //         const { success, message, jwtToken, name, error } = result;
    //         if (success) {
    //             handleSuccess(message);
    //             localStorage.setItem('token', jwtToken);
    //             localStorage.setItem('loggedInUser', name);
    //             setTimeout(() => {
    //                 Navigate('/home')
    //             }, 2000)
    //         } else if (error) {
    //             const details = error?.details[0].message;
    //             handleError(details);
    //         } else if (!success) {
    //             handleError(message);
    //         }


    //     } catch (err) {
    //         handleError(err)

    //     }
    // }
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
                <div className="p-8">
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                        Welcome Back
                    </h2>
                    <form onSubmit={handleLogin}>

                        <Input
                            icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={loginInfo.email}
                            name='email'
                            onChange={handleChange}
                            autoFocus
                        />
                        <Input
                            icon={LockIcon}
                            type='password'
                            placeholder='Enter Password'
                            value={loginInfo.password}
                            name='password'
                            onChange={handleChange}
                        />
                        <div className='flex items-center mb-6'>
                            <Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
                                Forgot password?
                            </Link>
                        </div>
                        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            type='submit'
                            disabled={isLoading}


                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}

                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Don't have an account?{" "}
                        <Link to='/signup' className='text-green-400 hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>

            </motion.div>
            <ToastContainer />
        </div>

    )
}

export default Login