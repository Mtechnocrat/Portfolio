import React from 'react'
import logo from "../assets/ak.png"
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaSquareTwitter } from 'react-icons/fa6'
const Navbar = () => {
  return <nav className='mb-20 flex items-center justify-between py-6'>
    <div className="flex flex-shrink-0 items-center object-contains">
        {/* <h1 className='text-4xl p-0 font-medium text-white'>Ak</h1> */}
        <img className='mx-2 w-20' src={logo} alt="" />
    </div>
    <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
        <FaLinkedin/>
        <FaGithub/>
        <FaSquareTwitter/>
        <FaInstagram/>
    </div>
  </nav>
}

export default Navbar