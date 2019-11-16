import * as mysql from 'mysql';
import {Connection, ConnectionConfig, Pool, PoolConfig} from "mysql";

export class MysqlFactory {
	
	private _poolConfig: PoolConfig | undefined;
	private _connConfig: ConnectionConfig | undefined;
	
	
	constructor() {
		this._poolConfig = {};
		this._connConfig = {};
	}
	
	createMysql(host: string, port: number, user: string, password: string, database: string, timezone: string) {
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
	
	customPoolConfig(config: PoolConfig) {
		this.poolConfig = config
	}
	
	customConnConfig(config: ConnectionConfig) {
		this.connConfig = config;
	}
	
	connection(multipleStatements?: boolean): Connection {
		if (multipleStatements) {
			let config = this.connConfig;
			config.multipleStatements = multipleStatements;
			return mysql.createConnection(config)
		}
		return mysql.createConnection(this.connConfig)
	}
	
	pool(multipleStatements?: boolean, connectionLimit?: number): Pool {
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
	
	private get connConfig(): ConnectionConfig {
		return <ConnectionConfig>this._connConfig;
	}
	
	private set connConfig(value: ConnectionConfig) {
		this._connConfig = value;
	}
}
