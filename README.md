# Graph.js

Very simple graph object. It provides some basic but powerful methods for simply connecting a set of nodes into a graph that you can then do whatever you want to.

## Node(graph, index)

### .connect(alias, node)

Creates a named unidirectional edge between the node and the specified node.

### .get(alias)

Returns the node at the end of the named unidirectional edge.

## Graph(n, connector)

Constructs a graph of with n nodes. It then runs the connector through the map function if the connector is defined.

Every node is assigned the index of it's position in the node array 0 .. n.

### .get(index)

Returns the node with the provided index (assumes index is in the range of 0 .. n).

### .alias(group, alias, node?)

If the optional node is provided it first assigns the node, to the group under the specified alias, before continuing.

Returns the node at the group, alias.

### .map(procedure)

Runs the provided procedure function on each node. The procedure is passed the current graph and the node it is being run on.

### .connect(node, offsets)

Treats the 1D node array as a 2D array. Connects the node to each node found at the X, Y offset from the specified nodes X, Y. Names the connection as specified by the key from the offset definition.

Returns the graph.

**Example (Grid 2x2)**

````js
var Grid = new Graph(2 * 2, function(graph, node) {
  graph.connect(node, {
    "UP":    { y:-1, x: 0 },
    "DOWN":  { y: 1, x: 0 },
    "LEFT":  { y: 0, x:-1 },
    "RIGHT": { y: 0, x: 1 }
  });
});
````

Every node in the above example will have an UP, DOWN, LEFT, RIGHT edge. If a node existed at that offset.

## Examples

### Eight-Directional Grid and the alias function

This is a slightly more complex example, here I not only create a grid where each cell knows about it's neighbours, but I also alias each node using it's row, col as an alias.

I can now use the alias function to index by _row, col_ ...

````js
Grid.alias("TABLE", "0, 0"); // equivalent Grid.get(0);
Grid.alias("TABLE", "2, 2"); // equivalent Grid.get(8);
````

The definition of the graph.

````js
var Grid = new Graph(3 * 3, function(graph, node) {
  var x = Math.floor(node.index % Math.sqrt(graph.size));
  var y = Math.floor(node.index / Math.sqrt(graph.size));
  var alias = x.toString() + ", " + y.toString();
  graph.connect(graph.alias("TABLE", alias, node), {
    "NORTH":      { y:-1, x: 0 },
    "NORTH-EAST": { y:-1, x: 1 },
    "EAST":       { y: 0, x: 1 },
    "SOUTH-EAST": { y: 1, x: 1 },
    "SOUTH":      { y: 1, x: 0 },
    "SOUTH-WEST": { y: 1, x:-1 },
    "WEST":       { y: 0, x:-1 },
    "NORTH-WEST": { y:-1, x:-1 }
  });
});
````

### Hexagonal Grid

Even though the last two examples have focused on creating traditional grids, this is not the limit. You can create whatever kind of graph you want. Here I have created a Hexagonal grid.

````js
var HexagonalGrid = new Graph(3 * 3, function(graph, node) {
  if(Math.floor(node.index / Math.sqrt(graph.size)) % 2 == 0) {
    graph.connect(node, {
      "HEX-EAST":       { x: 1, y: 0 },
      "HEX-SOUTH-EAST": { x: 0, y: 1 },
      "HEX-SOUTH-WEST": { x:-1, y: 1 },
      "HEX-WEST":       { x:-1, y: 0 },
      "HEX-NORTH-WEST": { x:-1, y:-1 },
      "HEX-NORTH-EAST": { x: 0, y:-1 }
    });
  } else {
    graph.connect(node, {
      "HEX-EAST":       { x: 1, y: 0 },
      "HEX-SOUTH-EAST": { x: 1, y: 1 },
      "HEX-SOUTH-WEST": { x: 0, y: 1 },
      "HEX-WEST":       { x:-1, y: 0 },
      "HEX-NORTH-WEST": { x: 0, y:-1 },
      "HEX-NORTH-EAST": { x: 1, y:-1 }
    });
  }
  return graph;
});
````

## Licence

Copyright 2012 Jack Galilee

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.