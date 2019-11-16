"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MysqlFactory {
    constructor(poolConfig, connConfig) {
        this._poolConfig = poolConfig;
        this._connConfig = connConfig;
    }
    createMysql(host, port, user, password, database, timezone) {
        this.connConfig.host = host;
        this.poolConfig.host = host;
        this.connConfig.port = port;
        this.poolConfig.port = port;
        this.connConfig.user = user;
        this.poolConfig.user = user;
        this.connConfig.password = password;
        this.poolConfig.password = password;
        this.connConfig.database = database;
        this.poolConfig.database = database;
        this.connConfig.timezone = timezone;
        this.poolConfig.timezone = timezone;
    }
    customPoolConfig(config) {
        this.poolConfig = config;
    }
    customConnConfig(config) {
        this.connConfig = config;
    }
    connection(multipleStatements) {
        if (multipleStatements) {
            let config = this.connConfig;
            config.multipleStatements = multipleStatements;
            return mysql.createConnection(config);
        }
        return mysql.createConnection(this.connConfig);
    }
    pool(multipleStatements, connectionLimit) {
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
    get connConfig() {
        return this._connConfig;
    }
    set connConfig(value) {
        this._connConfig = value;
    }
}
exports.MysqlFactory = MysqlFactory;
//# sourceMappingURL=mysql_factory.js.map