var _ = require('underscore');
module.exports = function(req,res,next){
  res.render('user',{
    user: req.user,
    title: "用户查询"
  });

}