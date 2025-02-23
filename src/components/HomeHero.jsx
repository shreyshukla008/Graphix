import React from 'react'

const HomeHero = () => {
  return (
    <div className='vt323-regular flex flex-col items-start gap-2'>

        <p className='text-xl text-slate-200 text-justify'>
            <span className='text-3xl text-yellow-400'>
            Welcome to the Graphix Demo,
            </span>

            your interactive platform to explore and practice fundamental graph algorithms! Here, you’ll find a pre-declared graph ready for experimentation, allowing you to visualize and understand the implementation of various algorithms step by step. Whether you're learning graph traversal, shortest path calculations, or graph coloring, this tool provides an intuitive and hands-on experience. Select an algorithm below to start your journey into graph theory!
        </p>

        <div>
        <nav className="flex flex-col items-start space-x-4 mt-4 gap-2">
            <h2 className="text-2xl font-bold mb-2">Explore Algorithms</h2>
            <a href="#main" className="text-sky-400 hover:underline text-xl">Inspect Graph</a>
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

export default HomeHero
