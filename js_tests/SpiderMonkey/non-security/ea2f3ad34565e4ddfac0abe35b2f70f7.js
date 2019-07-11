var i1 = SIMD.Int32x4();
var uint32 = TypedObject.uint32;
function fromOneDimArrayOfUint8ToUint32s() {
  var type = uint32.array(4);
  var r1 = type.from(i1, j => j*2);
}
fromOneDimArrayOfUint8ToUint32s();