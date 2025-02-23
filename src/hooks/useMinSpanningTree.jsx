import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';



const useMinSpanningTree = (originalGraph, containerDimensions)  => {

    const graphRef = useRef();
    const [currentEdgeIndex, setCurrentEdgeIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true); 
    const [parent, setParent] = useState({});
    const [rank, setRank] = useState({});
    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [logs, setLogs] = useState([]);

    const graph = originalGraph;
    
    const sortedEdges = [...graph.edges].sort((a, b) => a.weight - b.weight);
    

    useEffect(() => {
        resetState();
    }, [originalGraph]); 


  useEffect(() => {
    const forceGraph = ForceGraph3D()(document.getElementById('3d-graph-spanning-tree'))
      .nodeId('id')
      .nodeLabel('id')
      .linkWidth(1)
      .zoomToFit(0, 100)
      .nodeAutoColorBy('id')
      .backgroundColor('#020618');

      const controls = forceGraph.controls();
      controls.noZoom = true;

    graphRef.current = forceGraph;

    if (containerDimensions) {
      forceGraph.width(containerDimensions.width).height(containerDimensions.height);
    }

    forceGraph.graphData({ nodes: graph.nodes, links: [] });

    return () => {
      graphRef.current = null;
    };
  }, [containerDimensions]);


    useEffect(() => {
        if (!isPaused && isAnimationStarted && currentEdgeIndex < sortedEdges.length) {
            const interval = setInterval(() => {
                setCurrentEdgeIndex((prev) => {
                    if (prev < sortedEdges.length) {
                        addEdgeToGraph(sortedEdges[prev]);
                        return prev + 1;
                    } else {
                        setLogs((prevLogs) => [...prevLogs, { message: 'MST Construction Complete', type: 'complete' }]);
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [isPaused, currentEdgeIndex, isAnimationStarted, sortedEdges]);

    const addEdgeToGraph = (edge) => {
        const currentGraph = graphRef.current.graphData();
        const links = [...currentGraph.links];


        setLogs((prevLogs) => [
            ...prevLogs,
            { message: `Analyzing the edge from node ${edge.source} to node ${edge.target} with weight ${edge.weight}`, type: 'info' }
        ]);

        setTimeout(() => {
            const rootSource = find(parent, edge.source);
            const rootTarget = find(parent, edge.target);

            if (rootSource !== rootTarget) {
                links.push({ source: edge.source, target: edge.target, value: edge.weight });
                const newParent = { ...parent };
                const newRank = { ...rank };
                union(newParent, newRank, edge.source, edge.target);

                setParent(newParent);
                setRank(newRank);

                setLogs((prevLogs) => [
                    ...prevLogs,
                    { message: `Edge from ${edge.source} to ${edge.target} with weight ${edge.weight} is part of the solution`, type: 'success' }
                ]);
            } else {
                setLogs((prevLogs) => [
                    ...prevLogs,
                    { message: `Edge from ${edge.source} to ${edge.target} with weight ${edge.weight} is discarded`, type: 'error' }
                ]);
            }

            graphRef.current.graphData({ nodes: currentGraph.nodes, links });
        }, 1000); 
    };

    const togglePause = () => {
        if (!isAnimationStarted) return;
        setIsPaused((prev) => !prev);
        setLogs((prevLogs) => [
            ...prevLogs,
            { message: `Status: ${isPaused ? ('Resumed') : ('Paused')}`, type: 'success' }
        ]);
    };

    const startAnimation = () => {
        const initialParent = {};
        const initialRank = {};
        (originalGraph.nodes).forEach((node) => {
            initialParent[node.id] = node.id;
            initialRank[node.id] = 0;
        });

        setParent(initialParent);
        setRank(initialRank);
        setIsAnimationStarted(true);
        setIsPaused(false);
    };

    const resetState = () => {
        setIsPaused(true);
        setIsAnimationStarted(false);
        setCurrentEdgeIndex(0);
        setLogs([]);
        const initialParent = {};
        const initialRank = {};
        
        setParent(initialParent);
        setRank(initialRank);

        if (graphRef.current) {
            graphRef.current.graphData({ nodes: graph.nodes, links: [] });
        }
    }

        return {
            startAnimation,
            isAnimationStarted,
            togglePause,
            isPaused,
            resetState,
            logs,
        };


};

const find = (parent, x) => {
    if (parent[x] !== x) {
        parent[x] = find(parent, parent[x]);
    }
    return parent[x];
};

const union = (parent, rank, x, y) => {
    const rootX = find(parent, x);
    const rootY = find(parent, y);

    if (rootX !== rootY) {
        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }
};

export default useMinSpanningTree;
