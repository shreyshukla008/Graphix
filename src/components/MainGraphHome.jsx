import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';
import AdjacencyMatrix from './AdjacencyMatrix';

const MainGraphHome = ({mainGraphData}) => {

    const graphRef = useRef();

      const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    
      useEffect(() => {
        const handleResize = () => {
          const parentElement = document.getElementById('graph-container');
          if (parentElement) {
            setContainerDimensions({
              width: parentElement.offsetWidth,
            });
          }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    

    useEffect(() => {
        const Graph = ForceGraph3D()(graphRef.current)
            .graphData(mainGraphData)
            .linkCurvature('curvature')
            .linkCurveRotation('rotation')
            .linkDirectionalParticles(2)
            .nodeLabel(node => `${node.name}`)
            .linkLabel(link => `Weight: ${link.weight}, Type: ${link.type}`)
            .linkWidth(1)
            .linkColor(link => link.color)
            .nodeAutoColorBy('id')
            .linkDirectionalArrowLength(3.5)
            .linkDirectionalArrowRelPos(1)
            .backgroundColor('#020618');

        Graph.graphData(mainGraphData);

        const controls = Graph.controls();
      controls.noZoom = true;   

    // Set initial graph size based on container dimensions
    if (containerDimensions) {
        Graph.width(containerDimensions.width).height(containerDimensions.height);
    }

    }, [mainGraphData,containerDimensions]);




  return (

<div id='main' className='flex flex-col bg-slate-950 gap-14 vt323-regular'>


    <div id='graph-container' className='border-2 border-lime-600 drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>
        <div className='flex justify-start border-b-2 border-lime-600'>
            <h3 className='bg-slate-600 w-full text-start silkscreen-regular text-lime-500 text-4xl font-bold p-4'>
            VISUALIZER
            </h3>
        </div>
        <div  ref={graphRef} className='overflow-hidden w-[100%] h-[600px]' />
    </div>

    <AdjacencyMatrix graph={mainGraphData}></AdjacencyMatrix>
</div>
      
   
  )
}

export default MainGraphHome
