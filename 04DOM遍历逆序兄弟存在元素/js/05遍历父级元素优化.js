Element.prototype.jyGetFullChildren22222 = function() {
  var childsArr = arguments[0] || this.childNodes ,
      childsLen = arguments[1] || childsArr.length,
      elemPool = arguments[2] || [],
      child;

  for(var i = 0; i < childsLen; i++) {
    child = childsArr[i];
    if (child.nodeType === 1) {
      var newNodes = child.childNodes,
          newLen = newNodes.length;     
      elemPool.push(child);
      child.jyGetFullChildren22222(newNodes, newLen, elemPool);
    }
  }

  return elemPool;
}