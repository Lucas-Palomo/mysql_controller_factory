import { Pool, PoolConfig } from "mysql";
export declare class Mysql {
    get config(): PoolConfig;
    set config(value: PoolConfig);
    private _config;
    createPool(): Pool;
    createPoolMulti(): Pool;
}
