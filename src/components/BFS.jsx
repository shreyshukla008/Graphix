import React, {useState, useEffect} from 'react';
import useBfsVisualizer from '../hooks/useBfsVisualizer';
import Log from './Log';
import Instructions from './Instructions';
import { getAdjacencyList } from '../utils/graphUtils';


const BfsVisualizer = ({mainGraphData}) => {

    const initialGraph = getAdjacencyList(mainGraphData);

    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    
      useEffect(() => {
        const handleResize = () => {
          const parentElement = document.getElementById('bfs-graph-container');
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
        graphRef,
        startNode,
        isAnimationStarted,
        setStartNode,
        startBfs,
        togglePause,
        resetState,
        logs,
        isPaused,
    } = useBfsVisualizer(initialGraph,containerDimensions);

    return (
        <div id="bfs" className='flex flex-col gap-14'>

          <div className='flex justify-start gap-4'>
            <h2 className='font-charted-regular text-6xl text-lime-500'>B R E A D T H</h2>
            <h2 className='font-charted-regular text-6xl text-lime-500'>F I R S T </h2>
            <h2 className='font-charted-regular text-6xl text-lime-500'>S E A R C H</h2>
          </div>

              <div className='vt323-regular text-slate-300 text-lg flex flex-col gap-4 items-start'>
                <p className=' text-lg text-justify'>
                 Breadth First Search (BFS) is a fundamental graph traversal algorithm. It begins with a node, then first traverses all its adjacent. Once all adjacent are visited, then their adjacent are traversed.
                </p>
                <div className='flex flex-col items-start'>
                  <h3 className='text-xl'>-- Time Complexity --</h3>
                  <p className='text-lime-400'>Best Case: <span>O(V + E)</span></p>
                  <p className='text-yellow-400'>Average Case: <span>O(V + E)</span></p>
                  <p className='text-red-400'>Worst Case: <span>O(V + E)</span></p>
                  <p>[where V is the number of vertices and E is the number of edges]</p>
                </div>
                <p className='text-xl text-slate-300'>
                  Reference: <span> <a target='_blank' href="https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/" className='text-lime-400 text-lg hover:text-sky-300'> <u>GFG</u> </a> </span>
                </p>
                <Instructions></Instructions>
              </div>
          

          <div className='flex'>

            <div className='w-[75%]'>
              <Log logs={logs} isPaused={isPaused} isAnimationStarted={isAnimationStarted} togglePause={togglePause} resetState={resetState} startAnimation={startBfs} />
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
                  <option value='-1'>
                    #id
                  </option>
                  {Object.keys(initialGraph).map((node) => (
                          <option key={node} value={node}>
                              {node}
                          </option>
                      ))}
                  
                </select>

              </div>
            
          </div>


          </div>

            
            <div id='bfs-graph-container' className='border-2 border-lime-600  drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>
                <div className='flex justify-start border-b-2 border-lime-600'>
                    <h3 className='bg-slate-600 w-full text-start silkscreen-regular text-lime-500 text-4xl font-bold p-4'>
                    VISUALIZER
                    </h3>
                </div>
                <div id="3d-graph-bfs" className='overflow-hidden w-[100%] h-[600px]'></div>
            </div>
        </div>
    );
};

export default BfsVisualizer;
