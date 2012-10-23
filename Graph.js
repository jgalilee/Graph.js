function Graph(size, connector) {
  var _this = this;
  _this.aliases = {};
  _this.nodes = [];
  _this.size = 0;
  for(var index = 0; index < size; index++) {
    _this.nodes[index] = new Node(_this, index);
    _this.alias("NODES", index.toString(), _this.nodes[index]);
    _this.size++;
  }
  if(undefined !== connector) {
    _this.map(connector);
  }
  return _this;
}

Graph.prototype.map = function(procedure) {
  var _this = this;
  for (var key in _this.nodes) {
    procedure(_this, _this.nodes[key]);
  };
  return _this;
}

Graph.prototype.plot = function(node, directions) {
  var _this = this;
  var width = Math.sqrt(_this.size);
  for(var key in directions) {
    var x = directions[key].x + Math.floor(node.index % width);
    var y = directions[key].y + Math.floor(node.index / width);
    var index = (x + y * width);
    if(x >= 0 && y >= 0 && x < width && y < width) {
      node.connect(key, _this.get(index));
    };
  };
  return _this;
}

Graph.prototype.alias = function(group, name, node) {
  var _this = this;
  if(undefined !== node) {
    if(undefined === _this.aliases[group]) {
      _this.aliases[group] = {};
    }
    _this.aliases[group][name] = node;
  }
  return _this.aliases[group][name];
}

Graph.prototype.get = function(index) {
  var _this = this;
  return _this.nodes[index];
}
