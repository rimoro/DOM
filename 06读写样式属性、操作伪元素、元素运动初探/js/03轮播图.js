;(function(doc) {
  var oSwiperWrap = doc.getElementsByClassName('J_swiperWrap')[0],
      oSwiperImgList = oSwiperWrap.getElementsByClassName('J_swiperImgList')[0],
      oBtnDirBox = oSwiperWrap.getElementsByClassName('J_btnDirBox')[0],
      oIndicatorList = doc.getElementsByClassName('J_indicatorList')[0],
      oIndicatorItems = oIndicatorList.getElementsByClassName('J_indicatorDot');
  
  var oIndicatorItemLen = oIndicatorItems.length,
      imgWidth = 520,
      speed = 40,
      interVal = 15,
      idx = 0,
      isRun = false, //可以用timer代替isRun
      timer = null,
      posLeft = 0;


  var init = function() {
    bindEvent();
  }

  var bindEvent= function() {
    oIndicatorList.addEventListener('click', indicatorClick);
    oBtnDirBox.addEventListener('click', dirBtnClick);
  }

  function indicatorClick(ev) {
    var e = ev || window.event,
        tar = e.target || e.srcElement,
        className = tar.className;
      
    if (className === 'J_indicatorDot indicator-dot') {
      idx = [].indexOf.call(oIndicatorItems, tar);
      
      for(var i = 0; i < oIndicatorItemLen; i++) {
        oIndicatorItems[i].className = 'J_indicatorDot indicator-dot';
      }
      tar.className += ' active';
      // 靠, indicator的动画反而做不来了....
      // timer = setInterval(function() {

      // }, interVal);
      oSwiperImgList.style.left = -imgWidth - idx * imgWidth + 'px';
    }
  }

  function dirBtnClick(ev) {
    var e = ev || window.event,
        tar = e.target || e.srcElement,
        className = tar.className;
    
    if (className === 'J_btnClick btn-click') {
      var parent = tar.parentNode,
          parDir = parent.dataset.dir;

      switch(parDir) {
        case 'next':
          if (!timer) {
            oIndicatorItems[idx].className = 'J_indicatorDot indicator-dot';
            posLeft = -imgWidth - idx * imgWidth;
            ++idx;
            
            if (idx > 4) {
              idx = 0;
              // posLeft = idx * imgWidth - 1 * imgWidth; //就是0
              posLeft = 0; 
              dirBtnInterval('next');
            }else {
              dirBtnInterval('next');
            }
            oIndicatorItems[idx].className += ' active';
          }
          
          break;
        case 'prev':
          if (!timer) {
            oIndicatorItems[idx].className = 'J_indicatorDot indicator-dot';
            posLeft = -imgWidth - idx * imgWidth;
            --idx;
            if (idx < 0) {
              idx = 4;
              posLeft = -imgWidth - (idx + 1) * imgWidth;
              dirBtnInterval('prev');
            } else {
              dirBtnInterval('prev');
            }
          }
          oIndicatorItems[idx].className += ' active';
          break;
        default:
          break;
      }
    }   
  }

  function dirBtnInterval(dir) {
    var sp = dir === 'next' ? -speed : speed,
        count = 0;
    console.log(sp, posLeft);
    timer = setInterval(function() {
      count += speed;
      posLeft += sp;
      oSwiperImgList.style.left = posLeft + 'px';
      // posLeft是负数, -posLeft就是正的
      // if (-posLeft >= (imgWidth + idx * imgWidth)) {
      // if (-posLeft >= (imgWidth + idx * imgWidth)) {
      if (count >= imgWidth) {
        oSwiperImgList.style.left = -(imgWidth + idx * imgWidth) + 'px'
        clearInterval(timer);
        timer = null;
      }
    }, interVal);
  }

  init();
})(document);