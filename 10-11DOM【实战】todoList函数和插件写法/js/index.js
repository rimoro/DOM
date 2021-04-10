/* 模块化开发简单说明: 
单独一个功能抽象出来作为一个单独的开发个体
开发出来的东西可以和任何模块合并(自动阅读器里面的common.js), 
互相调用,使功能更丰富和复用, 不会有作用域上的影响 => 这就是模块化开发
*/
/**
 * p122+ 里面的alert被我注释了...太烦了, 打开调试工具, 用console.error了
 */
;(function(doc) {
  // dom变量是按照DOM布局从上到下来排列的, 同一行的按照从左到右, 一般
  var oBtnShowInput = doc.getElementsByClassName('J_btnShowInput')[0],
      oInputWrap = doc.getElementsByClassName('J_inputWrap')[0],
      oBtnAddContent = oInputWrap.getElementsByClassName('J_addContent')[0],
      oBtnAddItem = oInputWrap.getElementsByClassName('J_btnAddItem')[0],
      oItemList = doc.getElementsByClassName('J_itemList')[0],
      oItems = oItemList.getElementsByClassName('J_item'),
      oItemContents = oItemList.getElementsByClassName('J_itemContent'),

      oItemTpl = doc.getElementById('J_itemTpl').innerHTML;

  var clearInputValue = false, //添加后项目后,input内容是否清空
      inputShowAfterEdit = false, //编辑项目后, input框是否显示
      curIdx;

  var init = function() {
    bindEvent();
  }

  var bindEvent = function() {
    domUtils.addEvent(oBtnShowInput, 'click', showInput);
    domUtils.addEvent(oBtnAddItem, 'click', clickAddNewItem);
    domUtils.addEvent(oItemList, 'click', clickBtnStatus);
  }

  function showInput(isShow) {
    var defaultName = 'J_inputWrap input-wrap clearfix';
    // 有参数就用参数的, 没参数就用else的, 参数不填的话, isShow是事件对象(e), 所以要用true和false全等严格判断
    // 把if, else换成switch
    switch(isShow) {
      // 主动调用showInput(true/false) 不需要用_restoreAddBtnStatus(); 
      case true:
        oInputWrap.className += ' show';
        break;
      case false:
        oInputWrap.className = defaultName;
        break;
      default:
        if (oInputWrap.className.indexOf('show') === -1) {
          oInputWrap.className += ' show';
        } else {
          oInputWrap.className = defaultName;
        }
        _restoreAddBtnStatus(true);  // case里面的 true/false是主动的, 所以不需要restore, default是点击后"被动的", 所以需要restore
        break;
    }
    oBtnAddContent.focus();
  }

  function clickAddNewItem() {
    var val = oBtnAddContent.value, //其实不需要_tramSpace()
        valLen = val.length;

    // 调试的时候注释它
    if (!_checkValidVal(val, valLen)) {
      return;
    } else {
      var status = oBtnAddItem.dataset.status;
      switch(status) {
        case 'add':
          var objItem = {item_content: val};
          oItemList.innerHTML += _repalceTpl(oItemTpl, objItem);
          showInput(inputShowAfterEdit);
          break;
        case 'edit':
          oItemContents[curIdx].innerText = oBtnAddContent.value;
          
          showInput(inputShowAfterEdit); //这里用false好, 不用false第一个会被挡住, 调试的时候随便了    
          break;
        default:
          break;
      }
      
      _restoreAddBtnStatus(clearInputValue); //调试的时候不要加true
    }  
  }
  function clickBtnStatus(ev) {
    var e = ev || window.event,
        tar = e.target || e.srcElement,
        status = tar.dataset.status;

    if (status) {
      var parent = tar.domNParentElem(2);
      switch(status) {
        case 'remove':
          parent.remove();
          _restoreAddBtnStatus(true);
          showInput(false);
          break;
        case 'edit':
          var idx = [].indexOf.call(oItems, parent),
              curItem = oItemContents[idx],
              val = curItem.innerText,
              valLen = val.length;
          
          curIdx = idx;
          _changeEditBtnStatus(idx + 1, val);
          showInput(true);
          oBtnAddContent.focus();
          // oBtnAddContent.setSelectionRange(0, valLen); //选取范围, 感觉还是不加好

          // parent = 
          // parent.
          break;
      }
    }
  }

  function _checkValidVal(value, valueLen) {
    var oItemContentsLen = oItemContents.length,
        elemValue;
    // 调试的时候注释
    // if (valueLen) {
    //   for(var i = 0; i < oItemContentsLen; i++) {
    //     var elemValue = oItemContents[i].innerText;
    //     if (elemValue.indexOf(value) !== -1) {
    //       // alert(`\"value'\"的内容已存在`);
    //       console.error(`\"${value}\" 的内容已存在 (alert太烦了,我注释了)`);
    //       oBtnAddContent.focus();
    //       // oBtnAddContent.setSelectionRange(0, valueLen);
    //       return false;
    //     }
    //   }
    //   return true;
    // } else {
    //   // alert('请输入有效内容');
    //   console.error(`\"${value}\"的内容已存在 (alert太烦了,我注释了)`);
    //   oBtnAddContent.focus();
    //   return false;
    // }
    return true;
  }

  function _repalceTpl(template, item) {
    return template.replace(/{{(.*?)}}/g, function(node, key) {
      return _tplOpt(item)[key];
    })
  }

  function _tplOpt(item) {
    return {
      item_content: item.item_content
    }
  }

  function _restoreAddBtnStatus(isClearInputValue) {
    // 当参数是true的时候input清空
    isClearInputValue && (oBtnAddContent.value = ''); 
    oBtnAddItem.dataset.status = 'add';
    oBtnAddItem.innerText = '添加项目';
  }

  function _changeEditBtnStatus(num, value) {
    var n = num < 10 ? '0' + num : num;
    oBtnAddContent.value = _tramSpace(value);
    oBtnAddItem.innerText = 'Edit' + n + 'Th';
    oBtnAddItem.dataset.status = 'edit';
  }

  function _tramSpace(str) {
    return str.replace(/^\s+|s+$/g, '').replace(/\s{2,}/g,' ');
  }

  init();
})(document);