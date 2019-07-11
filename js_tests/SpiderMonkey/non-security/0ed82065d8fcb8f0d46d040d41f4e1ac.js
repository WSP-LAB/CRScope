var kWasmH0 = 0;
var kWasmH1 = 0x61;
var kWasmH2 = 0x73;
var kWasmH3 = 0x6d;
var kWasmV0 = 0x1;
var kWasmV1 = 0;
var kWasmV2 = 0;
var kWasmV3 = 0;
let kImportSectionCode = 2; // Import declarations
let kGlobalSectionCode = 6; // Global declarations
let kExportSectionCode = 7; // Exports
let kWasmI32 = 0x7f;
let kExternalFunction = 0;
let kExternalGlobal = 3;
let kExprEnd = 0x0b;
let kExprGetGlobal = 0x23;
class Binary extends Array {
    emit_u8(val) {
        this.push(val);
    }
    emit_u32v(val) {
        while (true) {
            let v = val & 0xff;
                this.push(v);
                break;
        }
    }
    emit_string(string) {
        let string_utf8 = unescape(encodeURIComponent(string));
        this.emit_u32v(string_utf8.length);
        for (let i = 0; i < string_utf8.length; i++) {
            this.emit_u8(string_utf8.charCodeAt(i));
        }
    }
    emit_header() {
        this.push(kWasmH0, kWasmH1, kWasmH2, kWasmH3, kWasmV0, kWasmV1, kWasmV2, kWasmV3);
    }
    emit_section(section_code, content_generator) {
        this.emit_u8(section_code);
        let section = new Binary;
        content_generator(section);
        this.emit_u32v(section.length);
        for (var i = 0; i < section.length; i++) this.push(section[i]);
    }
}
class WasmGlobalBuilder {
    constructor(module, type, mutable) {
        this.module = module;
        this.type = type;
    }
    exportAs(name) {
        this.module.exports.push({
            kind: kExternalGlobal,
            index: this.index
        });
        return this;
    }
}
class WasmModuleBuilder {
    constructor() {
        this.imports = [];
        this.exports = [];
        this.globals = [];
        this.num_imported_globals = 0;
    }
    addGlobal(local_type, mutable) {
        let glob = new WasmGlobalBuilder(this, local_type, mutable);
        glob.index = this.globals.length + this.num_imported_globals;
        this.globals.push(glob);
        return glob;
    }
    addImportedGlobal(module = "", name, type) {
        let o = {
            module: module,
            name: name,
            kind: kExternalGlobal,
            type: type,
        }
        this.imports.push(o);
        return this.num_imported_globals++;
    }
    toArray(debug = false) {
        let binary = new Binary;
        let wasm = this;
        binary.emit_header();
        if (wasm.imports.length > 0) {
            binary.emit_section(kImportSectionCode, section => {
                section.emit_u32v(wasm.imports.length);
                for (let imp of wasm.imports) {
                    section.emit_string(imp.module);
                    section.emit_string(imp.name || '');
                    section.emit_u8(imp.kind);
                    if (imp.kind == kExternalFunction) {} else if (imp.kind == kExternalGlobal) {
                        section.emit_u32v(imp.type);
                        section.emit_u8(imp.mutable);
                    }
                }
            });
            binary.emit_section(kGlobalSectionCode, section => {
                section.emit_u32v(wasm.globals.length);
                for (let global of wasm.globals) {
                    section.emit_u8(global.type);
                    section.emit_u8(global.mutable);
                    if ((typeof global.init_index) == "undefined") {} else {
                        section.emit_u8(kExprGetGlobal);
                        section.emit_u32v(global.init_index);
                    }
                    section.emit_u8(kExprEnd); // end of init expression
                }
            });
        }
        var mem_export = (wasm.memory !== undefined && wasm.memory.exp);
        var exports_count = wasm.exports.length + (mem_export ? 1 : 0);
        if (exports_count > 0) {
            binary.emit_section(kExportSectionCode, section => {
                section.emit_u32v(exports_count);
                for (let exp of wasm.exports) {
                    section.emit_string(exp.name);
                    section.emit_u8(exp.kind);
                    section.emit_u32v(exp.index);
                }
            });
        }
        return binary;
    }
    toBuffer(debug = false) {
        let bytes = this.toArray(debug);
        let buffer = new ArrayBuffer(bytes.length);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < bytes.length; i++) {
            let val = bytes[i];
            view[i] = val | 0;
        }
        return buffer;
    }
    instantiate(ffi) {
        let module = new WebAssembly.Module(this.toBuffer());
        let instance = new WebAssembly.Instance(module, ffi);
    }
}
function TestImportedExported(type, val, expected) {
    var builder = new WasmModuleBuilder();
    var i = builder.addImportedGlobal("ttt", "foo", type);
    var o = builder.addGlobal(type, false).exportAs("bar");
    o.init_index = i;
    var instance = builder.instantiate({
        ttt: {
            foo: val
        }
    });
}
TestImportedExported(kWasmI32, 415.5, 415);