/// <reference types="express" />
import { Mysql } from "./src/lib/mysql";
import { Pool, PoolConfig } from "mysql";
import { Generic_Controller } from "./src/lib/generic_controller";
export declare class generic_controller {
    mysql: Mysql;
    gc: Generic_Controller;
    createMysql(host: string, port: number, user: string, password: string): void;
    createCustomConfig(config: PoolConfig): void;
    createPool(): Pool;
    createPoolMulti(): Pool;
    list(): (req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, res: import("express").Response) => void;
}
