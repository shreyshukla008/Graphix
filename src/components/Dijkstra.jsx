import React, { useEffect, useState } from 'react';
import useDijkstraLogic from '../hooks/useDijkstraLogic';
import Log from './Log';
import GanttChart from './Gant';
import Instructions from './Instructions';
import { getWeightedAdjacencyList } from '../utils/graphUtils';


const DynamicPathVisualizer = ({mainGraphData}) => {
  const [startNode, setStartNode] = useState(-1);
  const [endNode, setEndNode] = useState(-1);

  const [graph, setGraph] = useState({});
  
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const temp = getWeightedAdjacencyList(mainGraphData);
    setGraph(temp);
      const handleResize = () => {
        const parentElement = document.getElementById('dijkstra-graph-container');
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
    graphRef,
    logs,
    startVisualization,
    isAnimationStarted,
    resetGraph,
    togglePause,
    routes,
    isPaused,
  } = useDijkstraLogic(graph, startNode, endNode, containerDimensions);


  return (
    <div id='dijkstra' className='flex flex-col gap-14'>

      <div className='flex justify-start'>
        <h2 className='font-charted-regular text-6xl text-lime-500'>D I J K S T R A</h2>
      </div>

          <div className='vt323-regular text-slate-300 text-lg flex flex-col gap-4 items-start'>
            <p className='text-justify text-lg'>
            Dijkstra's algorithm is a method for finding the shortest paths between nodes in a graph, which can represent various networks such as road networks. It was developed by computer scientist Edsger W. Dijkstra in 1956. The algorithm starts at a source node and iteratively explores the graph, updating the shortest known distances to each node until all nodes are visited or the target node is reached. It maintains a set of visited nodes and uses a greedy approach to select the next node with the smallest tentative distance from the source.
            </p>
            <div className='flex flex-col items-start'>
              <h3 className='text-xl'>-- Time Complexity --</h3>
              <p className='text-lime-400'>Best Case: <span> O(E * logV)</span></p>
              <p className='text-yellow-400'>Average Case: <span> O(E * logV)</span></p>
              <p className='text-red-400'>Worst Case: <span>O(V<sup>2</sup>) </span></p>
              <p>[where V is the number of vertices and E is the number of edges]</p>
            </div>
            <p className='text-xl text-slate-300'>
              Reference: <span> <a target='_blank' href="https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" className='text-lime-400 text-lg hover:text-sky-300'> <u>GFG</u> </a> </span>
            </p>
            <Instructions></Instructions>
          </div>
      


      <div className='flex justify-between'>

        <div className='w-[75%]'>
          <Log logs={logs} isPaused={isPaused} isAnimationStarted={isAnimationStarted} togglePause={togglePause} resetState={resetGraph} startAnimation={startVisualization} />
        </div>

        <div className='w-[30%] flex flex-col vt323-regular text-xl items-center justify-start py-6 px-2 gap-8'>

          <div className='bg-slate-600 w-[60%] flex justify-between gap-2 rounded-lg shadow-md shadow-lime-600'>
            <label className='text-slate-300 p-2'>
              Start Node:
            </label>
              <select className='bg-slate-600 text-lime-500 w-[40%] p-2 rounded-lg'
               value={startNode} onChange={(e) => setStartNode(Number(e.target.value))}>
                <option value={-1}> #id </option>
                {Object.keys(graph).map((node) => (
                  <option key={node} value={node}>
                    {node}
                  </option>
                ))}
              </select>
          </div>

          <div className='bg-slate-600 w-[60%] flex justify-between gap-2 rounded-lg shadow-md shadow-lime-600'>
            
            <label className='text-slate-300 p-2'>
              End Node:
            </label>
              <select className='bg-slate-600 text-lime-500 w-[40%] p-2 rounded-lg'
               value={endNode} onChange={(e) => setEndNode(Number(e.target.value))}>
                <option value={-1}> #id</option>
                {Object.keys(graph).map((node) => (
                  <option key={node} value={node}>
                    {node}
                  </option>
                ))}
              </select>
          </div>
        </div>
      
      </div>
      

      <div id='dijkstra-graph-container' className='border-2 border-lime-600 drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>
            <div className='flex justify-start border-b-2 border-lime-600'>
                <h3 className='bg-slate-600 w-full text-start silkscreen-regular text-lime-500 text-4xl font-bold p-4'>
                VISUALIZER
                </h3>
            </div>
        <div id="3d-graph-dijkstra" className='overflow-hidden w-[100%] h-[600px]'></div>
      </div>

      {
        routes.length != 0 &&
        <GanttChart routes={routes}></GanttChart>
      }
    </div>
  );
};

export default DynamicPathVisualizer;
