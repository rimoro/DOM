Element.prototype.jyElemChildren = function(index) {
  var nodeArr = this.childNodes;
      

  if (index == undefined) {
    var nodeLen = nodeArr.length,
        elemArr = [],
        item;
    for(var i = 0; i < nodeLen; i++) {
      item = nodeArr[i];
      if (item.nodeType === 1) {
        elemArr.push(item);
      }
    }
    // elemArr.__proto__ = HTMLCollection.prototype;
    return elemArr;
  }

  var num = index >> 0;
  if (num < 0) {
    throw new Error('请输入大于等于0的数字');
  }else {
    var count = 0;
    while(nodeLen--) {
      var child = nodeArr[count];

      if (child.nodeType === 1) {
        if (num === 0) {
          return child;
        }
        // n--放if上面和下面影响很大, 放上面按照数字来算, 放下面按照下标来算
        num--;
      }
      count++;  
    }

    return undefined;
  }
}