// import React, { useEffect, useState } from 'react'
// import {motion}  from 'framer-motion'

// import './Cursor.css';
// const Cursor = () => {
//   const[mousePosition , setMousePosition]=useState({
//     x:0,
//     y:0
//   });
//   console.log(mousePosition);
  
//   const [cursorVariant,setCursorVariant] = useState("default");

//   useEffect(()=>{
//     const mouseMove=e=>{
//       setMousePosition({
//         x:e.clientX,
//         y:e.clientY
//       })
      
//     }
//     window.addEventListener("mousemove",mouseMove);
//     return()=>{
//       window.removeEventListener("mousemove",mouseMove);

//     }

//   },[])
//   const  variants = {
//     default:{
//       x:mousePosition.x-16,
//       y:mousePosition.y-16,
//     },
//     text :{
//       height:150,
//       width:150,
//       x:mousePosition.x-75,
//       y:mousePosition.y-75,
//       mixBlendMode:"different"
//     }
//   }
//   const textEnter=() =>setCursorVariant("text");
//   const textLeave=() =>setCursorVariant("default");


  
//   return (
//     <motion.div className='cursor'
//       variants={variants}
//       animate={cursorVariant}
//     />
//   )
// }
// export default { textEnter, textLeave , Cursor }






//
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import './Cursor.css';

const Cursor = forwardRef((props, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      mixBlendMode: "difference",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  // Expose textEnter and textLeave to the parent component
  useImperativeHandle(ref, () => ({
    textEnter,
    textLeave,
  }));

  return (
    <motion.div
      className="cursor"
      variants={variants}
      animate={cursorVariant}
    />
  );
});

// Exporting Cursor as the default component
export default Cursor;
