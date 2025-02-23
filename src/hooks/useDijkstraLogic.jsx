import { useRef, useState, useEffect } from 'react';
import ForceGraph3D from '3d-force-graph';

const useDijkstraLogic = (graph, startNode, endNode, containerDimensions) => {
  
  const graphRef = useRef();
  const [logs, setLogs] = useState([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(-1);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [routes, setRoutes] = useState([]); 

  const addLog = (message, type = 'info') => {
    
    setLogs((prevLogs) => [...prevLogs, { message, type }]);
  };

  const calculateShortestPath = (startNode, endNode) => {
    const distances = {};
    const previous = {};
    const visited = {};
    const pq = [{ node: startNode, distance: 0 }];
    const allRoutes = []; 
    const solutionRoutes = []; 

    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      previous[node] = null;
      visited[node] = false;
    });
    distances[startNode] = 0;

    addLog(`Starting Dijkstra's algorithm from Node ${startNode}`, 'info');

    while (pq.length > 0) {
      pq.sort((a, b) => a.distance - b.distance);
      const { node: currentNode, distance } = pq.shift();

      if (visited[currentNode]) continue;
      visited[currentNode] = true;

      addLog(`Visiting Node ${currentNode} with current distance ${distance}`, 'info');

      if (currentNode === endNode) {
        addLog(`Shortest path to reached node ${endNode} will total cost ${distance}`, 'success');
        break;
      }

      if (graph[currentNode]) {
        graph[currentNode].forEach(({ to, weight }) => {
          const newDistance = distances[currentNode] + weight;
          if (newDistance < distances[to]) {
            distances[to] = newDistance;
            previous[to] = currentNode;
            pq.push({ node: to, distance: newDistance });

            allRoutes.push({
              startNode: currentNode,
              endNode: to,
              startDistance: distances[currentNode],
              endDistance: newDistance,
              routeType: `type${allRoutes.length + 1}`,
            });
          }
        });
      } else {
        addLog(`Node ${currentNode} has no outgoing edges`, 'warning');
      }
    }

    const path = [];
    let currentNode = endNode;

    while (currentNode !== null) {
      const prevNode = previous[currentNode];
      if (prevNode !== null) {
        path.unshift({ from: prevNode, to: currentNode });
      }
      currentNode = prevNode;
    }


    path.forEach(({ from, to }) => {
      const route = allRoutes.find((r) => r.startNode === from && r.endNode === to);
      if (route) {
        solutionRoutes.push(route);
      }
    });

    if (distances[endNode] === Infinity) {
      addLog(`Destination Node ${endNode} is not reachable from Node ${startNode}`, 'error');
      return { path: [], routes: [] }; 
    }

    return { path, routes: solutionRoutes }; 
  };

  const initializeGraph = () => {
    const forceGraph = ForceGraph3D()(document.getElementById('3d-graph-dijkstra'))
      .nodeId('id')
      .nodeLabel('id')
      .linkCurvature('curvature')
      .linkDirectionalArrowRelPos(1)
      .linkDirectionalArrowLength(3.5)
      .linkWidth((link) => (link.highlighted ? 3 : 1))
      .linkColor((link) => (link.highlighted ? 'aqua' : 'white'))
      .backgroundColor('#020618');

    graphRef.current = forceGraph;

    const nodes = Object.keys(graph).map((id) => ({
      id: Number(id),
      size: 5,
      color: 'white',    
    }));

    const links = Object.entries(graph).flatMap(([from, edges]) =>
      edges.map(({ to }) => ({
        source: Number(from),
        target: Number(to),
        highlighted: false,
      }))
    );

      const controls = forceGraph.controls();
      controls.noZoom = true;

      if (containerDimensions) {
        forceGraph.width(containerDimensions.width).height(containerDimensions.height);
      }

    forceGraph.graphData({ nodes, links });
  };

  useEffect(() => {
    initializeGraph();
  }, [containerDimensions, graph]);

  useEffect(() => {
    if (isAnimationStarted && !isPaused && graphRef.current.shortestPath && currentPathIndex < graphRef.current.shortestPath.length) {
      const timeout = setTimeout(() => {
        const graphData = graphRef.current.graphData();

        if (currentPathIndex >= 0) {
          const { from, to } = graphRef.current.shortestPath[currentPathIndex];

          const link = graphData.links.find(
            (link) => link.source.id === from && link.target.id === to
          );
          if (link) link.highlighted = true;

          [from, to].forEach((nodeId) => {
            const node = graphData.nodes.find((node) => node.id === nodeId);
            if (node && node.id !== startNode && node.id !== endNode) {
              node.size *= 1.5;
              node.color = 0xffa500;
            }
          });

          addLog(`Traversed from Node ${from} to Node ${to}`, 'success');
        }

        graphRef.current.graphData(graphData);
        setCurrentPathIndex((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentPathIndex, isPaused, isAnimationStarted]);

  const startVisualization = () => {

    if(startNode == -1 || endNode == -1){

      addLog("In Valid Node Selection!", 'error');
      return;
    }



    setIsAnimationStarted(true);

    const forceGraph = graphRef.current;
    const graphData = forceGraph.graphData();


    graphData.nodes.forEach((node) => {
      node.size = 5;
      node.color = 'white';
    });
    graphData.links.forEach((link) => (link.highlighted = false));

    const startNodeObj = graphData.nodes.find((node) => node.id === startNode);
    const endNodeObj = graphData.nodes.find((node) => node.id === endNode);
    if (startNodeObj) {
      startNodeObj.size = 10;
      startNodeObj.color = 'teal';
    }
    if (endNodeObj) {
      endNodeObj.size = 10;
      endNodeObj.color = 'aqua';
    }

    forceGraph.graphData(graphData);

    const { path, routes } = calculateShortestPath(startNode, endNode);
    forceGraph.shortestPath = path;
    setRoutes(routes);
    if(routes.length === 0){ 
      addLog(`Destination Node ${endNode} is not reachable from Node ${startNode}`, 'error')
  }

    setCurrentPathIndex(0);

  };

  const resetGraph = () => {
    setLogs([]);
    setCurrentPathIndex(-1);
    setIsPaused(false);
    setIsAnimationStarted(false);
    initializeGraph();
  };

  const togglePause = () => {
    if (!isAnimationStarted) return;
    setIsPaused((prev) => !prev);
    setLogs((prevLogs) => [
      ...prevLogs,
      { message: `Status: ${isPaused ? ('Resumed') : ('Paused')}`, type: 'success' } 
  ]);
  };

  return {
    graphRef,
    logs,
    routes, 
    startVisualization,
    isAnimationStarted,
    resetGraph,
    togglePause,
    isPaused,
  };
};

export default useDijkstraLogic;
