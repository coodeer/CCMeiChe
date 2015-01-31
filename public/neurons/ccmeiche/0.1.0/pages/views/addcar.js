(function(){
function mix(a,b){for(var k in b){a[k]=b[k];}return a;}
var _0 = "ccmeiche@0.1.0/pages/home.js";
var _1 = "ccmeiche@0.1.0/pages/login.js";
var _2 = "ccmeiche@0.1.0/pages/menu.js";
var _3 = "ccmeiche@0.1.0/pages/mod/autocomplete.js";
var _4 = "ccmeiche@0.1.0/pages/mod/countdown.js";
var _5 = "ccmeiche@0.1.0/pages/mod/input-clear.js";
var _6 = "ccmeiche@0.1.0/pages/mod/menu.js";
var _7 = "ccmeiche@0.1.0/pages/mod/multiselect.js";
var _8 = "ccmeiche@0.1.0/pages/mod/popmessage.js";
var _9 = "ccmeiche@0.1.0/pages/mod/popselect.js";
var _10 = "ccmeiche@0.1.0/pages/mod/singleselect.js";
var _11 = "ccmeiche@0.1.0/pages/mod/swipe-modal.js";
var _12 = "ccmeiche@0.1.0/pages/mod/uploader.js";
var _13 = "ccmeiche@0.1.0/pages/mod/wechat-uploader.js";
var _14 = "ccmeiche@0.1.0/pages/myinfos.js";
var _15 = "ccmeiche@0.1.0/pages/myorders.js";
var _16 = "ccmeiche@0.1.0/pages/order-result.js";
var _17 = "ccmeiche@0.1.0/pages/order.js";
var _18 = "ccmeiche@0.1.0/pages/promos.js";
var _19 = "ccmeiche@0.1.0/pages/recharge.js";
var _20 = "ccmeiche@0.1.0/pages/tpl/addcar.html.js";
var _21 = "ccmeiche@0.1.0/pages/tpl/agreement.html.js";
var _22 = "ccmeiche@0.1.0/pages/tpl/finishorder.html.js";
var _23 = "ccmeiche@0.1.0/pages/tpl/mixins.html.js";
var _24 = "ccmeiche@0.1.0/pages/tpl/preorder.html.js";
var _25 = "ccmeiche@0.1.0/pages/views/addcar.js";
var _26 = "ccmeiche@0.1.0/pages/views/agreement.js";
var _27 = "ccmeiche@0.1.0/pages/views/finishorder.js";
var _28 = "ccmeiche@0.1.0/pages/views/preorder.js";
var _29 = "zepto@^1.1.3";
var _30 = "uploader-mobile@~0.1.5";
var _31 = "util@^1.0.4";
var _32 = "events@^1.0.5";
var _33 = "view-swipe@~0.1.4";
var _34 = "tpl@~0.2.1";
var _35 = "hashstate@~0.1.0";
var _36 = "attributes@^1.4.1";
var _37 = "underscore@^1.6.0";
var entries = [_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_20,_21,_22,_23,_24,_25,_26,_27,_28];
var asyncDepsToMix = {};
var globalMap = asyncDepsToMix;
define(_25, [_29,_12,_3,_8,_11,_5,_20], function(require, exports, module, __filename, __dirname) {
var $ = require("zepto");
var uploader = require("../mod/uploader");
var autocomplete = require("../mod/autocomplete");
var popMessage = require("../mod/popmessage");
var swipeModal = require("../mod/swipe-modal");
var inputClear = require("../mod/input-clear");

module.exports = swipeModal.create({
  button: $(".addcar"),
  template:  require("../tpl/addcar.html"),
  show: function(data){
    var elem = this.elem;

    uploader.init(".add-photo",{
      type:"single",
      prefix:"userpic/"
    });

    elem.find(".input").each(function(){
      var input = $(this);
      autocomplete.init(input);
      var ph = input.attr("placeholder");
      input.on("focus",function(){
        if(!input.val()){
          input.attr("placeholder","");
        }
      }).on("blur",function(){
        if(!input.val()){
          input.attr("placeholder",ph);
        }
      });
    });

    if(!user.cars.length){
      elem.find(".cancel").hide();
      elem.find(".submit").css('float','none');
    }

    inputClear(elem.find(".type"));
    inputClear(elem.find(".number"));
    inputClear(elem.find(".color"));
    inputClear(elem.find(".comment"));

    if(data){
      if(data.pic){
        var img = $("<img />").attr('src',
          appConfig.qiniu_host
          + data.pic
          + "?imageView/1/w/155/h/105"
        );
        var result_elem = elem.find(".result");
        elem.find(".text").hide();
        result_elem.attr("data-key", data.pic);
        result_elem.empty().append(img);
      }

      elem.find(".type .input").val(data.type||"");
      elem.find(".number .input").val(data.number||"");
      elem.find(".color .input").val(data.color||"");
      elem.find(".comment .input").val(data.comment||"");
      elem.data("index",data.index);
    }
  },
  getData: function(){
    var elem = this.elem;
    var index = elem.data("index");
    var data = {
      type: elem.find(".type input").val().trim(),
      color: elem.find(".color input").val().trim(),
      number: elem.find(".number input").val().trim(),
      comment: elem.find(".comment input").val().trim()
    };

    var pic = elem.find(".result").attr("data-key");
    if(pic){
      data.pic = pic;
    }

    if(index !== undefined){
      data.index = index;
    }
    return data;
  },
  validate: function(data){
    if(!data.type){
      popMessage("请填写车型");
      return;
    }
    if(!data.number){
      popMessage("请填写车号");
      return;
    }
    if(!data.color){
      popMessage("请填写颜色");
      return;
    }

    // if(!/^[\u4e00-\u9fa5]{1}[A-Z0-9]{6}$/.test(data.number)){
    //   popMessage("车号格式无效");
    //   return;
    // }

    return true
  },
  submit: function(data,callback){
    $.post("/api/v1/mycars",data,"json").done(function(){
      callback(data);
    }).fail(popMessage);
  }
});
}, {
    entries:entries,
    map:mix({"../mod/uploader":_12,"../mod/autocomplete":_3,"../mod/popmessage":_8,"../mod/swipe-modal":_11,"../mod/input-clear":_5,"../tpl/addcar.html":_20},globalMap)
});

define(_12, [_29,_30,_8,_13], function(require, exports, module, __filename, __dirname) {
var $ = require('zepto');
var Uploader = require('uploader-mobile');
var popMessage = require('./popmessage');

Uploader.addAdapter("wechat", require('./wechat-uploader'));

var beforeUpload = function(prefix){
  return function(file, done){
    var uploader = this;
    $.ajax({
      url:"/api/v1/uploadtoken",
      dataType:"json",
      success:function(json){
        var fileName = json.fileName; // random file name generated
        var token = json.token;
        uploader.set('data',{
          token: token,
          key: prefix + fileName + file.ext
        });
        done();
      }
    });
  }
}

var loadImageToElem = function(key, elem, size, callback){
  var imgSrc = appConfig.qiniu_host
    + key
    + "?imageView/"
    + size.mode
    + "/w/"
    + size.width
    + (size.height ? ("/h/" + size.height) : "");
  var img = $("<img />").attr("src",imgSrc);
  if(!elem){return;}
  img.on('load',function(){
      elem.append(img);
      elem.attr("data-key",key);
      img.css("display","none");
      img.css({
        display: 'block',
        opacity: 1
      });
      callback && callback();
  });
};


function initloading(elem){
  var loading = $("<div class='loading'><div class='spin'></div></div>");
  var spin = loading.find(".spin");
  elem.append(loading);
  var i = 0;
  setInterval(function(){
    spin.css("background-position","0 " + (i%8) * 40 + "px")
    i++;
  },100);
  return loading;
}

exports.init = function(selector,options){
  var uploadTemplate = {
    template: '<li id="J_upload_item_<%=id%>" class="pic-wrapper"></li>',
    add: function(e){
      initloading(e.elem);
    },
    success: function(e){
      var elem = e.elem;
      var data = e.data;
      loadImageToElem(data.key, elem, {
        mode: 2,
        width: 260
      },function(){
        elem.find(".loading").hide();
      });
    },
    remove: function(e){
        var elem = e.elem;
        elem && elem.fadeOut();
    },
    error: function(e){
    }
  };

  var type = options.type;
  var uploader =  new Uploader(selector, {
    action:"http://up.qiniu.com",
    name:"file",
    queueTarget: options.queueTarget,
    type: window.WeixinJSBridge ? "wechat" : "ajax",
    theme: type == "single" ? null : uploadTemplate,
    beforeUpload: beforeUpload(options.prefix || ""),
    allowExtensions: ["png","jpg"],
    maxSize: "500K",
    maxItems: type == "single" ? -1 : options.maxItems
  }).on("select",function(e){
    window.log("选择文件", e.files.map(function(file){
      return file.name + " " + Math.round(file.size / 1024) + "KB";
    }).join(","),'');
  }).on("error", function(e){
    if(type == "single"){
      elem.find(".loading").hide();
      elem.find(".text").show();
    }
    popMessage("上传失败，请重试");
    e.elem.remove();
    window.onerror("上传失败",JSON.stringify({code:e.code,message:e.message}),'');
  }).on("success", function(e){
    console.log(e);
    window.log("上传成功",appConfig.qiniu_host + e.data.key,'');
  });

  var elem = $(selector);
  var result = $("<div class='result'></div>");
  if(options.type == "single"){
    initloading(elem.find(".area"));
    elem.find(".area").append(result);
    uploader.on("add",function(){
      result.empty();
      elem.find(".text").hide();
      elem.find(".result").hide();
      elem.find(".loading").show();
    }).on("success",function(e){
      loadImageToElem(e.data.key, result, {
        mode: 1,
        width: 155,
        height: 105
      }, function(){
        elem.find(".loading").hide();
        elem.find(".result").show();
      });
    });
  }else{
    uploader.on("disable",function(){
      elem.hide();
    });
  }

  return uploader;
}
}, {
    entries:entries,
    map:mix({"./popmessage":_8,"./wechat-uploader":_13},globalMap)
});

define(_3, [_29,_31,_32], function(require, exports, module, __filename, __dirname) {
var $ = require("zepto");
var util = require("util");
var events = require("events");

function Autocomplete(input, pattern, parser, getVal){
  input = $(input);
  var self = this;
  var list = $("<ul class='autocomplete' />");
  this.list = list;
  input.after(list);
  var delay = 350;
  parser = parser || function(item){return item;}
  getVal = getVal || function(item){return item;}
  var needRequest = function(value){
    return value.match(/\w{1,}/) || value.match(/[\u4e00-\u9fa5]{1,}/);
  }

  function Watcher(options){
    var interval = this.interval = options.interval;
    var getter = this.getter = options.getter;
    var oldValue = this.oldValue = getter();
  }

  util.inherits(Watcher,events);
  Watcher.prototype.start = function(){
    this.stop();
    var self = this;
    self.itv = setInterval(function(){
      var v = self.getter();
      if(v !== self.oldValue){
        self.emit("change",v,self.oldValue);
      }
      self.oldValue = v;
    },self.interval);
  };
  Watcher.prototype.stop = function(){
    var self = this;
    clearInterval(this.itv);
  };

  var watcher = this.watcher = new Watcher({
    interval: 100,
    getter: function(){
      return input.val().trim();
    }
  });

  input.on("focus",function(){
    watcher.start();
  });

  watcher.on('change', function(v){
      if(!needRequest(v)){return;}
      $.ajax({
        method: "GET",
        dataType: "json",
        url: pattern.replace("{q}",encodeURIComponent(v))
      }).done(function(data){
        if(!data.length){return;}
        list.empty();
        data.map(parser).forEach(function(item,i){
          var li = $("<li>" + item + "</li>");
          li.on("tap",function(){
            input.val(getVal(data[i]));
            self.emit("select",data[i]);
            watcher.stop();
            self.hide();
          });
          $(list).append(li);
        });
        var packup = $("<li class='packup'>收起</li>");
        packup.on("tap",function(){
          self.hide();
        });
        list.append(packup);
        self.show();
      }).fail(function(){
        console.log("failed");
      });
  });
}

util.inherits(Autocomplete, events);

Autocomplete.prototype.show = function(){
  this.list.show();
}

Autocomplete.prototype.stopWatch = function(){
  this.watcher.stop();
}

Autocomplete.prototype.hide = function(){
  this.list.hide();
}


exports.init = function(input, parser, getVal){
  var pattern = input.attr("data-pattern");
  if(!pattern){return;}
  return new Autocomplete(input, pattern, parser, getVal);
}
}, {
    entries:entries,
    map:globalMap
});

define(_8, [_29], function(require, exports, module, __filename, __dirname) {
var $ = require('zepto');
function popMessage(message, styles, notDismiss){
  var json = {}
  if(message.constructor == XMLHttpRequest){
    try{
      json = JSON.parse(message.responseText);
    }catch(e){
      json = {
        error:{
          message: message.responseText
        }
      }
    }
  }else if(typeof message == "string"){
    json = {
      error:{
        message:message
      }
    };
  }

  var text = json.error && json.error.message;

  var pop = $("<div>" + text + "</div>");
  pop.css({
    position:"fixed",
    opacity:"0",
    transition:"opacity linear .4s",
    top: "140px",
    left: "50%",
    zIndex: "30",
    padding: "10px 25px",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius:"5px",
    width: "200px"
  }).addClass("popmessage");
  pop.css(styles || {});
  pop.appendTo($("body"));
  var width = pop.width();
    // + ["padding-left","padding-right","border-left","border-right"].map(function(prop){
    //   return parseInt(pop.css(prop));
    // }).reduce(function(a,b){
    //   return a+b;
    // },0);
  pop.css({
    "margin-left": - width / 2
  });
  setTimeout(function(){
    pop.css({
      "opacity":1
    });
  });
  if(!notDismiss){
  setTimeout(function(){
    pop.css({
      "opacity":0
    });
    setTimeout(function(){
      pop.remove();
    },400);
  },2000);
  }
}

module.exports = popMessage
}, {
    entries:entries,
    map:globalMap
});

define(_11, [_31,_32,_33,_34,_35,_29], function(require, exports, module, __filename, __dirname) {
var util = require("util");
var events = require("events");
var viewSwipe = require("view-swipe");
var tpl = require("tpl");
var hashState = require('hashstate')();
var $ = require("zepto");

var i = 1;


function SwipeModal(config){
  var self = this;
  var getData = this.getData = config.getData;
  var validate = this.validate = config.validate || function(){return true};
  var button = this.button = config.button;
  this.submitting = false;
  this.config = config;
  this.name = config.name || "swipe-modal-" + i;
  this._show = config.show;
  i++;

  hashState.on('hashchange', function(e){
    if(!e.newHash){
      viewReturn();
    }
  });

  function viewReturn(){
    hashState.setHash("");
    $("body>.container,body>.wrap").css("display","block");
    $("body").css("position","fixed");
    $(".swipe-container").css("position","fixed");
    setTimeout(function(){
      $("body").css("position","");
    },300);

    viewSwipe.out("bottom");
    button.prop("disabled",false);
  }

  function viewCome(){
    var elem = self.elem;
    setTimeout(function(){
      $("body>.container,body>.wrap").css("display","none");
      $(".swipe-container").css("position","relative");
    },300);
    viewSwipe.in(elem[0],"bottom");
    button.prop("disabled",true);
  }

  self.on("show",viewCome);
  self.on("submit",viewReturn);
  self.on("cancel",viewReturn);

}

util.inherits(SwipeModal,events);
SwipeModal.prototype.santitize = function(data){
  return (this.config.santitize || function(v){return v}).bind(this)(data);
}
SwipeModal.prototype.show = function(data){
  data = this.santitize(data);
  var self = this;
  var config = this.config;
  var submit = config.submit;
  var cancel = config.cancel;
  var elem = this.elem = $(tpl.render(config.template,data));
  elem.find(".submit").on("tap",function(){
    if(self.submitting){return}
    self.submitting = true;
    var data = self.getData();
    var isValid = self.validate(data);

    if(isValid){
      if(!submit){
        self.emit("submit",data);
        self.submitting = false;
      }else{
        submit.bind(self)(data,function(result){
          self.emit("submit",result);
          self.submitting = false;
        });
      }
    }
  });

  elem.find(".cancel").on("tap", function(){
    self.emit("cancel");
  });

  hashState.setHash(this.name);
  this.emit("show");
  this._show && this._show(data);
}

exports.create = function(config){
  return new SwipeModal(config);
}
}, {
    entries:entries,
    map:globalMap
});

define(_5, [_29], function(require, exports, module, __filename, __dirname) {
$ = require('zepto');

function inputClear(wrap){
  var input = wrap.find(".input");
  var clear = $('<div class="clear" />');
  wrap.addClass('clear-input-wrap');
  clear.appendTo(wrap);
  clear.hide();

  input.on('focus', function(){
    if(input.val()){
      clear.show();
    }
  });
  input.on('keyup', function(){
    if(input.val()){
      clear.show();
    }else{
      clear.hide();
    }
  });
  clear.on('tap', function(e){
    e.preventDefault();
    input.val("");
    clear.hide();
  });
  input.on('blur', function(){
    clear.hide();
  });
}

module.exports = inputClear;
}, {
    entries:entries,
    map:globalMap
});

define(_20, [], function(require, exports, module, __filename, __dirname) {
module.exports = '<div id="addcar" class="container"><h2 class="h2">我的车辆信息</h2><ul class="upload-list"></ul><div class="add-photo"><div class="area"><div class="text"><div class="title">照片上传</div><div class="desc">含号牌的车辆照片</div></div></div><div class="camera"><img src="/img/upload.png"/></div></div><div class="row type"><input placeholder="车型" data-pattern="/api/v1/cartypes/{q}" class="input"/><i class="icon"></i></div><div class="row number"><input placeholder="号牌" class="input"/><i class="icon"></i></div><div class="row color"><input placeholder="颜色" class="input"/><i class="icon"></i></div><div class="row comment"><input placeholder="备注" class="input"/><i class="icon"></i></div><div class="row"><input type="button" value="提交" class="button submit"/><input type="button" value="取消" class="button cancel"/></div></div>'
}, {
    entries:entries,
    map:globalMap
});

define(_13, [_29,_31,_32,_36,_37], function(require, exports, module, __filename, __dirname) {
var $ = require('zepto');
var util = require('util');
var events = require('events');
var attributes = require('attributes');
var _ = require('underscore');
var uuid = 0;
module.exports = WechatUploader;

function WechatLocalFile(localId){
  this.localId = localId;
  this.name = "untitled.jpg";
  this.id = -1;
}

/**
 * @name WechatUploader
 * @class 微信方案上传
 * @constructor
 * @requires UploadType
 */
function WechatUploader(elem, config) {
  elem = $(elem);
  var self = this;

  this.files = [];
  this.set('config', config);
  elem.on('click',function(){
    if(self.get("isDisabled")){
      return false;
    }else{
      self._choose();
    }
  });
  self.on("_wxchoose", function(localIds){
    for (var i = 0; i < localIds.length; i++) {
      var file = new WechatLocalFile(localIds[0]);;
      file.id = uuid++;
      self.files.push(file);
    }

    self.emit('select', {
      files: self.files
    });
  });

  self.on("success", function(){
    self.files.shift();
  });

  setTimeout(function () {
    self.emit('load');
  });
}

util.inherits(WechatUploader, events);

WechatUploader.prototype._choose = function(){
  var self = this;
  wx.chooseImage({
    success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      self.emit("_wxchoose", localIds);
      self.upload();
    },
    fail: function(res){
      self.emit('error',JSON.stringify(res))
    }
  });
}

WechatUploader.prototype.setDisabled = function(isDisabled){
  this.set("isDisabled",isDisabled);
};

WechatUploader.prototype.setFileTypes = function(extensions) {};

WechatUploader.prototype.transfer = function(file){
  var self = this;
  var serverId = file.serverId;
  $.ajax({
    url:"/api/v1/transfer-image",
    type:"post",
    data:{
      serverId: serverId
    },
    success: function(data){
      self.emit("success", {
        file: file,
        data: data
      });
    },
    fail: function(data){
      self.emit("error", "transfer fail");
    }
  });
}

WechatUploader.prototype.upload = function (file) {

  window.onerror("UPLOADING");

  var self = this;
  var file = _.filter(this.files,function(file){
    return file.status == "waiting";
  })[0];

  var config = this.get('config');
  var data = this.get('data');
  var self = this;

  wx.uploadImage({
    localId: file.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      file.serverId = res.serverId; // 返回图片的服务器端ID
      self.transfer(file);
    },
    fail: function(res){
      self.emit('error', {
        file:file,
        message: JSON.stringify(res)
      });
    }
  });
};

WechatUploader.prototype.setData = function (data) {
  this.set('data', data);
};

attributes.patch(WechatUploader, {
  config: {
    value: {}
  },
  data: {
    value: {}
  },
  isDisabled:{
    value: false
  }
});
}, {
    entries:entries,
    map:globalMap
});
})();