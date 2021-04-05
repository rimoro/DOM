;(function (doc) {
  var oDropDown = doc.getElementsByClassName('dropdown')[0],
      oList = doc.getElementsByClassName('list')[0],
      oDropIcon = doc.getElementsByClassName('icon-drop')[0];

  var t = null,
      interVal = 20,
      speed = 10,
      maxHeight = 150;

  var init = function() {
    bindEvent();
  }

  var bindEvent = function() {
    oDropDown.onmouseenter = dropEnter;
    oDropDown.onmouseleave = dropLeave;
  }

  function dropEnter() {
    oDropIcon.className = 'icon-drop fa fa-angle-down';
    clearInterval(t);
    t = setInterval(setDir.bind(null, 'down'), interVal);
    
  }

  function dropLeave() {
    oDropIcon.className = 'icon-drop fa fa-angle-up';

    clearInterval(t);
    t = setInterval(setDir.bind(null, 'up'), interVal);
  }

  function setDir(dir) {
    var len;
    switch(dir) {
      case 'down':
        len = domUtils.getStyle(oList, 'height', true) + speed;
        if (len <= maxHeight) {
          oList.style.height = len + 'px';
        } else {
          clearInterval(t);
        }
        break;
      case 'up':
        len = domUtils.getStyle(oList, 'height', true) - speed;
         if (len >= 0) {
          oList.style.height = len + 'px';
         } else {
          clearInterval(t);
         }
        break;
      default: 
        break;
    }   
  }


  init();
})(document);