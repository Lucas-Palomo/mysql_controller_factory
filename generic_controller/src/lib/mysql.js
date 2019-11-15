"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var Mysql = /** @class */ (function () {
    function Mysql() {
    }
    Object.defineProperty(Mysql.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value;
        },
        enumerable: true,
        configurable: true
    });
    Mysql.prototype.createPool = function () {
        return mysql.createPool(this.config);
    };
    Mysql.prototype.createPoolMulti = function () {
        var multi_config = this.config;
        multi_config.multipleStatements = true;
        return mysql.createPool(multi_config);
    };
    return Mysql;
}());
exports.Mysql = Mysql;
//# sourceMappingURL=mysql.js.map