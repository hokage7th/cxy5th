(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(['dependency'], factory);
  } else if (typeof exports === 'object' && typeof module === 'object') {
      // CommonJS
      module.exports = factory(require('dependency'));
  } else {
      // Global Variables
      root.returnExports = factory(root.dependency);
  }
}(typeof self !== 'undefined' ? self : this, function (dependency) {
  // Your code here
  var myModule = {};
  // Export or return your module
  return myModule;
}));
