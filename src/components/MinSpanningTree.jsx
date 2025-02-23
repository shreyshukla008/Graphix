import React, { useEffect, useState } from 'react';
import useMinSpanningTree from '../hooks/useMinSpanningTree';
import Log from './Log';
import Instructions from './Instructions';
import { getWeightedAdjList2 } from '../utils/graphUtils';

const MinSpanningTreeVisualizer = ({mainGraphData}) => {

  const [originalGraph, setOriginalGraph] = useState({nodes: [], edges: []});

  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {

    const temp = getWeightedAdjList2(mainGraphData);
    setOriginalGraph(temp);
    const handleResize = () => {
      const parentElement = document.getElementById('spanning-graph-container');
      if (parentElement) {
        setContainerDimensions({
          width: parentElement.offsetWidth,
          height: parentElement.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mainGraphData]);

  const {
    startAnimation,
    isAnimationStarted,
    togglePause,
    isPaused,
    resetState,
    logs,
  } = useMinSpanningTree(originalGraph,containerDimensions);

  return (
    <div id='mst' className='flex flex-col gap-14'>

      <div className='flex flex-wrap justify-start gap-4'>
          <h2 className='font-charted-regular text-6xl text-lime-500'>M I N I M U M </h2>
          <h2 className='font-charted-regular text-6xl text-lime-500'>S P A N N I N G </h2>
          <h2 className='font-charted-regular text-6xl text-lime-500'>T R E E</h2>
      </div>

          <div className='vt323-regular text-slate-300 text-lg flex flex-col gap-4 items-start' text-gray-300>
            <p className=' text-lg text-justify'>
            A spanning tree is defined as a tree-like subgraph of a connected, undirected graph that includes all the vertices of the graph. Or, to say in Layman’s words, it is a subset of the edges of the graph that forms a tree (acyclic) where every node of the graph is a part of the tree.
            </p>
            <div className='flex flex-col items-start'>
              <h3 className='text-xl'>-- Time Complexity --</h3>
              <p className='text-lime-400'>Best Case: <span>O(V log(E))</span></p>
              <p className='text-yellow-400'>Average Case: <span>O(V + log(E))</span></p>
              <p className='text-red-400'>Worst Case: <span>O(V + log(E))</span></p>
              <p>[where V is the number of vertices and E is the number of edges]</p>
            </div>
            <p className='text-xl text-slate-300'>
              Reference: <span> <a target='_blank' href="https://www.geeksforgeeks.org/what-is-minimum-spanning-tree-mst/" className='text-lime-400 text-lg hover:text-sky-300'> <u>GFG</u> </a> </span>
            </p>
            <Instructions></Instructions>
          </div>
      

  
      <div className=''>
        <Log logs={logs} isPaused={isPaused} isAnimationStarted={isAnimationStarted} togglePause={togglePause} resetState={resetState} startAnimation={startAnimation} />
      </div>


      <div className='border-2 border-lime-600 drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>

        <div className='flex justify-start border-b-2 border-lime-600'>
            <h3 className='bg-slate-600 w-full text-start silkscreen-regular text-lime-500 text-4xl font-bold p-4'>
            VISUALIZER
            </h3>
        </div>
            
        
        <div id='spanning-graph-container' className='drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>
            <div id="3d-graph-spanning-tree" className='overflow-hidden w-[100%] h-[600px]'></div>
        </div>     
      </div>


    </div>
  );
};


export default MinSpanningTreeVisualizer;
