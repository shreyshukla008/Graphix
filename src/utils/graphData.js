const mainGraphData = {
        nodes: [
          { id: '1', name: 'Node 1' },
          { id: '2', name: 'Node 2' },
          { id: '3', name: 'Node 3' },
          { id: '4', name: 'Node 4' },
          { id: '5', name: 'Node 5' },

          { id: '6', name: 'Node 6' },
          { id: '7', name: 'Node 7' },
          { id: '8', name: 'Node 8' },
          { id: '9', name: 'Node 9' },
          { id: '10', name: 'Node 10' },
          { id: '11', name: 'Node 11' },
          { id: '12', name: 'Node 12' },
          { id: '13', name: 'Node 13' },
          { id: '14', name: 'Node 14' },
          { id: '15', name: 'Node 15' }
        ],
        links: [
          { source: '1', target: '2', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '2', target: '3', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '3', target: '4', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '3', target: '4', weight: 1.5, type: 'type2', color: 'yellow', curvature: 0.2, rotation: Math.PI * 2 / 3 },
          { source: '4', target: '5', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '2', target: '1', weight: 1.5, type: 'type2', color: 'yellow', curvature: 0.2, rotation: Math.PI * 2 / 3 },
          { source: '4', target: '5', weight: 1.5, type: 'type2', color: 'yellow', curvature: 0.2, rotation: Math.PI * 2 / 3 },

          { source: '6', target: '7', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '6', target: '8', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '7', target: '9', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '7', target: '11', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '8', target: '7', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '8', target: '10', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '8', target: '13', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '9', target: '11', weight: 1.5, type: 'type2', color: 'yellow', curvature: 0.2, rotation: Math.PI * 2 / 3 },
          { source: '10', target: '12', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '11', target: '12', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '11', target: '13', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '12', target: '14', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '13', target: '14', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
          { source: '14', target: '15', weight: 1.5, type: 'type1', color: 'aqua', curvature: 0.2, rotation: -Math.PI * 2 / 3 },
  
          // Parallel edges with different type, color, and curvature
          { source: '6', target: '7', weight: 1.5, type: 'type2', color: 'yellow', curvature: 0.2, rotation: Math.PI * 2 / 3 },
          { source: '8', target: '10', weight: 1.5, type: 'type2', color: 'yellow', curvature: 0.2, rotation: Math.PI * 2 / 3 },
          { source: '11', target: '12', weight: 1.5, type: 'type2', color: 'yellow', curvature: 0.2, rotation: Math.PI * 2 / 3 }
        ]
      };

export default mainGraphData;