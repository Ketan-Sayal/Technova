import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { useAuth } from '../context/AuthContext'; // Add this import

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const { currentUser, logout } = useAuth(); // Get Firebase auth context

  const handleAuthAction = async () => {
    if (currentUser) {
      // User is logged in - log them out
      try {
        await logout();
      } catch (error) {
        console.error("Failed to log out", error);
      }
    } else if (address) {
      // User has wallet connected but not logged in - create campaign
      navigate('create-campaign');
    } else {
      // User is not logged in and has no wallet - connect wallet
      connect();
    }
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
        
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {/* First button for wallet/campaign/logout */}
        <CustomButton 
          btnType="button"
          title={currentUser ? 'Logout' : (address ? 'Create a campaign' : 'Connect Wallet')}
          styles={currentUser ? 'bg-[#f44336]' : (address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]')}
          handleClick={handleAuthAction}
        />

        {/* Second button for login/signup/profile */}
        {currentUser ? (
          <Link to="/profile">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
              <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>
          </Link>
        ) : (
          <CustomButton 
            btnType="button"
            title="Login"
            styles="bg-[#2c2f32]"
            handleClick={() => navigate('/login')}
          />
        )}
      </div>

      {/* Small screen */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img 
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img 
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mx-4">
            {/* Wallet/Campaign/Logout button */}
            <CustomButton 
              btnType="button"
              title={currentUser ? 'Logout' : (address ? 'Create a campaign' : 'Connect Wallet')}
              styles={currentUser ? 'bg-[#f44336]' : (address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]')}
              handleClick={handleAuthAction}
            />
            
            {/* Login/Signup button (only show if not logged in) */}
            {!currentUser && (
              <CustomButton 
                btnType="button"
                title="Login / Signup"
                styles="bg-[#2c2f32]"
                handleClick={() => {
                  navigate('/login');
                  setToggleDrawer(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar