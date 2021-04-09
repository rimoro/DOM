// 使用插件的写法, this指向需要搞清, 
;(function(doc) {
  var timer = null;

  var AutoReader = function(opt) {
    this.header = opt.header;
    this.topBtn = opt.topBtn;
    this.statusBtn = opt.statusBtn;
    this.speed = opt.speed || 2;
    this.interVal = opt.interVal || 20;
    this.viewportHeight = domUtils.getViewportSize(true).height;

    this.init();
  }

  AutoReader.prototype = {
    init: function() {
      this.bindEvent();
    },

    bindEvent: function() {
      var _self = this;

      domUtils.addEvent(window, 'scroll', commonFun.showBtn);
      domUtils.addEvent(window, 'resize', this.changeViewSize);
      domUtils.addEvent(this.header, 'click', commonFun.toTopClick);
      domUtils.addEvent(this.topBtn, 'click', commonFun.toTopClick);
      domUtils.addEvent(this.statusBtn, 'click', this.autoPlay.bind(_self));
    },

    autoPlay: function() {
      var _self = this;
      if (!timer) {
        timer = setInterval(function() {
          window.scrollBy(0, _self.speed);
          _isToBottom.call(_self);
        }, _self.interVal);  
      } else { //timer有的时候状态是, 图标是 pause, 需要把图标变成play
        _restoreStatus.call(_self);
      }
    },

    changeViewSize: function() {
      this.viewportHeight = domUtils.getViewportSize().height;
    }
  }

  function _isToBottom() {
    var scrollTop = domUtils.getScrollOffset().top,
        scrollSize = domUtils.getScrollSize().height,
        isToFloor = (scrollTop + this.viewportHeight) >= scrollSize;

    isToFloor 
      ? _restoreStatus.call(this)
      : this.statusBtn.className += ' pause';
    
  }

  function _restoreStatus() {
    clearInterval(timer);
    timer = null;
    this.statusBtn.className = 'lk-block J_statusBtn status-btn';
  }

  window.AutoReader = AutoReader;
})(document);