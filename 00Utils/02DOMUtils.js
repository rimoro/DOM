var domUtils = {   

  /**
   * class05 查看滚动条距离
   * @param 无
   * 
   */
  getScrollOffset: function() {
    if (window.pageXOffset !== undefined) {
      this.getScrollOffset = function() {
        return {
          left: window.pageXOffset,
          top: window.pageYOffset
        }
      }
    } else {
      this.getScrollOffset = function() {
        var body = document.body,
            docElem = document.documentElement;
        return {
          left: body.scrollLeft + docElem.scrollLeft,
          top: body.scrollTop + docElem.scrollTop
        }
      }
    }

    return this.getScrollOffset();
  },

  /**
   * class05 查看浏览器可视区域
   * @param 
   *  cutScrollBarSize: 是否剪掉scroll滚动条的尺寸, 默认不剪掉
   * 不过这个一般不影响, 因为一般只有右边有, 下边面没有的, 计算viewport一般都是计算高度的
   *  
   * 
   */
    getViewportSize: function(cutScrollBarSize) {
      if (!cutScrollBarSize) {
        if (window.innerWidth) {
          this.getViewportSize = function() {
            return {
              width: window.innerWidth,
              height: window.innerHeight
            }
          }

          return this.getViewportSize();
        }else {
          console.warn('window.innerWidth属性不存在, 将使用document.body/documentElement.clientWidth/Height');
        }
      }

      if (document.compatMode === 'BackCompat'){
        this.getViewportSize = function() {
          var body = document.body;
          return {
            width: body.clientWidth,
            height: body.clientHeight
          }
        }
      }else {
        this.getViewportSize = function() {
          var docElem = document.documentElement;
          return {
            width: docElem.clientWidth,
            height: docElem.clientHeight
          }
        }
      }

      return this.getViewportSize();
    },

    /**
     * class05 浏览器全部内容的宽高
     * @param
     *  isHTML: 计算body还是html的宽高, 这两个的区别就是body不会算上它的border, margin, padding下(未bxz下)
     *  默认是用body的
     */
    getScrollSize: function(isHTML) {
      if (document.body.scrollWidth && !isHTML) {
        this.getScrollSize = function() {
          var body = document.body;
          return {
            width: body.scrollWidth,
            height: body.scrollHeight
          }
        }
      } else {
        console.warn('document.body.scrollWidth 不存在, 将用document.documentELement.scrollWidth');

        this.getScrollSize = function() {
          var docElem = document.documentElement;

          return {
            width: docElem.scrollWidth,
            height: docElem.scrollHeight
          }
        }
      }
      return this.getScrollSize();
    },

  /**
   * class06 
   * @param
   *  1. elem: 元素
   *  2. prop: 需要查找的属性 
   *  3. isNoPx 是否需要去除单位
   *  4. fakeElem: 查看伪元素的,伪元素必须填对,且有才能正常访问,null或不填是不访问伪元素(自己封装不能不填)
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
  },
  /************class07 ********************/
  /** class07 绑定事件处理函数
   * @param
   *1. el: 元素
   *2. type: 类型
   *3. fn: 事件处理函数
   *4. isCaputre: 冒泡还是捕获, false是冒泡, true是捕获
   */
  addEvent: function(el, type, fn, isCapture) {
    if (el.addEventListener) {
      this.addEvent = function(el, type, fn, isCapture) {
        el.addEventListener(type, fn, isCapture);
      }
    }else if (el.attachEvent) {
      this.addEvent = function(el, type, fn) {
        el.attachEvent('on' + type, fn);
      }
    }else {
      this.addEvent = function(el, type, fn) {
        el['on' + type] = fn;
        addEvent.detach = function(el, type, fn) {
          el['on' + type] = null;
        }
      }
    }
    this.addEvent(el, type, fn, isCapture);
  },
  /** class07 解除事件处理函数
   * @param
   *1. el: 要解除绑定的元素
   *2. type: 类型
   *3. fn: 事件处理函数
   *4. isCapture: 捕获还是冒泡
   */
  delEvent: function(el, type, fn, isCapture) {
    if (el.removeEventListener) {
      this.delEvent = function(el, type, fn, isCapture) {
        el.removeEventListener(type, fn, isCapture || false);
      }
    } else if (el.detachEvent) {
      this.delEvent = function(el, type, fn) {
        el.detachEvent('on' + type, fn);
      }
    } else {
      this.delEvent = function(el, type, fn) {
        el['on' + type] = fn;
      }
    }

    this.delEvent(el, type, fn, isCapture);
  },
  /** 取消冒泡
   * @param
   * ev: 事件对象
   */
  cancelBubble: function (ev) {
    var e = ev || window.event; 
    //上面这个获取的e一般由外面传进来, 所以这条可以不写, 
   //  不过还是写上把...反正也是多传一步 || 后面的也不会执行, 而且如果前面不写的话, 直接写cancelBubble的话, 这条救命的
   // 这样写更加严谨
   if (e.stopPropagation) {
     this.cancelBubble = function(ev) {
       // var e = ev;
       ev.stopPropagation();
     }
   } else {
     this.cancelBubble = function() {
       // var e = window.event; 
       // e.cancelBubble = true;
       window.event.cancelBubble = true;
     }
   }
   this.cancelBubble(ev);
 },
/**class07 取消默认事件
 * @param:
 * 1. ev: 事件对象
 */
  preDefEv:function (ev) {
    var e = ev || window.event;
    if (e.preventDefault) {
      this.preDefEv = function(ev) {

        ev.preventDefault();
      }
    } else if (e.returnValue) {
      this.preDefEv = function() {
        // var e = window.event;
        // e.returnValue = false;
        window.event.returnValue = false;
      }
    } else {
      console.warn('版本太低, 只能自己手动在绑定的函数里面" return false" ')
    }
    this.preDefEv(e);
  }

}

var ElementPrototypeFun = (function() {
  /**
   * class02 原型上封装children
   * 目的:  遍历出此元素中下标为index的子元素
   * @param
   *  1. index: 输入大于等于0的下标
   * 
   *
   * */  
   Element.prototype.domElemChildren = function(index) {
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

  /**
   * class02 原型上封装n层父级元素
   * 目的: 拿到此元素的n层父级元素
   * @param
   *  1. num: 第num层父级元素, 若不满足, 直接返回本身
   * 
   */
   Element.prototype.domNParentElem = function(num) {
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
})();