;(function(doc) {

  var oSliderItems = doc.getElementsByClassName('J_sliderItem'),
      oThumbsItems = doc.getElementsByClassName('J_thumbsItem'),
      oThumbsLen = oThumbsItems.length;

  var init = function() {
    bindEvent();
  }

  var bindEvent = function() {
    bindThumbsClick();
    
  }

  function bindThumbsClick() {  
    // 第一个个for, 绑定事件处理函数
    // 第二个for, 循环所有绑定对象
    // 等到事件代理那章再用新方法
    for(var i = 0; i < oThumbsLen; i++ ) {
      (function (j){
        oThumbsItems[j].addEventListener('click', function() {
          for(var k = 0; k < oThumbsLen; k++) {
            oSliderItems[k].className = 'J_sliderItem slider-item';
            oThumbsItems[k].className = 'J_thumbsItem thumbs-item';
          }

          this.className += ' active';
          oSliderItems[j].className += ' current';
        });
      })(i);
    }
  }

  // function thumbsClick() {
  //   for(var i = 0; i < oThumbsLen; i++) {
  //     oSliderItems[i] = 
  //   }
  // }

  init();
})(document);