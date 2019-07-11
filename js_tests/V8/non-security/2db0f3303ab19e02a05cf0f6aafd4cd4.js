RangeError.prototype.__defineGetter__("name", function() { 
return 2147483647;
})
 v40 = new RangeError(); 
 v65 = new ArrayBuffer(v40); 
 v78 = v65.slice(); 
