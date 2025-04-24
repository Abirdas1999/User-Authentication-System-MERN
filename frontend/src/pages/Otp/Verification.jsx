import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
// import { handleError, handleSuccess } from "../../Utils/utils";
import { motion } from "framer-motion";
import FloatingShape from "../../Components/Floating/FloatingShape";
import { useAuthStore } from "../../Store/authStore";
import toast from "react-hot-toast";


function Verification() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const Navigate = useNavigate();
    const { error, isLoading, verifyEmail } = useAuthStore();

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);


    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];

        // Handle pasted content
        if (value.length > 1) {
            const pastedOtp = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newOtp[i] = pastedOtp[i] || "";
            }
            setOtp(newOtp);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newOtp.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };
    // Auto submit when all fields are filled
    useEffect(() => {
        if (otp.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = otp.join("");
        try {
            await verifyEmail(verificationCode);
            Navigate("/home");
            toast.success("Email verified successfully");
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
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
            >
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>
                <form onSubmit={handleSubmit} className='space-y-6'>

                    <div className='flex justify-between'>
                        {otp.map((digit, index) => {
                            return (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength='6'
                                    ref={(input) => (inputRefs.current[index] = input)}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e)}
                                    // onClick={() => handleClick(index)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
                                />
                            );
                        })}
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type='submit'
                        disabled={isLoading || otp.some((value) => !value)}
                        className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </motion.button>
                </form>

            </motion.div>
            <ToastContainer />
        </div>

    )
}


export default Verification