function Node(graph, index) {
  var _this = this;
  _this.index = index;
  _this.graph = graph;
  _this.children = {};
};

Node.prototype.connect = function(alias, node) {
  var _this = this;
  _this.children[alias] = node;
  return _this;
};

Node.prototype.get = function(alias) {
  var _this = this;
  return _this.children[alias];
};
