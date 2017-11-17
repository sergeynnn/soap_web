var getFirstKey = function(item) {
    for (var firstKey in item) break;
    return firstKey;
}

var propertyCount = function(object) {
    var count = 0;
    for(var prop in object) {
        count++;
    }
    return count;
}
