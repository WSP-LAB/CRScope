var o = {0:1,1:1};
JSON.parse('[0,0]', function () {
    this[1] = o;
})
