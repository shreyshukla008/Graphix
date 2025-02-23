import { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';

const useBfsVisualizer = (initialGraph, containerDimensions) => {
    const graphRef = useRef();
    const [currentPathIndex, setCurrentPathIndex] = useState(-1);
    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [startNode, setStartNode] = useState(-1);
    const [logs, setLogs] = useState([]);

    const bfs = (graph, startNode) => {
        let queue = [startNode];
        let visited = new Set();
        let parent = {};
        let sequence = [];

        visited.add(startNode);
        parent[startNode] = null;

        while (queue.length > 0) {
            let node = queue.shift();
            sequence.push(node);

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                    parent[neighbor] = node;
                }
            }
        }

        return { sequence, parent };
    };

    const initializeGraph = () => {
        const forceGraph = ForceGraph3D()(document.getElementById('3d-graph-bfs'))
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
        forceGraph.graphData({ nodes: [], links: [] });

        const controls = forceGraph.controls();
      controls.noZoom = true;


      if (containerDimensions) {
        forceGraph.width(containerDimensions.width).height(containerDimensions.height);
      }
    };

    const addEdgeToGraph = (from, to) => {
        const currentGraph = graphRef.current.graphData();
        const nodes = new Set(currentGraph.nodes.map((node) => node.id));
        const links = [...currentGraph.links];

        if (!nodes.has(from)) {
            currentGraph.nodes.push({ id: from, ...generateUniquePosition(from) });
        }
        if (!nodes.has(to)) {
            currentGraph.nodes.push({ id: to, ...generateUniquePosition(to) });
        }
        links.push({ source: from, target: to });
        graphRef.current.graphData({ nodes: currentGraph.nodes, links });
    };

    const generateUniquePosition = (id) => ({
        x: Math.random() * 500 - 250,
        y: Math.random() * 500 - 250,
        z: Math.random() * 500 - 250,
    });

    useEffect(() => {
        initializeGraph();
    }, [containerDimensions]);

    useEffect(() => {
        
        if (!isPaused && isAnimationStarted && graphRef.current?.bfsSequence && currentPathIndex < graphRef.current.bfsSequence.sequence.length) {
            const interval = setInterval(() => {
                setCurrentPathIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex < graphRef.current.bfsSequence.sequence.length) {
                        const to = graphRef.current.bfsSequence.sequence[nextIndex];
                        const from = graphRef.current.bfsSequence.parent[to];
                        addEdgeToGraph(from, to);
                        setLogs((prevLogs) => [
                            ...prevLogs,
                            { message: `Visited node ${to}`, type: 'success' },
                        ]);
                        return nextIndex;
                    } else {
                        clearInterval(interval);
                        return prevIndex;
                    }
                });
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [isPaused, isAnimationStarted, currentPathIndex]);

    const startBfs = () => {
        const bfsResult = startNode != -1 ?  bfs(initialGraph, startNode) : 
                            setLogs((prevLogs) => [
                            { message: `Select Start Node!`, type: 'error' },
                            ]);
        if(startNode == -1) return;
        
        graphRef.current.bfsSequence = bfsResult;
        
        setCurrentPathIndex(0);
        setIsAnimationStarted(true);
        setIsPaused(false);
        graphRef.current.graphData({ nodes: [], links: [] });
        setLogs([]);

        setLogs((prevLogs) => [
            { message: `Visited node ${startNode}`, type: 'success' },
        ]);
    };

    const togglePause = () => {
        if (!isAnimationStarted) return;
        setIsPaused((prev) => !prev);
        setLogs((prevLogs) => [
            ...prevLogs,
            { message: `Status: ${isPaused ? 'Resumed' : 'Paused'}`, type: 'success' },
        ]);
    };

    const resetState = () => {
        setIsPaused(true);
        setIsAnimationStarted(false);
        setLogs([]); 
        initializeGraph();
    };



    return {
        graphRef,
        startNode,
        setStartNode,
        startBfs,
        togglePause,
        logs,
        isPaused,
        isAnimationStarted,
        resetState,
    };
};

export default useBfsVisualizer;
