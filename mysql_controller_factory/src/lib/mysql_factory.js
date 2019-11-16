"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MysqlFactory {
    constructor() {
        this._poolConfig = {};
    }
    createMysql(host, port, user, password, database, timezone) {
        this.poolConfig.host = host;
        this.poolConfig.port = port;
        this.poolConfig.user = user;
        this.poolConfig.password = password;
        this.poolConfig.database = database;
        this.poolConfig.timezone = timezone;
    }
    customPoolConfig(config) {
        this.poolConfig = config;
    }
    createPool(multipleStatements, connectionLimit) {
        if (multipleStatements || connectionLimit) {
            let config = this.poolConfig;
            config.connectionLimit = connectionLimit;
            config.multipleStatements = multipleStatements;
            return mysql.createPool(config);
        }
        return mysql.createPool(this.poolConfig);
    }
    get poolConfig() {
        return this._poolConfig;
    }
    set poolConfig(value) {
        this._poolConfig = value;
    }
}
exports.MysqlFactory = MysqlFactory;
//# sourceMappingURL=mysql_factory.js.map