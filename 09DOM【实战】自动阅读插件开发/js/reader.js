// 点击paly和pause的逻辑不要搞反, 有点容易搞反的

;(function(doc, commonFun) {
  var oHeader = doc.getElementsByClassName('J_listHd')[0],
      oTopBtn = doc.getElementsByClassName('J_topBtn')[0],
      oStatusBtn = doc.getElementsByClassName('J_statusBtn')[0];

  var viewportHeight = domUtils.getViewportSize(true).height,
      timer = null,
      interVal = 20,
      speed = 2;

  var init = function() {
    bindEvent();
  }

  var bindEvent = function() {
    domUtils.addEvent(window, 'scroll', commonFun.showBtn);
    domUtils.addEvent(window, 'resize', changeViewSize);
    domUtils.addEvent(oHeader, 'click', commonFun.toTopClick);
    domUtils.addEvent(oTopBtn, 'click', commonFun.toTopClick);
    domUtils.addEvent(oStatusBtn, 'click', autoPlay);
  }

  function autoPlay() {
    // 状态用timer来代替
    if (!timer) {//timer没有的时候, 图标是 播放, 需要把图标变成pause, 然后播放
      timer = setInterval(function() {
        window.scrollBy(0, speed);
        isToBottom();
      }, interVal);  
    } else { //timer有的时候状态是, 图标是 pause, 需要把图标变成play
      restoreStatus();
    }
  }

  function restoreStatus() {
    oStatusBtn.className = 'lk-block J_statusBtn status-btn';
    clearInterval(timer);
    timer = null;
  }

  function isToBottom() {
    // viewportHeight = domUtils.getViewportSize().height;
    var scrollTop = domUtils.getScrollOffset().top,
        scrollSize = domUtils.getScrollSize().height,
        isToFloor = (scrollTop + viewportHeight) >= scrollSize;

    isToFloor 
      ? restoreStatus() 
      : oStatusBtn.className += ' pause';
    
  }

  function changeViewSize() {
    /*缩小时, resize会执行2次 , 放大则不会, 什么原因不知道(应该是浏览器是bug)但是可以加防抖*/
    viewportHeight = domUtils.getViewportSize().height;
  }

  init();
})(document, commonFun);