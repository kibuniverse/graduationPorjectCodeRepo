"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genSuccess = exports.genResponse = void 0;
const types_1 = require("./types");
function genResponse({ status, message, data = {}, }) {
    return { status, message, data };
}
exports.genResponse = genResponse;
function genSuccess({ message = '', data = {}, }) {
    return genResponse({ status: types_1.ResponseStatus.Success, message, data });
}
exports.genSuccess = genSuccess;
//# sourceMappingURL=index.js.map