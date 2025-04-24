import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Signup from "./pages/Signup/Signup"
import Verification from "./pages/Otp/Verification"
// import RefrshHandler from "./RefrshHandler"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./Store/authStore"
import LoadingSpinner from "./Components/Floating/LoadingSpinner"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import ResetPassword from "./pages/ResetPassword/ResetPassword"



// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verification' replace />;
	}

	return children;
};



// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/home' replace />;
	}

	return children;
};


function App() {
  const { isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  // console.log("isAuthenticated",isAuthenticated);
  // console.log("user",user);
  

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
      {/* <RefrshHandler setIsAuthenticate={setIsAuthenticate} /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<RedirectAuthenticatedUser><Login/></RedirectAuthenticatedUser>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><Signup/></RedirectAuthenticatedUser>}/>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/verification' element={<Verification />} />
        <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPassword/></RedirectAuthenticatedUser>} />
        <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPassword/></RedirectAuthenticatedUser>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
