const kNumProperties = 100;

let o = {};
for (let i = 0; i < kNumProperties; ++i)
    o['a' + i] = i;

Object.preventExtensions(o);  // IsNotExtensibleSupported && !this->VerifyIsExtensible

for (let i = 0; i < kNumProperties; ++i)
    delete o['a' + i];

for (let i = 0; i < 0x1000; ++i)
    o['a0'] = 1;  // calling TryUndeleteProperty again again

