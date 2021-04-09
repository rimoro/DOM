/* 模块化开发简单说明: 
单独一个功能抽象出来作为一个单独的开发个体
开发出来的东西可以和任何模块合并(自动阅读器里面的common.js), 
互相调用,使功能更丰富和复用, 不会有作用域上的影响 => 这就是模块化开发
*/
;(function(doc) {
  var oBtnShowInput = doc.getElementsByClassName('J_btnShowInput')[0],
      oInputWrap = doc.getElementsByClassName('J_inputWrap')[0],
      oBtnAddItem = doc.getElementsByClassName('J_btnAddItem')[0],
      oBtnAddContent = doc.getElementsByClassName('J_addContent')[0];

  var init = function() {
    bindEvent();
  }

  var bindEvent = function() {
    domUtils.addEvent(oBtnShowInput, 'click', showInput);
    domUtils.addEvent(document, 'click', test);
  }

  function showInput() {
    var cName = 'J_inputWrap input-wrap clearfix';
    
    // if (oInputWrap.style.visibility === 'hidden') { //这个必须是内联设置, 才有, 所以要用=== 'visible'
    if (oInputWrap.className.indexOf('show') === -1) {
      oInputWrap.className += ' show';
    } else {
      oInputWrap.className = cName;
    }
  }

  function test(e) {
    console.log(e.target);
  }





  init();
})(document);