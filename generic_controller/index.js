"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = require("./src/lib/mysql");
var generic_controller_1 = require("./src/lib/generic_controller");
var generic_controller = /** @class */ (function () {
    function generic_controller() {
        this.mysql = new mysql_1.Mysql();
        this.gc = new generic_controller_1.Generic_Controller();
    }
    generic_controller.prototype.createMysql = function (host, port, user, password) {
        this.mysql.config.host = host;
        this.mysql.config.port = port;
        this.mysql.config.user = user;
        this.mysql.config.password = password;
    };
    generic_controller.prototype.createCustomConfig = function (config) {
        this.mysql.config = config;
    };
    generic_controller.prototype.createPool = function () {
        return this.mysql.createPool();
    };
    generic_controller.prototype.createPoolMulti = function () {
        return this.mysql.createPoolMulti();
    };
    generic_controller.prototype.list = function () {
        return this.gc.list();
    };
    return generic_controller;
}());
exports.generic_controller = generic_controller;
//# sourceMappingURL=index.js.map