(function(){
function mix(a,b){for(var k in b){a[k]=b[k];}return a;}
var _0 = "ccmeiche@0.1.0/pages/addcar.js";
var _1 = "ccmeiche@0.1.0/pages/finishorder.js";
var _2 = "ccmeiche@0.1.0/pages/home.js";
var _3 = "ccmeiche@0.1.0/pages/login.js";
var _4 = "ccmeiche@0.1.0/pages/mod/autocomplete.js";
var _5 = "ccmeiche@0.1.0/pages/mod/countdown.js";
var _6 = "ccmeiche@0.1.0/pages/mod/singleselect.js";
var _7 = "ccmeiche@0.1.0/pages/mod/uploader.js";
var _8 = "ccmeiche@0.1.0/pages/myinfos.js";
var _9 = "ccmeiche@0.1.0/pages/myorders.js";
var _10 = "ccmeiche@0.1.0/pages/order.js";
var _11 = "ccmeiche@0.1.0/pages/preorder.js";
var _12 = "ccmeiche@0.1.0/pages/recharge.js";
var _13 = "ccmeiche@0.1.0/pages/tpl/addcar.html.js";
var _14 = "ccmeiche@0.1.0/pages/tpl/finishorder.html.js";
var _15 = "ccmeiche@0.1.0/pages/tpl/mixins.html.js";
var _16 = "ccmeiche@0.1.0/pages/tpl/preorder.html.js";
var _17 = "zepto@^1.1.3";
var _18 = "events@^1.0.5";
var _19 = "util@^1.0.4";
var _20 = "tpl@~0.2.1";
var _21 = "view-swipe@~0.1.4";
var entries = [_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16];
var asyncDepsToMix = {};
var globalMap = asyncDepsToMix;
define(_1, [_17,_18,_19,_20,_21,_14,_6], function(require, exports, module, __filename, __dirname) {
var $ = require("zepto");
var template = require("./tpl/finishorder.html");
var events = require("events");
var util = require("util");
var tpl = require("tpl");
var viewSwipe = require("view-swipe");
var singleSelect = require("./mod/singleselect");

function FinishOrder(){

}

util.inherits(FinishOrder,events);

FinishOrder.prototype.show = function(data){
  var html = tpl.render(template,data);
  var elem = $(html);
  var self = this;
  viewSwipe.in(elem[0],"bottom");

  elem.find(".submit").on("touchend", function(){
    self.confirm();
  });

  elem.find(".cancel").on("touchend", function(){
    viewSwipe.out("bottom");
  });

  singleSelect(".car-broke");

  return this;
}

FinishOrder.prototype.confirm = function(data){
  viewSwipe.out("bottom");
  this.emit("confirm");
}

module.exports = new FinishOrder();
}, {
    entries:entries,
    map:mix({"./tpl/finishorder.html":_14,"./mod/singleselect":_6},globalMap)
});

define(_14, [], function(require, exports, module, __filename, __dirname) {
module.exports = '<div id="finishorder" class="container"><h2 class="h2">洗车已完成</h2><div class="add-photo"><div class="area"><div class="text"><div class="title">照片上传</div><div class="desc">含号牌的车辆照片</div></div></div><div class="camera"><img src="/img/upload.png"/></div></div><h2 class="h2">车损部位</h2><ul class="car-brokes"><li class="car-broke car-broke-1">1</li><li class="car-broke car-broke-2">2</li><li class="car-broke car-broke-3">3</li><li class="car-broke car-broke-4">4</li><li class="car-broke car-broke-5">5</li><li class="car-broke car-broke-6">6</li><li class="car-broke car-broke-7">7</li><li class="car-broke car-broke-8">8</li><li class="car-broke car-broke-9">9</li><li class="car-broke car-broke-10">10</li></ul><div class="add-photo"><div class="area"><div class="text"><div class="title">照片上传</div><div class="desc">含号牌的车辆照片</div></div></div><div class="camera"><img src="/img/upload.png"/></div></div><input type="button" value="完成" class="button"/></div>'
}, {
    entries:entries,
    map:globalMap
});

define(_6, [_17,_18,_19], function(require, exports, module, __filename, __dirname) {
var $ = require("zepto");
var events = require("events");
var util = require("util");

function SingleSelect(selector){
  var self = this;
  (function(){
    var current = null;
    var items = self.items = $(selector);
    items.on("touchend",function(){
      var me = $(this);
      if(me == current){
        me.removeClass("active");
        current = null;
      }else{
        current && current.removeClass("active");
        me.addClass("active");
        current = me;
      }
      self.emit("change",this);
    });
  })();
  return this;
}

util.inherits(SingleSelect,events);

SingleSelect.prototype.select = function(index){
  this.items.eq(index).trigger("touchend");
}

module.exports = function(selector){
  return new SingleSelect(selector);
}
}, {
    entries:entries,
    map:globalMap
});
})();