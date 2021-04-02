;(function(doc) {
  var oTabItems = doc.getElementsByClassName('J_tabItem'),
      oPageItems = doc.getElementsByClassName('J_pageItem'),

      oTabItemsLen = oTabItems.length;

  
  var init = function() {
    bindEvent();
  }

  var bindEvent = function() {
    bindTabItemClick();
  }

  function bindTabItemClick () {
    for(var i = 0; i < oTabItemsLen; i++) {
      (function(j) {
        oTabItems[j].onclick = function() {
          for(var k = 0; k < oTabItemsLen; k++) {
            oTabItems[k].className = 'J_tabItem tab-item';
            oPageItems[k].className = 'J_pageItem page-item';
          }
          
          this.className = 'J_tabItem tab-item active';
          oPageItems[j].className = 'J_pageItem page-item cur';
        }
      })(i);
    }
  }

  init();
})(document);