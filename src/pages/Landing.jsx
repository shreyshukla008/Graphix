import { useState } from "react";
import React from 'react'
import { useNavigate  } from "react-router-dom";
import Footer from "../components/Footer";


const Landing = () => {
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/home");
      };
    const goToPG = () => {
        navigate("/playground");
      };
      

  return (
    <div className="w-lvw min-h-lvh flex-col justify-between lg:pt-20 bg-slate-950 pt-10">
      
      <div className=' flex justify-center items-center' >


      <div className='flex flex-col w-[70%] gap-24 p-4 py-10 bg-[linear-gradient(45deg,_#150d1a,_#1e293b)] rounded-2xl drop-shadow-[0_30px_30px_rgba(87,184,0,0.15)]'>

          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="vt323-regular text-lime-500 font-bold text-8xl select-none ">Graphix</h1>
            <p className="vt323-regular text-lime-500 font-bold text-2xl select-none  text-start">Visualizing Graph Algorithms with Advanced 3D Graphics</p>
          </div>


          <div className='flex flex-col md:flex-row justify-center gap-8 '>
            <div 
            className="relative cursor-pointer w-[95%]  flex justify-center items-start p-4 mt-4"
            onMouseEnter={() => setHovered("demo")}
            onMouseLeave={() => setHovered(null)}
            >
              {
                hovered == "pg" ? 
                (
                  <div className="vt323-regular text-xl text-lime-400 text-justify ">
                    Graphix Playground,where you can create your own graphs and experiment with different graph algorithms!
                  </div>
                ):
                (
                  <div onClick={goToHome} className="vt323-regular w-[90%]  text-2xl px-2 md:px-20 py-8 flex items-center justify-center rounded-md text-white bg-lime-900 hover:bg-lime-800 cursor-pointer transition-all ease-in-out duration-300">
                     <button >Go to Demo Page</button>
                  </div>
                )

              }
            </div>


            <div 
            className="relative cursor-pointer w-[95%]  flex justify-center items-start p-4 mt-4"
            onMouseEnter={() => setHovered("pg")}
            onMouseLeave={() => setHovered(null)}>
                
                {
                hovered == "demo" ? 
                (
                  <div className="vt323-regular text-xl text-lime-400 text-justify ">
                    Graphix Demo, your interactive platform to explore and practice fundamental graph algorithms. Here, you’ll find a pre-declared graph ready for experimentation!
                  </div>
                ):
                (
                  <div onClick={goToPG} className="vt323-regular w-[90%] text-2xl px-2 md:px-20 py-8 flex items-center justify-center rounded-md text-white bg-lime-900 hover:bg-lime-800 cursor-pointer transition-all ease-in-out duration-300">
                      <button>Go to Playground Page</button>
                  </div>
                )

              }
            </div>
          </div>

      </div>

      </div>
      
      <div className="md:pt-24">
        <Footer />
      </div>

    </div>
  )
}

export default Landing;
