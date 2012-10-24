Graph.CONNECTORS = {
  FOUR_DIRECTIONAL_GRID: function(graph, node) {
    graph.connect(node, {
      "UP": { y:-1, x: 0 },
      "DOWN": { y: 1, x: 0 },
      "LEFT": { y: 0, x:-1 },
      "RIGHT": { y: 0, x: 1 }
    });
  },
  EIGHT_DIRECTIONAL_GRID: function(graph, node) {
    var x = Math.floor(node.index % Math.sqrt(graph.size));
    var y = Math.floor(node.index / Math.sqrt(graph.size));
    var alias = x.toString() + ", " + y.toString();
    graph.connect(graph.alias("TABLE", alias, node), {
      "NORTH": { y:-1, x: 0 },
      "NORTH-EAST": { y:-1, x: 1 },
      "EAST": { y: 0, x: 1 },
      "SOUTH-EAST": { y: 1, x: 1 },
      "SOUTH": { y: 1, x: 0 },
      "SOUTH-WEST": { y: 1, x:-1 },
      "WEST": { y: 0, x:-1 },
      "NORTH-WEST": { y:-1, x:-1 }
    });
  },
  HEXAGONAL_GRID: function(graph, node) {
    if(Math.floor(node.index / Math.sqrt(graph.size)) % 2 == 0) {
      graph.connect(node, {
        "HEX-EAST": { x: 1, y: 0 },
        "HEX-SOUTH-EAST": { x: 0, y: 1 },
        "HEX-SOUTH-WEST": { x:-1, y: 1 },
        "HEX-WEST": { x:-1, y: 0 },
        "HEX-NORTH-WEST": { x:-1, y:-1 },
        "HEX-NORTH-EAST": { x: 0, y:-1 }
      });
    } else {
      graph.connect(node, {
        "HEX-EAST": { x: 1, y: 0 },
        "HEX-SOUTH-EAST": { x: 1, y: 1 },
        "HEX-SOUTH-WEST": { x: 0, y: 1 },
        "HEX-WEST": { x:-1, y: 0 },
        "HEX-NORTH-WEST": { x: 0, y:-1 },
        "HEX-NORTH-EAST": { x: 1, y:-1 }
      });
    }
    return graph;
  }
}
