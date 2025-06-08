# 🧠 Graphix – Interactive Graph Algorithm Visualizer

**Graphix** (aka **Graphiti**) is a frontend-only graph algorithm visualizer built with **React** and **Redux**, designed to help users **learn and simulate graph traversal and optimization techniques**. It offers two modes—**Playground** and **Demo**—to visualize five different algorithms with step-by-step animations and console insights.

🌐 **Hosted on**: [Vercel]

---

## 📸 Screenshots

### Landing Page  
![Landing](https://via.placeholder.com/800x400.png?text=Landing+Page)

### Playground Mode (Graph Creation)  
![Playground](https://via.placeholder.com/800x400.png?text=Playground+Mode)

### Algorithm Console Output  
![Console](https://via.placeholder.com/800x400.png?text=Console+Output)

### Log Panel  
![Log Panel](https://via.placeholder.com/800x400.png?text=Log+Panel)

---

## 🎯 Features

- **Modes**:
  - 🎮 **Playground Mode**: Create custom graphs and apply any supported algorithm
  - 📘 **Demo Mode**: Visualize handpicked example graphs with preset configurations

- ⏯️ Smooth step-by-step **animations**
- 🧠 **Traversal Console** for queue/set/DSU updates
- 📝 **Log Panel** for real-time decision tracking
- 🧩 Built with a clean, responsive UI using **Tailwind CSS**
- 📦 State managed via **Redux Toolkit**

---

## 📊 Algorithms Implemented

| Algorithm               | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| **BFS**                 | Level-order graph traversal using a queue                                  |
| **DFS**                 | Depth-first graph traversal using recursion or stack                       |
| **Dijkstra’s Algorithm**| Single-source shortest path using greedy strategy and min-priority queue   |
| **Graph Coloring (4-color)** | Assign colors to nodes ensuring adjacent nodes don’t share same color |
| **Kruskal’s MST (via DSU)** | Finds the Minimum Spanning Tree using Disjoint Set Union (DSU)         |

---

## 🧭 User Flow

1. Launch the app via hosted link.
2. Choose:
   - **Playground Mode** to design your own graph.
   - **Demo Mode** to run prebuilt graph visualizations.
3. Select the algorithm from the toolbar.
4. Press **Start** to watch the algorithm animate on your graph.
5. Monitor the **console** and **log panel** for traversal details.

---

## 📂 Folder Structure
graphix/
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── GraphCanvas/
    │   ├── Controls/
    │   ├── LogPanel/
    │   ├── ConsoleLog/
    │   └── NodeEditor/
    ├── pages/
    │   ├── Home.jsx
    │   ├── Playground.jsx
    │   └── Demo.jsx
    ├── redux/
    │   ├── graphSlice.js
    │   ├── uiSlice.js
    │   └── store.js
    ├── hooks/
    │   ├── useBFS.js
    │   ├── useDFS.js
    │   ├── useDijkstra.js
    │   ├── useGraphColoring.js
    │   └── useKruskalMST.js
    ├── App.js
    └── index.js

## 🔮 Future Enhancements

- 💾 Export/import graph data as JSON
- 🎨 Add dark mode toggle
- 📚 Add algorithm-specific learning tips / tooltips
- 💡 Add support for weighted directed acyclic graphs (for Bellman-Ford, Floyd-Warshall)

## 👨‍💻 Author

**Shrey Shukla**  
_Frontend Developer • Graph Enthusiast • CS Student_  
[GitHub](https://github.com/shreyshukla) • [LinkedIn](https://linkedin.com/in/shreyshukla)