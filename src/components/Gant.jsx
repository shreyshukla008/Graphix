import React, { useEffect } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone/esm';

const GanttChart = ({routes}) => {
  useEffect(() => {
    const items = routes.map((route, index) => ({
      id: index + 1,
      content: `${route.startNode} to ${route.endNode}`,
      start: route.startDistance, 
      end: route.endDistance,  
      style: `background-color: ${route.routeType === 'type1' ? 'teal' : route.routeType === 'type2' ? 'lime' : 'aqua'};`
    }));

    const container = document.getElementById('gantt-chart');
    const data = new DataSet(items);

    const options = {
      width: '100%',
      height: '100px',
      showCurrentTime: false,
      editable: false,
      stack: false,
      zoomable: true,
      showMajorLabels: false,
      start: Math.min(...routes.map(route => route.startDistance)),
      end: Math.max(...routes.map(route => route.endDistance)) + 5,
    };

    
    new Timeline(container, data, options);

  }, [routes]);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-start'>
        <h3 className='silkscreen-regular text-lime-500 text-4xl font-bold p-4'>GANT CHART</h3>
      </div>
      <div id="gantt-chart" className='h-[100px]'></div>
    </div> 
  );
};

export default GanttChart;


