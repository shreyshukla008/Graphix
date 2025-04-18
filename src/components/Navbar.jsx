import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex md:flex-row flex-col justify-between bg-[linear-gradient(45deg,_#150d1a,_#1e293b)]  drop-shadow-[0_40px_40px_rgba(21,13,26,0.8)] mb-4 py-4 px-2 rounded-b-xl'>

        <div className='md:w-[60%] text-start'>
            <NavLink to='/' 
            className={'vt323-regular text-lime-500 font-bold text-8xl text-start'}> Graphix </NavLink>
        </div>

        <div className='flex justify-between items-center md:w-[40%] w-[95%]'>
             
                <NavLink to='/home' 
                className={({ isActive }) => 
                    `vt323-regular text-2xl px-3 py-2 rounded-md text-white w-[45%] border-2 border-slate-800  h-12 ${
                      isActive ? "bg-lime-900 " : "hover:bg-lime-800 bg-slate-700 "
                    }`
                  }> Home </NavLink>
            
                <NavLink to='/playground' 
                className={({ isActive }) => 
                    `vt323-regular text-2xl px-3 py-2 rounded-md text-white w-[45%] border-2 border-slate-800  h-12 ${
                      isActive ? "bg-lime-900" : "hover:bg-lime-800 bg-slate-700 "
                    }` 
                  }> Playground </NavLink>
            
        </div>
      
    </div>
  )
}

export default Navbar
