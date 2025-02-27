import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, CreateCampaign, Profile, CampaignDetails, Login, Signup } from './pages';
import { Sidebar, Navbar } from './components';
import { useStateContext } from './context';
import Cookies from 'js-cookie'; // Import js-cookie
import { auth } from './appwrite/auth'; // Import authentication module

const App = () => {
    const { setAuthState } = useStateContext();

    useEffect(() => {
        const checkSession = async () => {
            try {
                // Check for a stored session in cookies
                const sessionCookie = Cookies.get('session');
                const session2 = await auth.getSession();
                if (sessionCookie && session2) {
                    const session = JSON.parse(sessionCookie);
                    setAuthState({ isLoggedIn: true, user: session });
                } else {
                    // If no session in cookies, check Appwrite session
                    const session = await auth.getSession();
                    if (session) {
                        setAuthState({ isLoggedIn: true, user: session });
                        Cookies.set('session', JSON.stringify(session), { expires: 7, secure: true });
                    } else {
                        setAuthState({ isLoggedIn: false, user: null });
                    }
                }
            } catch (error) {
                console.error("Error checking session:", error);
                setAuthState({ isLoggedIn: false, user: null });
            }
        };

        checkSession();
    }, [setAuthState]);

    return (
        <div className='relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
            <div className='sm:flex hidden mr-10 relative'>
                <Sidebar />
            </div>
            <div className='flex-1 max-sm:w-full max-w-[1220px] mx-auto sm:pr-5'>
                <Navbar />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/create-campaign' element={<CreateCampaign />} />
                    <Route path='/campaign-details/:id' element={<CampaignDetails />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
