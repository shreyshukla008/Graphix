import React from 'react'

const PlaygroundHero = () => {
  return (
    <div className='vt323-regular flex flex-col items-start gap-2'>

        <p className='text-xl text-slate-200 text-justify'>
            <span className='text-3xl text-yellow-400'>
            Welcome to the Graphix Playground,
            </span>

             where you can create your own graphs and experiment with different graph algorithms! Unlike the pre-defined graph in the demo section, here you have the freedom to add, remove, and modify nodes and edges to visualize how algorithms behave on different graph structures. Whether it's traversals, shortest paths, minimum spanning trees, or graph coloring, this interactive tool helps you understand their implementations in a practical way. Start building your own graph and explore the world of graph theory!
        </p>

        <div>
        <nav className="flex flex-col items-start space-x-4 mt-4 gap-2">
            <h2 className="text-2xl font-bold mb-2">Explore Algorithms</h2>
            <a href="#create" className="text-sky-400 hover:underline text-xl">Create Graph</a>
            <a href="#create" className="text-sky-400 hover:underline text-xl">Inspect Graph</a>
            <a href="#dijkstra" className="text-sky-400 hover:underline text-xl">Dijkstra</a>
            <a href="#dfs" className="text-sky-400 hover:underline text-xl">Depth First Search</a>
            <a href="#bfs" className="text-sky-400 hover:underline text-xl">Breadth First Search</a>
            <a href="#color" className="text-sky-400 hover:underline text-xl">Graph Coloring</a>
            <a href="#mst" className="text-sky-400 hover:underline text-xl">Minimun Spanning Tree</a>
        </nav>

        </div>
      
    </div>
  )
}

export default PlaygroundHero
