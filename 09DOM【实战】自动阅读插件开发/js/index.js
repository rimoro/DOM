;(function(doc, commonFun) {
  var oHeader = doc.getElementsByClassName('J_listHd')[0];

  var init = function() {
    bindEvent();
  }

  var bindEvent = function() {
    domUtils.addEvent(window, 'scroll', commonFun.showBtn);
    domUtils.addEvent(oTopBtn, 'click', commonFun.toTopClick);
    domUtils.addEvent(oHeader, 'click', commonFun.toTopClick);
  }

  init();
})(document, commonFun);
console.log(343);