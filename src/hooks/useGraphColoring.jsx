import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';

const useGraphColoring = (graph, containerDimensions) => {
    const graphRef = useRef();
    const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [maxColors, setMaxColors] = useState(4);
    const [logs, setLogs] = useState([]);

    const createGraphData = (adjList, containerDimensions) => {
      const nodes = Object.keys(adjList).map((id) => ({ id: parseInt(id), color: 'white' }));
      const links = [];
  
      Object.entries(adjList).forEach(([source, targets]) => {
        targets.forEach((target) => {
          if (
            !links.some(
              (link) =>
                (link.source === parseInt(source) && link.target === parseInt(target)) ||
                (link.source === parseInt(target) && link.target === parseInt(source))
            )
          ) {
            links.push({ source: parseInt(source), target: parseInt(target), color: 'white' });
          }
        });
      });
  
      return { nodes, links };
    };
  

    const graphColoring = (graph, numberOfColors) => {
      const nodeColors = {};
      const steps = [];
  
      Object.keys(graph).forEach((node) => {
        const usedColors = new Set(
          graph[node].map((neighbor) => nodeColors[neighbor]).filter(Boolean)
        );
  
        for (let color = 1; color <= numberOfColors; color++) {
          if (!usedColors.has(color)) {
            nodeColors[node] = color;
            steps.push({ node: parseInt(node), color });
            break;
          }
        }
  
        if (!nodeColors[node]) {
          steps.push({ error: true, node: parseInt(node) });
          return steps;
        }
      });
  
      return steps;
    };
  
    useEffect(() => {
      
      const ColorGraph = ForceGraph3D()(document.getElementById('3d-graph-color'))
        .nodeId('id')
        .nodeLabel('id')
        .nodeAutoColorBy('color')
        .linkWidth(1)
        .linkDirectionalParticles(2)
        .linkDirectionalParticleSpeed(0.01)
        .linkOpacity(0.5)
        .linkColor(() => 'white')
        .backgroundColor('#020618');
  
      graphRef.current = ColorGraph;
  
      
      const graphData = createGraphData(graph);
      ColorGraph.graphData(graphData);
  
      
      const coloringSteps = graphColoring(graph, maxColors);
      graphRef.current.coloringSteps = coloringSteps;
      setCurrentNodeIndex(-1); // Initialize index

      const controls = ColorGraph.controls();
      controls.noZoom = true;

      
      if (containerDimensions) {
        ColorGraph.width(containerDimensions.width).height(containerDimensions.height);
      }
    }, [containerDimensions]);
  
    useEffect(() => {
      if ( isAnimationStarted && !isPaused && graphRef.current.coloringSteps && currentNodeIndex < graphRef.current.coloringSteps.length) {
        const interval = setInterval(() => {
          setCurrentNodeIndex((prev) => {
            const nextIndex = prev + 1;
            if (nextIndex < graphRef.current.coloringSteps.length) {
              const step = graphRef.current.coloringSteps[nextIndex];
              
              if (step.error) {
                setLogs((prevLogs) => [
                  ...prevLogs,
                  { type: 'error', message: `Failed to color node ${step.node}. Not enough colors.` },
                ]);
                clearInterval(interval);
                return prev;
              }
    
              
              setTimeout(() => {
                setLogs((prevLogs) => [
                  ...prevLogs,
                  { type: 'info', message: `Analyzing node ${step.node}` },
                ]);
              }, 1000);

              setTimeout(() => {
                colorNode(step.node, step.color);
                setLogs((prevLogs) => [
                  ...prevLogs,
                  { type: 'success', message: `Successfully colored node ${step.node} with color ${step.color}` },
                ]);
              }, 2000);
    
              return nextIndex;
            } else {
              setLogs((prevLogs) => [...prevLogs, { type: 'complete', message: 'Graph Coloring Complete' }]);
              clearInterval(interval);
              return prev;
            }
          });
        }, 2000);
    
        return () => clearInterval(interval);
      }
    }, [isPaused, currentNodeIndex,isAnimationStarted]);
    
    const colorNode = (nodeId, colorIndex) => {
      const colors = ['white', 'red', 'green', 'blue', 'yellow'];
      const color = colors[colorIndex] || 'white';
  
      const currentGraph = graphRef.current.graphData();
      const nodes = currentGraph.nodes;
      const links = currentGraph.links;
      
      const node = nodes.find((node) => node.id === nodeId);
      if (node) {
        node.color = color; 
      }
  
      graphRef.current.graphData({
        nodes,
        links
      });
    };
  
    const resetGraphColors = () => {
      
      const graphData = createGraphData(graph);
      setIsPaused(false);
      setIsAnimationStarted(false)
      setLogs([]);
      graphRef.current.graphData(graphData);
      setCurrentNodeIndex(-1);
    };
  
    const togglePause = () => {
      if (!isAnimationStarted) return;
      setIsPaused((prev) => !prev);
      setLogs((prevLogs) => [
        ...prevLogs,
        { message: `Status: ${isPaused ? ('Resumed') : ('Paused')}`, type: 'success' } // Log message
    ]);
    };
  
    const handleColorChange = (event) => {
      setIsAnimationStarted(true);
      const value = Math.min(4, Math.max(1, parseInt(event.target.value)));
      setMaxColors(value);
      setIsPaused(false);
    };
  
    const handleColoring = () => {
      setIsAnimationStarted(true);
      const coloringSteps = graphColoring(graph, maxColors);
      graphRef.current.coloringSteps = coloringSteps;
      setCurrentNodeIndex(-1);
      setLogs([]);
    };

    return {
      maxColors,
      isAnimationStarted,
      handleColoring,
      handleColorChange,
      togglePause,
      resetGraphColors,
      isPaused,
      logs
    }
};

export default useGraphColoring;