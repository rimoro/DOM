var domUtils = {
  /**
   * class06 
   * @param
   *  elem: 元素
   *  prop: 需要查找的属性 
   */
  getStyle: function(elem, prop, isNoPx, fakeElem) {
    if (window.getComputedStyle) {
      this.getStyle = function(elem, prop, isNoPx, fakeElem) {
        if (prop) {
          var fEl = fakeElem || null,
              elemValue = window.getComputedStyle(elem, fEl)[prop];
          var a = isNoPx ? parseFloat(elemValue) : elemValue;
          return isNoPx ? parseFloat(elemValue) : elemValue;
        } else {

          return window.getComputedStyle(elem, fEl);
        }
      }
    } else {
      this.getStyle = function(elem, prop, isNoPx) {
        if (prop) {
          var elemValue = elem.currentStyle[prop];

          return isNoPx ? parseFloat(elemValue) :elemValue;
        } else {
          return elem.currentStyle;
        }
      }
    }

    return this.getStyle(elem, prop, isNoPx, fakeElem);
  }
}

