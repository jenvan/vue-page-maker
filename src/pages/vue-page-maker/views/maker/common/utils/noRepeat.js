export function debounce(fn, wait) {
  var timer = null;
  return function () {
    var ctx = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, wait);
  }
};

export function throttle(fn, wait) {
  var last = 0;
  return function(){
    var ctx = this, args = arguments;
    var curr = +new Date();
    if (curr - last > wait){
      fn.apply(ctx, args)
      last = curr;
    }
  }
};
