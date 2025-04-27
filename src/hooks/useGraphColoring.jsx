import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';

const useGraphColoring = (graph, containerDimensions) => {
  const graphRef = useRef();
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [maxColors, setMaxColors] = useState(4);
  const [logs, setLogs] = useState([]);

  const createGraphData = (adjList) => {
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

  // Updated coloring logic: deterministic ordering, proper break on error
  const graphColoring = (adjList, numberOfColors) => {
    const nodeColors = {};
    const steps = [];
    const nodes = Object.keys(adjList)
      .map((n) => parseInt(n))
      .sort((a, b) => a - b);

    for (const node of nodes) {
      // collect colors used by already-colored neighbors
      const usedColors = new Set();
      for (const neighbor of adjList[node]) {
        if (nodeColors[neighbor]) usedColors.add(nodeColors[neighbor]);
      }

      // pick smallest available color
      let assignedColor = null;
      for (let c = 1; c <= numberOfColors; c++) {
        if (!usedColors.has(c)) {
          assignedColor = c;
          break;
        }
      }

      // if no color could be assigned, record error and stop
      if (!assignedColor) {
        steps.push({ error: true, node });
        break;
      }

      nodeColors[node] = assignedColor;
      steps.push({ node, color: assignedColor });
    }

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
    setCurrentNodeIndex(-1);

    const controls = ColorGraph.controls();
    controls.noZoom = true;

    if (containerDimensions) {
      ColorGraph.width(containerDimensions.width).height(containerDimensions.height);
    }
  }, [containerDimensions]);

  useEffect(() => {
    if (
      isAnimationStarted &&
      !isPaused &&
      graphRef.current.coloringSteps &&
      currentNodeIndex < graphRef.current.coloringSteps.length
    ) {
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
  }, [isPaused, currentNodeIndex, isAnimationStarted]);

  const colorNode = (nodeId, colorIndex) => {
    const colors = ['white', 'red', 'green', 'blue', 'yellow'];
    const color = colors[colorIndex] || 'white';
    const currentGraph = graphRef.current.graphData();
    const nodesArr = currentGraph.nodes;
    const linksArr = currentGraph.links;
    const node = nodesArr.find((n) => n.id === nodeId);
    if (node) node.color = color;
    graphRef.current.graphData({ nodes: nodesArr, links: linksArr });
  };

  const resetGraphColors = () => {
    const graphData = createGraphData(graph);
    setIsPaused(false);
    setIsAnimationStarted(false);
    setLogs([]);
    graphRef.current.graphData(graphData);
    setCurrentNodeIndex(-1);
  };

  const togglePause = () => {
    if (!isAnimationStarted) return;
    setIsPaused((prev) => !prev);
    setLogs((prevLogs) => [
      ...prevLogs,
      { message: `Status: ${isPaused ? 'Resumed' : 'Paused'}`, type: 'success' },
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
    setLogs((prevLogs) => [...prevLogs, { type: 'complete', message: '==> Coloring Graph With ' + maxColors + ' Colors ' }]);
  };

  return {
    maxColors,
    isAnimationStarted,
    handleColoring,
    handleColorChange,
    togglePause,
    resetGraphColors,
    isPaused,
    logs,
  };
};

export default useGraphColoring;
