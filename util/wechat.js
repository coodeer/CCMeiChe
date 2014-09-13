var redis = require('../redis');
var wechat = require('wechat');
var config = require('config');
var Payment = require('wechat-pay').Payment;
var API = wechat.API;
var OAuth = wechat.OAuth;

function getToken(store_key){
  return function(done){
    redis.get(store_key, function (err, token) {
      if (err) {
        return err;
      }
      try {
        token = JSON.parse(token);
      } catch (e) {
        token = null;
      }
      console.log("using token",token);
      done(null, token);
    });
  }
}

function setToken(store_key){
  return function(token, done){
    redis.set(store_key, JSON.stringify(token), done);
  }
}

var user_store_key = 'wechat-access-token-user';
var worker_store_key = 'wechat-access-token-worker';

var user_api = new API(config.wechat.user.id, config.wechat.user.secret, getToken(user_store_key), setToken(user_store_key));
var user_oauth = new OAuth(config.wechat.user.id, config.wechat.user.secret);

var pay_request = function(req, order, callback){
  var notify_url = config.wechat.user.notify_url;
  var order_id = order.id.toString();
  var total_price = order.price;
  var order_name = order.name;
  var order_attach = order.attach ? JSON.stringify(order.attach) : '';

  var package_data = {
    'body': order_name,
    'attach': order_attach,
    'out_trade_no': order_id,
    'total_fee': (total_price * 100).toString(),
    'spbill_create_ip': req.ip,
    "openid": req.user.openid,
    "trade_type": "JSAPI"
  };


  var payment = new Payment({
    partnerKey: config.wechat.user.partner_key,
    appId: config.wechat.user.id,
    mchId: config.wechat.user.mch_id,
    notifyUrl: config.wechat.user.notify_url
  });

  return payment.getBrandWCPayRequestParams(package_data, callback);
}

var worker_api = new API(config.wechat.worker.id, config.wechat.worker.secret, getToken(worker_store_key), setToken(worker_store_key));
var worker_oauth = new OAuth(config.wechat.worker.id, config.wechat.worker.secret);
var DEBUG = !!process.env.DEBUG;

function notifyProxy(service){
  return {
    sendText: function(openid, message, callback){
      var Notification = require('node-notifier');
      var notifier = new Notification();
      notifier.notify({
        title: service + ' ' + openid,
        sound: "default",
        message: message
      });
      callback(null);
    }
  }
}

exports.user = {
  pay_request: pay_request,
  api: DEBUG ? notifyProxy("user") : user_api,
  oauth: user_oauth
};

exports.worker = {
  api: DEBUG ? notifyProxy("worker") : worker_api,
  oauth: worker_oauth
};
