import React from 'react'
import { NavLink } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='vt323-regular w-full flex flex-wrap justify-between items-end bg-linear-[to_top,_#1e293b,_#150d1a] mt-8 py-4 px-8 '>

        <div className='w-[60%] text-start flex flex-col items-start justify-start'>
            <NavLink to='/' 
            className={' text-lime-500 font-bold text-6xl text-start'}> Graphix </NavLink>

            <p className='text-lime-500 text-xl text-start'>Visualizing Graph Algorithms with Advanced 3D Graphics</p>
        </div>

        <div className='flex justify-between items-center gap-8 text-lg text-slate-400'>
             
               
                <a
                 href="https://github.com/shreyshukla008/Graphix" target="_blank"
                 className='cursor-pointer flex flex-col gap-2 justify-between items-center hover:text-lime-500'>

                    <div>
                        <p>View GitHub</p>
                        <p> repository </p>
                    </div>

                    <img className='w-[35px]  rounded-full hover:bg-sky-800' 
                    src="social.png" alt="Repo" />
                </a>

                <div className='w-1 bg-slate-800 h-14'></div>

               <div className='flex flex-col gap-4 justify-center items-center  cursor-pointer hover:text-lime-500'>
                    <div>
                        <p> Developed By </p>
                        <a className='hover:text-sky-400' target='_blank' href="https://my-portfolio-lac-beta-17.vercel.app/">@shreyshukla</a>
                    </div>
                    <div className='flex gap-6 justify-between'>
                        <a href="https://www.linkedin.com/in/shreyshukla008/" target='_blank'>
                            <img className='w-[35px] rounded-md hover:bg-sky-800' 
                            src="linkedin.png" alt="LinkedIn" />
                        </a>

                        <a href="https://github.com/shreyshukla008" target='_blank'>
                            <img className='w-[35px] rounded-full hover:bg-sky-800' 
                            src="social.png" alt="Github" />
                        </a>

                    </div>
               </div>
            
        </div>
      
    </div>
  )
}

export default Footer
