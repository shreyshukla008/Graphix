import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from '3d-force-graph';
import AdjacencyMatrix from './AdjacencyMatrix';
import { useGraph } from '../context/GraphContext';

const Graph3D = () => {
    
    const graphRef = useRef();

      const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    
      useEffect(() => {
        const handleResize = () => {
          const parentElement = document.getElementById('graph-container');
          if (parentElement) {
            setContainerDimensions({
              width: parentElement.offsetWidth,
            });
          }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const { graphData, setGraphData, addNode, removeNode, addEdge, removeEdge } = useGraph();
    setGraphData(graphData);


    const [newNode, setNewNode] = useState({
        id: '',
        name: '',
    });
    
    const [newEdge, setNewEdge] = useState({
        source: '',
        target: '',
        edgeWeight: '',
        edgeType: '',
    });
    const [nodeToDelete, setNodeToDelete] = useState('');
    const [edgeToDelete, setEdgeToDelete] = useState({ source: '', target: '', edgeType: '' });

    useEffect(() => {
        const Graph = ForceGraph3D()(graphRef.current)
            .graphData(graphData)
            .linkCurvature('curvature')
            .linkCurveRotation('rotation')
            .linkDirectionalParticles(2)
            .nodeLabel(node => `${node.name}`)
            .linkLabel(link => `Weight: ${link.weight}, Type: ${link.type}`)
            .linkWidth(1)
            .linkColor(link => link.color)
            .nodeAutoColorBy('id')
            .linkDirectionalArrowLength(3.5)
            .linkDirectionalArrowRelPos(1)
            .backgroundColor('#020618');

        Graph.graphData(graphData);

        const controls = Graph.controls();
      controls.noZoom = true;   


    if (containerDimensions) {
        Graph.width(containerDimensions.width).height(containerDimensions.height);
    }

    }, [graphData,containerDimensions]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNode(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddNode = () => {
        const { id, name } = newNode;
    
  
        if (!id || !name) {
            alert('Please provide both Node ID and Name!');
            return;
        }
    

        const isDuplicate = graphData.nodes.some(node => node.id === id);
        if (isDuplicate) {
            alert(`Node with ID "${id}" already exists!`);
            return;
        }

        const newNodeData = { id, name };
    

        setGraphData(prevData => ({
            ...prevData,
            nodes: [...prevData.nodes, newNodeData],
        }));
    

        setNewNode({ id: '', name: '' });
    };

    const handleAddEdge = () => {
        const { source, target, edgeWeight, edgeType } = newEdge;
        const sourceNode = graphData.nodes.find(node => node.id === source);
        const targetNode = graphData.nodes.find(node => node.id === target);
    
        if (!sourceNode || !targetNode ) {
            alert('Both source and target nodes must exist!');
            return;
        }
    
        const isDuplicateEdge = graphData.links.some(
            link => link.source === source && link.target === target && link.type === edgeType
        );
    
        if (isDuplicateEdge) {
            alert(`Edge between "${source}" and "${target}" of type :  "${edgeType}" already exists!`);
            return;
        }
    
        const edgeProperties = edgeType === 'type1'
            ? { color: 'green', curvature: 0.2, rotation: -Math.PI * 2 / 3 }
            : { color: 'red', curvature: 0.2, rotation: Math.PI * 2 / 3 };
    
        const newEdgeData = {
            source,
            target,
            weight: parseFloat(edgeWeight) || 1, // Default weight to 1 if not provided
            type: edgeType || 'type1', // Default type to 'type1'
            ...edgeProperties,
        };
    
        setGraphData(prevData => ({
            ...prevData,
            links: [...prevData.links, newEdgeData],
        }));
    
        setNewEdge({ source: '', target: '', edgeWeight: '', edgeType: '' });
    };
    

    

    const handleDeleteNode = () => {

        const nodeId = nodeToDelete.trim();
        if (!nodeId) {
            alert('Please enter a node ID to delete!');
            return;
        }
        const updatedLinks = graphData.links.filter(link => {
            return !(link.source.id === nodeId || link.target.id === nodeId);
        });

        const updatedNodes = graphData.nodes.filter(node => node.id !== nodeId);
        setGraphData({
            nodes: updatedNodes,
            links: updatedLinks
        });
                setNodeToDelete('');
    };

    const handleDeleteEdge = () => {
        const { source, target, edgeType } = edgeToDelete;
        if (!source || !target || !edgeType) {
            alert('Please enter source, target, and edge type to delete!');
            return;
        }

        const updatedLinks = graphData.links.filter(link => 
        {
            return !(link.source.id == source && link.target.id == target && link.type == edgeType)
                    &&
                    !(link.target.id == source && link.source.id == target && link.type == edgeType);

        }
        );

        setGraphData(prevData => ({ ...prevData, links: updatedLinks }));
        setEdgeToDelete({ source: '', target: '', edgeType: '' });
    };

    return (

        <div id='create' className='flex flex-col bg-slate-950 gap-14 vt323-regular'>

            
             <div className='bg-slate-950 border-2 border-dashed border-lime-500 rounded-xl p-4 flex flex-col gap-6'>

                    <div >
                        <h2 className='flex justify-start silkscreen-regular text-4xl text-lime-400'>CONTROL PANEL</h2>
                    </div>

                    <div className='flex flex-wrap justify-between rounded-lg border-2 border-dashed border-lime-500 items-center p-2 w-full'>

                        <div className='text-2xl text-lime-400 w-[15%] border-r-2 border-dashed border-lime-500'>
                            <h3>Add New Node</h3>
                        </div>

                        <div className='flex justify-between gap-2 px-4 w-[75%]'>

                            <div className='flex justify-between gap-2 items-center text-lg w-[48%]'>
                                <label htmlFor="id" className='text-lime-400 w-[20%]'>Node Id: </label>
                                <input
                                    className='bg-gray-800 rounded-sm w-[80%]'
                                    type="text"
                                    name="id"
                                    placeholder="Node ID"
                                    value={newNode.id}
                                    onChange={handleInputChange}
                                    style={{ marginRight: '5px', padding: '5px' }}
                                />
                            </div>

                            <div className='flex justify-between gap-2 items-center text-lg w-[48%]'>
                                <label htmlFor="name" className='text-lime-400 w-[20%]'>Node Name:</label>
                                <input
                                    className='bg-gray-800 rounded-sm w-[80%]'
                                    type="text"
                                    name="name"
                                    placeholder="Node Name"
                                    value={newNode.name}
                                    onChange={handleInputChange}
                                    style={{ marginRight: '5px', padding: '5px' }}
                                />
                            </div>

                        </div>


                        <div className='flex gap-2 items-center justify-center text-lg rounded-sm bg-lime-600 hover:bg-lime-900 p-1 w-[10%] cursor-pointer'>
                            <button onClick={handleAddNode} className='cursor-pointer'>
                                Add Node
                            </button>
                        </div>
                    </div>
             

                    <div className='flex flex-wrap justify-between rounded-lg border-2 border-dashed border-lime-500 items-center p-2  w-full'>  
                            <div className='text-2xl text-lime-400 w-[15%] border-r-2 border-dashed border-lime-500'>
                                <h3>Add New Edge</h3>
                            </div>

                            <div className='flex justify-between gap-2 px-4 w-[75%]'>
                                <div className='flex gap-2 items-center text-lg rounded-sm bg-slate-800 w-[25%]'>
                                    <select
                                    name="source"
                                    className='bg-slate-800 rounded-sm  text-lime-400 w-full'
                                    value={newEdge.source}
                                    onChange={(e) => setNewEdge({ ...newEdge, source: e.target.value })}
                                    style={{ marginRight: '5px', padding: '5px' }}
                                >
                                    <option value="">Select Source Node</option>
                                    {graphData.nodes.map(node => (
                                        <option key={node.id} value={node.id}>
                                            {node.name}
                                        </option>
                                    ))}
                                </select>
                                </div>

                                <div className='flex gap-2 items-center text-lg rounded-sm bg-slate-800 w-[25%]'>
                                        <select
                                        name="target"
                                        className='bg-slate-800 rounded-sm  text-lime-400 w-full'
                                        value={newEdge.target}
                                        onChange={(e) => setNewEdge({ ...newEdge, target: e.target.value })}
                                        style={{ marginRight: '5px', padding: '5px' }}
                                    >
                                        <option value="">Select Target Node</option>
                                        {graphData.nodes.map(node => (
                                            <option key={node.id} value={node.id}>
                                                {node.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='flex gap-2 items-center text-lg w-[25%]'>
                                    <input
                                        type="number"
                                        className='bg-gray-800 rounded-sm w-full'
                                        name="edgeWeight"
                                        placeholder="Edge Weight (Optional)"
                                        value={newEdge.edgeWeight}
                                        onChange={(e) => setNewEdge({ ...newEdge, edgeWeight: e.target.value })}
                                        style={{ marginRight: '5px', padding: '5px' }}
                                    />

                                </div>

                                <div className='flex gap-2 items-center text-lg  rounded-sm bg-slate-800 w-[25%]'>
                                    <select
                                        name="edgeType"
                                        className='bg-slate-800 rounded-sm  text-lime-400 w-[98%]'
                                        value={newEdge.edgeType}
                                        onChange={(e) => setNewEdge({ ...newEdge, edgeType: e.target.value })}
                                        style={{ marginRight: '5px', padding: '5px' }}
                                    >
                                        <option value="">Select Edge Type (Optional)</option>
                                        <option value="type1">Type 1 (Green)</option>
                                        <option value="type2">Type 2 (Red)</option>
                                    </select>

                                </div>
                            </div>
                                    
                            <div className='flex gap-2 items-center justify-center text-lg rounded-sm bg-lime-600 hover:bg-lime-900 p-1 w-[10%] cursor-pointer'>

                                <button onClick={handleAddEdge} className='cursor-pointer'>
                                    Add Edge
                                </button>
                            </div>
                    </div>

               
                    <div className='flex flex-wrap justify-between rounded-lg border-2 border-dashed border-lime-500 items-center p-2  w-full'>  
                            <div className='text-2xl text-lime-400 w-[15%] border-r-2 border-dashed border-lime-500'>
                                <h3>Delete Node</h3>
                            </div>

                            <div className='flex justify-evenly px-4 w-[75%]'>
                                <div className='flex gap-2 items-center text-lg w-full'>
                                    <label htmlFor="del-node" className='text-lime-400 w-[30%]'>Node Id: </label>
                                    <input
                                        className='bg-slate-800 rounded-sm w-[40%]'
                                        name="del-node"
                                        type="text"
                                        placeholder="Node ID "
                                        value={nodeToDelete}
                                        onChange={(e) => setNodeToDelete(e.target.value)}
                                        style={{ marginRight: '5px', padding: '5px' }}
                                    />
                                </div>
                            </div>

                            <div className='flex gap-2 items-center justify-center text-lg rounded-sm bg-lime-600 hover:bg-lime-900 p-1 w-[10%] cursor-pointer'>
                                <button onClick={handleDeleteNode} className='cursor-pointer'>
                                    Delete Node
                                </button>
                            </div>

                    </div>

               
                    <div className='flex flex-wrap justify-between rounded-lg border-2 border-dashed border-lime-500 items-center p-2  w-full'>  
                            <div className='text-2xl text-lime-400 w-[15%] border-r-2 border-dashed border-lime-500'>
                                <h3>Delete Edge</h3>
                            </div>

                            <div className='flex justify-evenly px-4 gap-4 w-[75%]'>
                                <div className='flex gap-2 items-center text-lg w-[35%]'>
                                    <label htmlFor="source-node" className='text-lime-400'>Source Node:</label>
                                    <input
                                        name='source-node'
                                        type="text"
                                        placeholder="Source Node ID"
                                        className='bg-slate-800 rounded-sm w-[60%]'
                                        value={edgeToDelete.source}
                                        onChange={(e) => setEdgeToDelete({ ...edgeToDelete, source: e.target.value })}
                                        style={{ marginRight: '5px', padding: '5px' }}
                                    />
                                </div>

                                <div className='flex gap-2 items-center text-lg w-[35%]'>
                                    <label htmlFor="target-node" className='text-lime-400'>Target Node:</label>
                                    <input
                                        type="text"
                                        name="target-node"
                                        className='bg-slate-800 rounded-sm w-[60%]'
                                        placeholder="Target Node ID"
                                        value={edgeToDelete.target}
                                        onChange={(e) => setEdgeToDelete({ ...edgeToDelete, target: e.target.value })}
                                        style={{ marginRight: '5px', padding: '5px' }}
                                    />
                                </div>

                                <div className='flex gap-2 items-center text-lg rounded-sm bg-slate-800 w-[30%]'>
                                        <select
                                            name="edgeType"
                                            className='bg-slate-800 rounded-sm text-lime-400 w-full'
                                            value={edgeToDelete.edgeType}
                                            onChange={(e) => setEdgeToDelete({ ...edgeToDelete, edgeType: e.target.value })}
                                            style={{ marginRight: '5px', padding: '5px' }}
                                        >
                                            <option value="">Select Edge Type</option>
                                            <option value="type1">Type 1 (Green)</option>
                                            <option value="type2">Type 2 (Red)</option>
                                        </select>
                                </div>
                            </div>

                            <div className='w-[10%] flex gap-2 items-center justify-center text-lg rounded-sm bg-lime-600 hover:bg-lime-900 p-1 cursor-pointer'>
                                <button onClick={handleDeleteEdge} className='cursor-pointer'>
                                    Delete Edge
                                </button>
                            </div>
                    </div>

            </div>

            <div id='graph-container' className='border-2 border-lime-600 drop-shadow-[0_30px_30px_rgba(0,200,0,0.15)] h-[600px] rounded-2xl overflow-hidden'>
                <div className='flex justify-start border-b-2 border-lime-600'>
                    <h3 className='bg-slate-600 w-full text-start silkscreen-regular text-lime-500 text-4xl font-bold p-4'>
                    VISUALIZER
                    </h3>
                </div>
                <div  ref={graphRef} className='overflow-hidden w-[100%] h-[600px]' />
            </div>

            <AdjacencyMatrix graph={graphData}></AdjacencyMatrix>
        </div>
    );
};

export default Graph3D;
