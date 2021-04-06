;(function(doc) {
  var oSwiperWrap = doc.getElementsByClassName('J_swiperWrap')[0],
      oSwiperImgList = oSwiperWrap.getElementsByClassName('J_swiperImgList')[0],
      oBtnDirBox = oSwiperWrap.getElementsByClassName('J_btnDirBox')[0],
      oIndicatorList = doc.getElementsByClassName('J_indicatorList')[0],
      oIndicatorItems = oIndicatorList.getElementsByClassName('J_indicatorDot');
  
  var oIndicatorItemLen = oIndicatorItems.length,
      imgWidth = domUtils.getStyle(oSwiperWrap, 'width', true),
      speed = 40,
      interVal = 15,
      idx = 0,
      isRun = false, //可以用timer代替isRun
      timer = null,
      posLeft = 0;
  console.log(imgWidth)

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
            restoreIdx('next');
            dirBtnInterval('next');
          }
          
          break;
        case 'prev':
          if (!timer) {
            restoreIdx('prev');
            dirBtnInterval('prev');
          }
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

  function restoreIdx(dir) {
    oIndicatorItems[idx].className = 'J_indicatorDot indicator-dot';
    posLeft = -imgWidth - idx * imgWidth;
    switch(dir) {
      case 'next':
        ++idx;
        if ( idx > 4 ) {
          idx = 0;
          posLeft = 0;
          // posLeft = -imgWidth + (idx + 1) * imgWidth; //往右移是加, 就是0
        }
        break;
      case 'prev':
        --idx;
        if (idx < 0) {
          idx = 4;
          posLeft = -imgWidth - (idx + 1) * imgWidth; //往左移是减
        }
        break;
      default:
        break;
    }
    oIndicatorItems[idx].className += ' active';
  }

  init();
})(document);