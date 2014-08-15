var express = require('express');
var namespace = require('express-namespace');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var passport = require('passport');
var config = require('config');
var wechat = require('wechat');

var app = express();

require('./auth');

app.set('view engine', 'jade');
app.set('views', __dirname + '/public/jade');

app.use(session({
  store: new RedisStore(config.redis),
  secret: config.session_secret,
  cookie: { maxAge : 60 * 24 * 60 * 60 * 1000 },
  resave: true,
  unset: "destroy",
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'))
app.use(passport.initialize());
app.use(passport.session());


// global config for views
app.use(function(req,res,next){
  res.locals.config = {
    qiniu_host: config.qiniu.host
  };
  next();
});

app.use("/wechat", require("./wechat"));
app.get('/login', require("./routes/login"));
app.get('/logout', require("./routes/logout"));
app.get('/', require("./routes/index"));

app.namespace('/test', require('./test')(app));
app.namespace("/api/v1", require("./api/v1")(app));

app.use(errorHandler());

app.listen(config.get("port"), function () {
  console.log("server started at %d", config.port);
});










// create menu
var user_api = require('./util/wechat').user.api;
var user_menu = {
  "button": [{
    "type": "view",
    "name": "我要洗车",
    "url": config.host.user
  },{
    "type": "view",
    "name": "优惠活动",
    "url": config.host.user + "/promos"
  },{
    "type": "view",
    "name": "我的订单",
    "url": config.host.user + "/myorders"
  }]
};

user_api.createMenu(user_menu, function (err, data, response) {
  console.log("Menu Created", data);
});



var worker_api = require('./util/wechat').worker.api;
var worker_menu = {
  "button": [{
    "type": "click",
    "name": "上班啦",
    "key": "ON_DUTY"
  },{
    "type": "click",
    "name": "下班喽",
    "key": "OFF_DUTY"
  }]
};