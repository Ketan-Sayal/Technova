import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full footer px-2 py-14 text-white bg-tr[#1dc071]">
            <div className="w-full space-x-12 flex flex-wrap justify-center">
            <FontAwesomeIcon icon={faFacebook} size="2xl" className="hover:text-[#1dc071] cursor-pointer duration-200 transition-all" />
            <FontAwesomeIcon icon={faInstagram} size="2xl" className="hover:text-[#1dc071] cursor-pointer duration-200 transition-all"/>
            <FontAwesomeIcon icon={faYoutube} size="2xl" className="hover:text-[#1dc071] cursor-pointer duration-200 transition-all"/>
            <FontAwesomeIcon icon={faTwitter} size="2xl" className="hover:text-[#1dc071] cursor-pointer duration-200 transition-all"/>
            </div>
            <div className="flex w-full space-x-8 md:space-x-16 justify-center py-12">
                <Link className="hover:text-[#1dc071] duration-200 transition-all font-bold">
                <p className="text-sm">Terms & Conditions</p>
                </Link>
                <Link className="hover:text-[#1dc071] duration-200 transition-all font-bold">
                <p className="text-sm">Privacy Policy</p>
                </Link>
                <Link className="hover:text-[#1dc071] duration-200 transition-all font-bold">
                <p className="text-sm">About Us</p>
                </Link>
                <Link className="hover:text-[#1dc071] duration-200 transition-all font-bold">
                <p className="text-sm">Contact Us</p>
                </Link>
            </div>
            <p className="text-center font-bold cursor-default">HopeFund Copyright © 2025 | All rights reserved</p>
        </div>
    );
}

export default Footer;