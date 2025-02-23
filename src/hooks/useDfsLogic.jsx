import { useState, useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';

const useDfsLogic = (graph, initialStartNode, containerDimensions) => {
  const graphRef = useRef();
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [startNode, setStartNode] = useState(initialStartNode);
  const [isRunning, setIsRunning] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const stopRef = useRef(false);

  useEffect(() => {
    const forceGraph = ForceGraph3D()(document.getElementById('3d-graph-dfs'))
      .nodeId('id')
      .nodeLabel('id')
      .linkWidth(1)
      .linkDirectionalParticles(2)
      .nodeAutoColorBy('id')
      .nodeOpacity(1)
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      .linkDirectionalParticleSpeed(0.01)
      .backgroundColor('#020618');
      
    graphRef.current = forceGraph;
    forceGraph.graphData(graphData);

      const controls = forceGraph.controls();
      controls.noZoom = true;


      if (containerDimensions) {
        forceGraph.width(containerDimensions.width).height(containerDimensions.height);
      }
  }, []);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.graphData(graphData);
    }
  }, [graphData, containerDimensions]);

  const addLog = (message, type) => {
    setLogs((prevLogs) => [...prevLogs, { message, type }]);
  };

  const addNodeAndEdgeToGraph = async (from, to = null) => {
    if(from === null) {
      return;
    }
    return new Promise((resolve) => {
      setGraphData((prevData) => {
        const nodesMap = new Map(prevData.nodes.map((node) => [node.id, node]));
        const links = [...prevData.links];
  
     
        if (from !== null && !nodesMap.has(from)) {
          nodesMap.set(from, { id: from });
        }
  
        if (to !== null) {
          if (!nodesMap.has(to)) {
            nodesMap.set(to, { id: to });
          }
          
          if (
            from !== null &&
            !links.some((link) => link.source === from && link.target === to)
          ) {
            links.push({ source: from, target: to });
          }
        }
  
        return { nodes: Array.from(nodesMap.values()), links };
      });
  
      setTimeout(() => resolve(), 1000); 
    });
  };
  

  const waitForResume = () => {
    return new Promise((resolve) => {
      const checkPause = () => {
        if (!isPaused && !stopRef.current) {
          resolve();
        } else {
          setTimeout(checkPause, 100);
        }
      };
      checkPause();
    });
  };

  const dfsWithStack = async (startNode) => {

    if(startNode == -1){
      addLog('Select Start Node', 'error');
      return;
    }


    const visited = new Set();
    const stack = [{ node: startNode, parent: null }];

    
  
    addLog(`Starting DFS from node ${startNode}`, 'info');
  
    while (stack.length > 0) {
      if (stopRef.current) {
        addLog('DFS traversal stopped.', 'error');
        return;
      }

  
      const { node: currentNode, parent } = stack.pop();
  
      if (!visited.has(currentNode)) {
        
        await addNodeAndEdgeToGraph(parent, currentNode);
        addLog(`Visiting node ${currentNode}`, 'success');
        visited.add(currentNode);
  
        for (const neighbor of graph[currentNode]) {
          if (!visited.has(neighbor)) {
            addLog(`Adding ${neighbor} to stack for later visit`, 'info');
            stack.push({ node: neighbor, parent: currentNode });
          }
        }
      }
    }
  
    addLog('DFS traversal completed.', 'success');
  };
  

  const handleStart = async () => {

    stopRef.current = false;
    setIsRunning(true);
    setLogs([]);
    setGraphData({ nodes: [], links: [] });


    await dfsWithStack(startNode);
    setIsRunning(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    addLog(isPaused ? 'Resuming DFS' : 'Pausing DFS', 'info');
  };

  const resetState = () => {
    setGraphData({ nodes: [], links: [] });
    stopRef.current = true;
    setLogs([]);
    setIsRunning(false);
    setIsPaused(false);
    addLog('DFS state reset.', 'info');
  };

  return {
    logs,
    isPaused,
    isRunning,
    graphData,
    startNode,
    setStartNode,
    handleStart,
    resetState,
    togglePause,
  };
};

export default useDfsLogic;

