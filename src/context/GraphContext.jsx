import React, { createContext, useContext, useState } from 'react';

const initialState = {
  nodes: [],
  links:  []
};


const GraphContext = createContext();


export const GraphProvider = ({ children }) => {
  const [graphData, setGraphData] = useState(initialState);

  const addNode = (newNode) => {
    setGraphData((prevState) => {
      const isDuplicate = prevState.nodes.some((node) => node.id === newNode.id);
      if (!isDuplicate) {
        return {
          ...prevState,
          nodes: [...prevState.nodes, newNode]
        };
      }
      return prevState;
    });
  };

  const removeNode = (nodeId) => {
    setGraphData((prevState) => {
      const newNodes = prevState.nodes.filter((node) => node.id !== nodeId);
      const newLinks = prevState.links.filter((link) => link.source !== nodeId && link.target !== nodeId);
      return {
        ...prevState,
        nodes: newNodes,
        links: newLinks
      };
    });
  };

  const addEdge = (newEdge) => {
    setGraphData((prevState) => {
      const isDuplicateEdge = prevState.links.some(
        (link) => link.source === newEdge.source && link.target === newEdge.target && link.type === newEdge.type
      );
      if (!isDuplicateEdge) {
        return {
          ...prevState,
          links: [...prevState.links, newEdge]
        };
      }
      return prevState;
    });
  };

  const removeEdge = (edge) => {
    setGraphData((prevState) => {
      const { source, target, edgeType } = edge;
      const newLinks = prevState.links.filter(
        (link) => !(link.source === source && link.target === target && link.type === edgeType)
      );
      return {
        ...prevState,
        links: newLinks
      };
    });
  };

  return (
    <GraphContext.Provider value={{ graphData, setGraphData, addNode, removeNode, addEdge, removeEdge }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => useContext(GraphContext);
