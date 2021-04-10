;(function (doc, dU) {
  var TodoList = function(nodeWrap, option) {
    // this.btnShowInput = opt.btnShowInput;
    // this.inputWrap = opt.inputWrap;
    // this.btnAddContent = opt.btnAddContent;
    // this.btnAddItem = opt.btnAddItem;
    var opt = option || {};
    this.prevConf = {
      "btnShowInput": "",
      "inputWrap": "",
      "btnAddContent": "",
      "btnAddItem": "",
      "itemList": "",
      "item": "",
      "itemContent": "",
      "itemTpl": ""
    }
    
    this.getConfig(nodeWrap);
    this.setConfig(nodeWrap, opt);
    this.init();
  }

  TodoList.prototype = {
    // xx() {}和xx: function(){}一样, 是es6的写法
    getConfig(nodeWrap) { //检查配置
      this.config = JSON.parse(nodeWrap.dataset.config);
      for(var key in this.prevConf)  {
        if (!this.config.hasOwnProperty(key) ){
          throw _errorInfo(key);
        }
      }
      console.info('配置参数检查完成, 开始设置参数!');
    }, 
    setConfig(nodeWrap, opt) {//配置属性
      var config = this.config,
          node = nodeWrap;
      this.isShowInputValue = opt.isShowInputValue || false;
      this.isShowInputWrap = opt.isShowInputWrap || true;

      this.btnShowInput = node.getElementsByClassName(config.btnShowInput)[0];
      this.inputWrap = node.getElementsByClassName(config.inputWrap)[0];
      this.btnAddContent = this.inputWrap.getElementsByClassName(config.btnAddContent)[0];
      this.btnAddItem = this.inputWrap.getElementsByClassName(config.btnAddItem)[0];
      this.itemList = node.getElementsByClassName(config.itemList)[0];
      this.items = node.getElementsByClassName(config.item);
      this.itemContents = node.getElementsByClassName(config.itemContent);
      
      // 模板文件不在node下的,而是在body最后几排 注意
      this.itemTpl = doc.getElementById(config.itemTpl).innerHTML;

      this.curIdx = -1;
      

      console.info('参数配置成功, 开始执行!');
    }, 
    init() {
      this.bindEvent();
    },
    bindEvent() {
      dU.addEvent(this.btnShowInput, 'click', this.showInput.bind(this));
      dU.addEvent(this.btnAddItem, 'click', this.clickBtnAddItem.bind(this));
      dU.addEvent(this.itemList, 'click', this.clickBtnGroup.bind(this));
    },
    showInput(isShow) {
      // var style = this.inputWrap.style;
      var defaultName = 'J_inputWrap input-wrap clearfix',
          elem = this.inputWrap;
      
      switch(isShow) {
        case true:
          elem.className += ' show';
          break;
        case false:
          elem.className = defaultName;
          break;
        default:
          if (elem.className.indexOf(true) === -1) {
            elem.className += ' show';
          } else {
            elem.className = defaultName;
          }
          _restoreAddStatus.call(this);
          break;
      }
      this.btnAddContent.focus();
      
    },
    clickBtnAddItem() {
      var inputVal = _trimSpace(this.btnAddContent.value),
          valLen = inputVal.length,
          status = this.btnAddItem.dataset.status,
          checkTrue = _isValidVal.call(this, inputVal, valLen);

      if (checkTrue) {
        switch(status) {
          case 'add':
            var elem = {
              item_content: inputVal 
            }
            this.itemList.innerHTML += _tplRepalce(this.itemTpl, _tplElemObj(elem));
            _restoreAddStatus.call(this, this.isShowInputValue);
            this.showInput(this.isShowInputWrap);
            break;
          case 'edit':
            this.itemContents[this.curIdx].innerText = inputVal;
            _restoreAddStatus.call(this, false);
            this.showInput(false);
            break;
          default:
            break;
        }
      } else {
        return;
      }
    },

    clickBtnGroup(ev) {
      var e = ev || window.event,
          tar = e.target || e.srcElement,
          className = tar.className;

      if (className.indexOf('btn-status') !== -1) {
        var status = tar.dataset.status,
            parent = tar.domNParentElem(2);
        switch(status) {
          case 'remove':
            parent.remove();
            _restoreAddStatus.call(this);
            this.showInput(false);
            break;
          case 'edit':
            this.curIdx = [].indexOf.call(this.items, parent);
            _restoreEditStatus.call(this, this.curIdx);
            this.showInput(true);
            this.btnAddContent.focus();
            break;
          default:
            break;
        }
      }
    }
  }

  function _isValidVal(value, valueLen) {
    var oItemLen = this.items.length;
    if (valueLen) {
      for(var i = 0; i < oItemLen; i++) {
        var elemValue = this.itemContents[i].innerText;
        if (elemValue.indexOf(value) !== -1) {
          // alert(`\"value'\"的内容已存在`);
          console.error(`\"${value}\" 的内容已存在 (alert太烦了,我注释了)`);
          this.btnAddContent.focus();
          // oBtnAddContent.setSelectionRange(0, valueLen);
          return false;
        }
      }
      return true;
    } else {
      // alert('请输入有效内容');
      console.error(`\"${value}\"的内容已存在 (alert太烦了,我注释了)`);
      this.btnAddContent.focus();
      return false;
    }
    return true;
  }

  function _restoreEditStatus(idx) {
    this.btnAddItem.dataset.status = 'edit';
    this.btnAddContent.value = this.items[this.curIdx].innerText;
    this.btnAddItem.innerText = '编辑第' + (idx + 1) + '项';
  }
  
  function _restoreAddStatus(isShowInputValue) {
    this.btnAddItem.dataset.status = 'add';
    !isShowInputValue && (this.btnAddContent.value = '');
    this.btnAddItem.innerText = '添加项目';

  }

  function _tplRepalce(templace, tplObj) {
    return templace.replace(/{{(.*?)}}/g, function(node, key) {
      return tplObj[key];
    })
  }

  function _tplElemObj(elem) {
    return {
      item_content: elem.item_content
    }
  }

  function _trimSpace(str) {
    return str.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
  }

  function _errorInfo(key) {
    return new Error(
      '您没有配置参数属性名: ' + key + '\n' +
      '必须配置的参数列表如下: \n' +
      '打开输入框按钮元素类名: J_btnShowInput\n' +
      '输入框外层显示盒子类名: J_inputWrap\n' ,
      '输入框内容元素类名: J_addContent\n' + 
      '增加项目按钮元素类名: J_btnAddItem\n'+
      'todoList列表元素类名: J_itemList\n' +
      'todoList的item元素类名: J_item\n'+
      'item内的文字元素类名: J_itemContent\n'+
      'todoList中item的模板: J_itemTPl\n'
    )
  }

  window.TodoList = TodoList;
})(document, domUtils);
