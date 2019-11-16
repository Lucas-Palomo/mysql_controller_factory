import * as mysql from 'mysql';
import {Connection, ConnectionConfig, Pool, PoolConfig, PoolConnection} from "mysql";

export class MysqlFactory {
	
	private _poolConfig: PoolConfig | undefined;
	
	
	constructor() {
		this._poolConfig = {};
	}
	
	createMysql(host: string, port: number, user: string, password: string, database: string, timezone: string) {
		this.poolConfig.host = host;
		this.poolConfig.port = port;
		this.poolConfig.user = user;
		this.poolConfig.password = password;
		this.poolConfig.database = database;
		this.poolConfig.timezone = timezone;
	}
	
	customPoolConfig(config: PoolConfig) {
		this.poolConfig = config
	}
	
	createPool(multipleStatements?: boolean, connectionLimit?: number): Pool {
		if (multipleStatements || connectionLimit) {
			let config = this.poolConfig;
			config.connectionLimit = connectionLimit;
			config.multipleStatements = multipleStatements;
			return mysql.createPool(config);
		}
		return mysql.createPool(this.poolConfig);
	}
	
	private get poolConfig(): PoolConfig {
		return <PoolConfig>this._poolConfig;
	}
	
	private set poolConfig(value: PoolConfig) {
		this._poolConfig = value;
	}
}
