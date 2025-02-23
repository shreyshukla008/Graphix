import React, { useEffect, useState } from 'react';
import useDfsLogic from '../hooks/useDfsLogic';
import Log from './Log';
import Instructions from './Instructions';
import { getAdjacencyList } from '../utils/graphUtils';


const DfsVisualizer = ({mainGraphData}) => {

  const [resetToggle, setRestToggle] = useState(false);

  const graph = getAdjacencyList(mainGraphData);

  const handleRefresh = ()=>{
    setRestToggle(!resetToggle);
  }

  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      const handleResize = () => {
        const parentElement = document.getElementById('dfs-graph-container');
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
    }, []);

  const {
    logs,
    isPaused,
    isRunning,
    graphData,
    startNode,
    setStartNode,
    handleStart,
    resetState,
    togglePause
  } = useDfsLogic(graph, -1, containerDimensions);

  return (
    <div id='dfs' className='flex flex-col gap-14'>

      <div className='flex justify-start gap-4'>
          <h2 className='font-charted-regular text-6xl text-lime-500'>D E P T H</h2>
          <h2 className='font-charted-regular text-6xl text-lime-500'>F I R S T</h2>
          <h2 className='font-charted-regular text-6xl text-lime-500'>S E A R C H</h2>
      </div>

    <div className='vt323-regular text-slate-300 text-lg flex flex-col gap-4 items-start' text-gray-300>
      <p className=' text-lg text-justify'>
        In Depth First Search (or DFS) for a graph, we traverse all adjacent vertices one by one. When we traverse an adjacent vertex, we completely finish the traversal of all vertices reachable through that adjacent vertex. 
      </p>
      <div className='flex flex-col items-start'>
        <h3 className='text-xl'>-- Time Complexity --</h3>
        <p className='text-lime-400'>Best Case: <span>O(V + E)</span></p>
        <p className='text-yellow-400'>Average Case: <span>O(V + E)</span></p>
        <p className='text-red-400'>Worst Case: <span>O(V + E)</span></p>
        <p>[where V is the number of vertices and E is the number of edges]</p>
      </div>
      <p className='text-xl text-slate-300'>
        Reference: <span> <a target='_blank' href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" className='text-lime-400 text-lg hover:text-sky-300'> <u>GFG</u> </a> </span>
      </p>
      <Instructions></Instructions>
    </div>

      <div className='flex'>
        
        <div className='w-[75%]'>
          <Log logs={logs} isPaused={isPaused} isAnimationStarted={isRunning} togglePause={togglePause} resetState={resetState} startAnimation={handleStart} />
        </div>

        <div className="flex flex-col items-center w-[30%] bg-slate-950 p-4 text-white">
          
          <div className='bg-slate-600 w-[60%] flex justify-between gap-2 rounded-lg shadow-md shadow-lime-600'>

            <label htmlFor="startNode" className='text-slate-300 p-2'>Start Node: </label>
            <select
              id="startNode"
              value={startNode}
              onChange={(e) => setStartNode(Number(e.target.value))}
              className='bg-slate-600 text-lime-500 w-[40%] p-2 rounded-lg'
            >
              <option value={-1} selected>
                #id
              </option>
              {Object.keys(graph).map((node) => (
                <option key={node} value={node}>
                  {node}
                </option>
              ))}
            </select>

          </div>
          
        </div>

      </div>
      
      
      <div id='dfs-graph-container' className='border-2 border-lime-600  drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>
            <div className='flex justify-start border-b-2 border-lime-600'>
                <h3 className='bg-slate-600 w-full text-start silkscreen-regular text-lime-500 text-4xl font-bold p-4'>
                VISUALIZER
                </h3>
            </div>
        <div id="3d-graph-dfs" className='overflow-hidden w-[100%] h-[600px]' ></div>
      </div>
    </div>
  );
};

export default DfsVisualizer;
