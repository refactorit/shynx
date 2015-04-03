SimpleAnimate = function(target, animationName, callback) {
  $(target).addClass('animated ' + animationName);
  $(target).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
}