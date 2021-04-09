var commonFun = (function(doc) {
  var oTopBtn = doc.getElementsByClassName('J_topBtn')[0];

  return {
    showBtn: function() {
      var top = domUtils.getScrollOffset().top;
      
      if (top) {
        oTopBtn.style.visibility = 'visible';
      } else {
        oTopBtn.style.visibility = 'hidden';
      }
    },

    toTopClick:function () {
      window.scroll(0, 0);
    }   
  }
  
})(document);