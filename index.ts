import {Mysql} from "./src/lib/mysql";
import {Pool, PoolConfig} from "mysql";
import {Generic_Controller} from "./src/lib/generic_controller";

export class GenControl {
	
	mysql: Mysql = new Mysql();
	gc: Generic_Controller = new Generic_Controller();
	
	createMysql(host: string, port: number, user: string, password: string) {
		this.mysql.config.host = host;
		this.mysql.config.port = port;
		this.mysql.config.user = user;
		this.mysql.config.password = password;
	}
	
	createCustomConfig(config: PoolConfig) {
		this.mysql.config = config;
	}
	
	createPool(): Pool {
		return this.mysql.createPool();
	}
	
	createPoolMulti(): Pool {
		return this.mysql.createPoolMulti();
	}
	
	list() {
		return this.gc.list();
	}
	
	
}


