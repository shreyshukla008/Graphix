function convertToAdjList(data) {
  let adjList = {};
  
  if (!data || !data.nodes || !data.links) return adjList;
  
  data.nodes.forEach(node => {
    adjList[parseInt(node.id)] = [];
  });
  
  data.links.forEach(link => {
    let source = parseInt(link.source) || parseInt(link.source.id);
    let target = parseInt(link.target) || parseInt(link.target.id);
    
    if (!adjList[source]) adjList[source] = [];
    adjList[source].push(target);
  });
  
  return adjList;
}

function convertToWeightedAdjList(data) {
  let weightedAdjList = {};
  
  if (!data || !data.nodes || !data.links) return weightedAdjList;
  
  data.nodes.forEach(node => {
    weightedAdjList[parseInt(node.id)] = [];
  });
  
  data.links.forEach(link => {
    let source = parseInt(link.source) || parseInt(link.source.id);
    let target = parseInt(link.target) || parseInt(link.target.id);
    let weight = parseInt(link.weight) || 1;
    
    if (!weightedAdjList[source]) weightedAdjList[source] = [];
    weightedAdjList[source].push({ to: target, weight });
  });
  
  return weightedAdjList;
}

function convertToOriginalGraphFormat(data) {
  if (!data || !data.nodes || !data.links) return { nodes: [], edges: [] };
  
  return {
    nodes: data.nodes.map(node => ({ id: parseInt(node.id) })),
    edges: data.links.map(link => ({
      source: parseInt(link.source.id) || parseInt(link.source),
      target: parseInt(link.target.id) || parseInt(link.target),
      weight: parseInt(link.weight) || 1
    }))
  };
}

export function getAdjacencyList(graph) {
  return convertToAdjList(graph);
}

export function getWeightedAdjacencyList(graph) {
  return convertToWeightedAdjList(graph);
}

export function getWeightedAdjList2(graph) {
  return convertToOriginalGraphFormat(graph);
}

