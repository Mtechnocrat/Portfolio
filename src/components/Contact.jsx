import { CONTACT } from "../constants"
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { FaSquareTwitter } from 'react-icons/fa6'
import { SiGmail } from "react-icons/si"
import { motion } from "framer-motion"

export const Contact = () => {
    return (
        <div className="border-b border-neutral-900 pb-20">
            <motion.h2 whileInView={{opacity:1,y:0}} initial={{opacity:0,y:-100}} transition={{duration:0.5}}  className="my-10 text-center text-4xl">Get in Touch</motion.h2>
            <div className="text-center tracking-tighter">
                {/* <p className="my-4">{CONTACT.address}</p>
            <a href="#" className="border-b">{CONTACT.email}</a> */}

                <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
                    <motion.a whileInView={{opacity:1,x:0}} initial={{opacity:0,x:-100}} transition={{duration:1}} href="https://www.linkedin.com/in/ayush-kumar-4b07b122b/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></motion.a>
                    <motion.a whileInView={{opacity:1,x:0}} initial={{opacity:0,x:-100}} transition={{duration:1}}  href="https://github.com/Mtechnocrat" target="_blank" rel="noopener noreferrer"><FaGithub /></motion.a>
                    <motion.a whileInView={{opacity:1,y:0}} initial={{opacity:0,y:100}} transition={{duration:1}} href="https://x.com/MrGenixxx" target="_blank" rel="noopener noreferrer"><FaSquareTwitter /></motion.a>
                    <motion.a whileInView={{opacity:1,x:0}} initial={{opacity:0,x:100}} transition={{duration:1}} href="https://www.instagram.com/aayush_1020/" target="_blank" rel="noopener noreferrer"><FaInstagram /></motion.a>
                    <motion.a whileInView={{opacity:1,x:0}} initial={{opacity:0,x:100}} transition={{duration:1}} href="mailto:mr.genixx@gmail.com" target="_blank" rel="noopener noreferrer"><SiGmail/> </motion.a>      
                </div>
            </div>
        </div>
    )
}
