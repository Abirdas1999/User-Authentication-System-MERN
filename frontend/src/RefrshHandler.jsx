import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function RefrshHandler({ setIsAuthenticate }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticate(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticate])

    return (
        null
    )
}

export default RefrshHandler