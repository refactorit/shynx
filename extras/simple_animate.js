SimpleAnimate = function(target, animationName, callback) {
  $(target).removeClass('hide');
  $(target).addClass('animated ' + animationName);
  $(target).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
}