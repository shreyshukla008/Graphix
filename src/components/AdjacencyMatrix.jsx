import React from 'react';
import useAdjacencyMatrix from '../hooks/useAdjacencyMatrix';

const AdjacencyMatrix = ({ graph }) => {
    
    const { nodes, matrices } = useAdjacencyMatrix(graph);  
    const edgeTypes = Object.keys(matrices);

    return (
        <div className="p-4 bg-gray-950 text-lime-400 overflow-auto flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-4 silkscreen-regular">Adjacency Matrices</h2>
            
            <div className='vt323-regular flex flex-wrap text-lg justify-evenly overflow-hidden w-full'>
            {edgeTypes.map((type, index) => (
                <div key={index} className="mb-6 flex flex-wrap overflow-auto">
                    
                    <div className="w-full overflow-x-auto">
                        <h2 className="text-lg font-semibold p-2 mx-auto border-dashed border-1 border-lime-300 rounded-t-lg">Type: {type}</h2>
                        <table className="border-collapse border border-dashed border-lime-300 text-lime-500 min-w-max">
                            <thead>
                                <tr>
                                    <th className="border border-dashed border-lime-300 p-2">\</th>
                                    {nodes.map((node, index) => (
                                        <th key={index} className="border border-dashed border-lime-300 p-2">{`${node.name} (${node.id})`}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {nodes.map((node, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <th className="border border-dashed border-lime-300 p-2">{`${node.name} (${node.id})`}</th>
                                        {matrices[type][rowIndex]?.map((value, colIndex) => (
                                            <td key={colIndex} className="border border-dashed border-lime-300 p-2 text-center ">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
};

export default AdjacencyMatrix;

























