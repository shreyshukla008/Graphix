import React, {useEffect} from 'react'
import Graph3d from '../components/Graph3d'
import GraphColor from '../components/GraphColor'
import Dijkstra from '../components/Dijkstra'
import BFS from '../components/BFS'
import DFS from '../components/DFS'
import MinSpanningTree from '../components/MinSpanningTree'
import Navbar from '../components/Navbar'
import { useGraph } from '../context/GraphContext';
import PlaygroundHero from '../components/PlaygroundHero'
import Footer from '../components/Footer'


const Playground = () => {

  const { graphData } = useGraph();
  
  return (
    <div className='bg-slate-950 text-white'>
      <Navbar></Navbar>
      <p className='text-4xl text-lime-500 silkscreen-bold my-8 border-2 border-dashed border-lime-500 p-4 rounded-lg'>Graphix-Playground</p>

      <div className='flex flex-col gap-16 max-w-[1280px] mx-auto px-2'>
          <PlaygroundHero />
            <hr className='text-lime-500 border-dotted'/>
          <Graph3d />
            <hr className='text-lime-500 border-dotted'/>
          <Dijkstra mainGraphData={graphData} />
            <hr className='text-lime-500 border-dotted'/>
          <DFS mainGraphData={graphData} />
            <hr className='text-lime-500 border-dotted'/> 
          <BFS mainGraphData={graphData} />
            <hr className='text-lime-500 border-dotted'/>
          <GraphColor mainGraphData={graphData} />
            <hr className='text-lime-500 border-dotted'/>
          <MinSpanningTree mainGraphData={graphData}/>

      </div>

        
      <Footer></Footer>

    </div>
  )
}

export default Playground
