import { useState } from "react";

export default function Instructions() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const instructions = [
    { title: "Start Button", description: "Click to begin the algorithm execution. The steps will be visualized dynamically, and logs will appear in the console panel." },
    { title: "Pause Button", description: "Click to temporarily stop the algorithm execution. The visualizer will freeze until resumed." },
    { title: "Resume Button", description: "Click to continue execution from the paused step. The visualization and logs will update accordingly." },
    { title: "Reset Button", description: "Click to clear execution and restart. The graph and console panel will reset." },
    { title: "Console Panel", description: "Logs each step of the algorithm execution, providing insights into the algorithm's internal process." },
    { title: "3D Graph Visualizer", description: "Dynamically displays the graph and algorithm execution in a 3D space with animated transitions." },
  ];

  return (
    <div className="my-6 p-4 border-r-2 border-y-2 rounded-lg  border-lime-600  shadow-md shadow-lime-600 bg-slate-950 w-full">
      <button
        className="flex gap-2 text-xl justify-between w-full cursor-pointer"
        onClick={toggleExpand}
      >
        <p>Instructions</p> 
        <p>{expanded ? <i className="icon-close text-red-700"></i> : <i className="icon-plus text-lime-600"></i>}</p>
      </button>
      {expanded && (
        <dl className="mt-2 border-lime-500 flex flex-col items-start">
          {instructions.map((item, index) => (
            <div key={index} className="flex gap-4 p-2 border-t-1  border-lime-500 w-full">
              <dt className=" text-gray-300 text-sm">{item.title}</dt>
              <dd className="text-gray-400 text-sm">{item.description}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
