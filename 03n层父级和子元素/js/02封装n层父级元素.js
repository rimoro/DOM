Element.prototype.jyNParentElem = function(num) {
  var n = num >> 0,
      // parent = this.parentNode,
      parent = this;
  if (n <= 0 ) {
    return this;
  }

  while(n--) { 
    parent = parent.parentNode;
    if (parent.nodeType !== 1) {
      return undefined;
    }
  }

  return parent;
}

// 这个不好, 最后一层不能判断的
Element.prototype.jyNParentElem2 = function(num) {
  var n = num >> 0,
      parent = this.parentNode;
      // parent = this;
  if (n <= 0 ) {
    return this;
  }

  while(--n) { 
    if (parent.nodeType !== 1) {
      return undefined;
    }
    parent = parent.parentNode;
  }
  return parent;
}