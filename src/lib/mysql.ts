import * as mysql from 'mysql';
import {Pool, PoolConfig} from "mysql";

export class Mysql {
	
	get config(): PoolConfig {
		return <PoolConfig>this._config;
	}
	
	set config(value: PoolConfig) {
		this._config = value;
	}
	
	private _config: PoolConfig | undefined;
	
	createPool(): Pool {
		return mysql.createPool(this.config);
	}
	
	createPoolMulti(): Pool {
		const multi_config = this.config;
		multi_config.multipleStatements = true;
		return mysql.createPool(multi_config)
	}
}
