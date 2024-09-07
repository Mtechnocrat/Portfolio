import React from 'react'
import logo from "../assets/kevinRushLogo.png"
import logo1 from "../assets/aklogo.png"
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaSquareTwitter } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
const Navbar = () => {
  return <nav className='mb-20 flex items-center justify-between py-6'>
    <div className="flex flex-shrink-0 items-center object-contains">
      {/* <h1 className='text-4xl p-0 font-medium text-white'>Ak</h1> */}
      <img className='mx-2' src={logo1} alt="" />
    </div>
    <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
      <a href="https://www.linkedin.com/in/ayush-kumar-4b07b122b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      <a href="https://github.com/Mtechnocrat" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
      <a href="https://x.com/MrGenixxx" target="_blank" rel="noopener noreferrer"><FaSquareTwitter /></a>
      <a href="https://www.instagram.com/aayush_1020/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="mailto:mr.genixx@gmail.com" target="_blank" rel="noopener noreferrer"><SiGmail /> </a>
    </div>
  </nav>
}

export default Navbar