import { useState, useEffect } from 'react';

const useAdjacencyMatrix = (graph) => {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [matrices, setMatrices] = useState({});

    useEffect(() => {
        if (!graph || !graph.nodes || !graph.links) return;

        const prevNodeIds = new Set(nodes.map(n => n.id));
        const newNodeIds = new Set(graph.nodes.map(n => n.id));

        const removedNodeIds = [...prevNodeIds].filter(id => !newNodeIds.has(id));

        setNodes(graph.nodes); 
        setLinks(graph.links);

        setMatrices(prevMatrices => {
            const edgeTypes = [...new Set([...Object.keys(prevMatrices), ...graph.links.map(link => link.type)])];
            const nodeIds = graph.nodes.map(n => n.id); 

            const updatedMatrices = {};

            edgeTypes.forEach(type => {
                
                let matrix = Array(nodeIds.length).fill().map(() => Array(nodeIds.length).fill('∞'));

               
                prevMatrices[type]?.forEach((row, rowIndex) => {
                    const oldNodeId = [...prevNodeIds][rowIndex];
                    if (newNodeIds.has(oldNodeId)) {
                        const newRowIdx = nodeIds.indexOf(oldNodeId);
                        row.forEach((value, colIndex) => {
                            const oldColId = [...prevNodeIds][colIndex];
                            if (newNodeIds.has(oldColId)) {
                                const newColIdx = nodeIds.indexOf(oldColId);
                                matrix[newRowIdx][newColIdx] = value;
                            }
                        });
                    }
                });

               
                graph.links.forEach(link => {
                    if (link.type === type) {
                        const sourceIndex = nodeIds.indexOf(link.source);
                        const targetIndex = nodeIds.indexOf(link.target);
                        if (sourceIndex !== -1 && targetIndex !== -1) {
                            matrix[sourceIndex][targetIndex] = link.weight;
                        }
                    }
                });

                updatedMatrices[type] = matrix;
            });

            return updatedMatrices;
        });

    }, [graph]);

    return { nodes, matrices };
};

export default useAdjacencyMatrix;
