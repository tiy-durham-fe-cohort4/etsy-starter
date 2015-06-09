function unescapeStr(str) {
  return decodeURIComponent((str || '').replace(/\+/g, ' '));
}

module.exports = function (str) {
  return (str || '').split('&').map(function (k) { 
    return k.split('='); 
  }).reduce(function (obj, pairs) {
    obj[pairs[0]] = unescapeStr(pairs[1]);
    return obj;
  }, {});
};