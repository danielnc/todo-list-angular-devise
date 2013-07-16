app.config(function($httpProvider) {
  $httpProvider.defaults.transformRequest.push(function(data, headersGetter) {
    var utf8_data = data;
    if (!angular.isUndefined(data)) {
      var d = angular.fromJson(data);
      d["_utf8"] = "&#9731;";
      utf8_data = angular.toJson(d);
    }
    return utf8_data;
  });
});
