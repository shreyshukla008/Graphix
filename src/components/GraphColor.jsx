import React, {useState, useEffect}  from 'react'
import Log from './Log'
import useGraphColoring from '../hooks/useGraphColoring'
import Instructions from './Instructions';

import { getAdjacencyList } from '../utils/graphUtils';

const GraphColoringVisualizer = ({mainGraphData}) => {

    const [graph, setGraph] = useState({});

  function convertToUndirectedGraph(graphData) {
    const { nodes, links } = graphData;
    const newLinks = [...links];
    
    const linkSet = new Set();
    links.forEach(link => {
        const key = `${link.source}-${link.target}`;
        const reverseKey = `${link.target}-${link.source}`;
        
        if (!linkSet.has(reverseKey)) {
            newLinks.push({
                source: link.target,
                target: link.source,
                weight: link.weight,
                type: link.type,
                color: link.color,
                curvature: -link.curvature, 
                rotation: -link.rotation 
            });
            linkSet.add(key);
            linkSet.add(reverseKey);
        }
    });
    
    return { nodes, links: newLinks };
}



  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      const handleResize = () => {
        const parentElement = document.getElementById('color-graph-container');
        const undir = convertToUndirectedGraph(mainGraphData);
        const temp = getAdjacencyList(undir);
        setGraph(temp)
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
    maxColors,
    handleColoring,
    handleColorChange,
    togglePause,
    resetGraphColors,
    isPaused,
    isAnimationStarted,
    logs
  } = useGraphColoring(graph, containerDimensions);

  return (
    <div id='color' className='flex flex-col gap-14'>

<     div className='flex justify-start gap-4'>
          <h2 className='font-charted-regular text-6xl text-lime-500'>G R A P H</h2>
          <h2 className='font-charted-regular text-6xl text-lime-500'>C O L O R I N G</h2>
      </div>

          <div className='vt323-regular text-slate-300 text-lg flex flex-col gap-4 items-start'>
            <p className=' text-lg text-justify'>
              Graph coloring refers to the problem of coloring vertices of a graph in such a way that no two adjacent vertices have the same color. This is also called the vertex coloring problem. If coloring is done using at most m colors, it is called m-coloring.
            </p>
            <div className='flex flex-col items-start'>
              <h3 className='text-xl'>-- Time Complexity --</h3>
              <p className='text-lime-400'>Best Case: <span>O(m<sup>V</sup>)</span></p>
              <p className='text-yellow-400'>Average Case: <span>O(m<sup>V</sup>)</span></p>
              <p className='text-red-400'>Worst Case: <span>O(m<sup>V</sup>)</span></p>
              <p>[where V is the number of vertices and E is the number of edges]</p>
            </div>
            <p className='text-xl text-slate-300'>
              Reference: <span> <a target='_blank' href="https://www.geeksforgeeks.org/graph-coloring-applications/" className='text-lime-400 text-lg hover:text-sky-300'> <u>GFG</u> </a> </span>
            </p>
            <Instructions></Instructions>
          </div>


          <div className='flex justify-between'>

              <div className='w-[75%]'>
                  <Log logs={logs} startAnimation={handleColoring} togglePause={togglePause} resetState={resetGraphColors} isAnimationStarted={isAnimationStarted} isPaused={isPaused} />  {/* Pass the logs state to the Log component */}
              </div>

              <div className='w-[30%] flex flex-col vt323-regular text-xl items-center justify-start py-6 px-2 gap-8'>
                  <div className='bg-slate-600 w-[60%] flex justify-between gap-2 rounded-lg shadow-md shadow-lime-600'>
                    <label className='text-slate-300 p-2'>
                      Maximum Colors: 
                    </label>
                      <select className='bg-slate-600 text-lime-500 w-[40%] p-2 rounded-lg'
                      value={maxColors} onChange={handleColorChange} style={{ marginLeft: "10px" }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                  </div>
              </div>

          </div>



        

        <div id='color-graph-container' className='border-2 border-lime-600 drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>
                <div className='flex justify-start border-b-2 border-lime-600'>
                    <h3 className='bg-slate-600 w-full text-start silkscreen-regular text-lime-500 text-4xl font-bold p-4'>
                    VISUALIZER
                    </h3>
                </div>
          <div id="3d-graph-color" className='overflow-hidden w-[100%] h-[600px]'></div>
        </div>
    </div>
  );
};

export default GraphColoringVisualizer;























