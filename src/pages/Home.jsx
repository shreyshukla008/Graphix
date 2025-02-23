import React, { useEffect, useState } from 'react'
import MainGraphHome from '../components/MainGraphHome'
import GraphColor from '../components/GraphColor'
import Dijkstra from '../components/Dijkstra'
import BFS from '../components/BFS'
import DFS from '../components/DFS'
import MinSpanningTree from '../components/MinSpanningTree'
import mainGraphData from '../utils/graphData'
import MinSpanningTreeVisualizer from '../components/MinSpanningTree'
import Navbar from '../components/Navbar'
import HomeHero from '../components/HomeHero'
import Footer from '../components/Footer'


const Home = () => {


  return (
    <div className='bg-slate-950 text-white'>
      <Navbar></Navbar>
      <p className='text-4xl text-lime-500 silkscreen-bold my-8 border-2 border-dashed border-lime-500 p-4 rounded-lg'>Graphix-Demo</p>

      <div className='flex flex-col gap-16 max-w-[1280px] mx-auto px-2'>

          <HomeHero />
            <hr className='text-lime-500 border-dotted'/>
          <MainGraphHome id="demo-main" mainGraphData={mainGraphData} />
            <hr className='text-lime-500 border-dotted'/>
          <Dijkstra id="demo-dijkstra" mainGraphData={mainGraphData} />
            <hr className='text-lime-500 border-dotted'/>
          <DFS id="demo-dfs" mainGraphData={mainGraphData} />
            <hr className='text-lime-500 border-dotted'/> 
          <BFS id="demo-bfs" mainGraphData={mainGraphData} />
            <hr className='text-lime-500 border-dotted'/>
          <GraphColor id="demo-color" mainGraphData={mainGraphData} />
            <hr className='text-lime-500 border-dotted'/>
          <MinSpanningTree id="demo-mst" mainGraphData={mainGraphData}/>

        

      </div>

      <Footer></Footer>

        


    </div>
  )
}

export default Home
