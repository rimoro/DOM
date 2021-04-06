var domUtils = {    
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

