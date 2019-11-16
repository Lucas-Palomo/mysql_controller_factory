import { Pool, PoolConfig } from "mysql";
export declare class MysqlFactory {
    private _poolConfig;
    constructor();
    createMysql(host: string, port: number, user: string, password: string, database: string, timezone: string): void;
    customPoolConfig(config: PoolConfig): void;
    createPool(multipleStatements?: boolean, connectionLimit?: number): Pool;
    private get poolConfig();
    private set poolConfig(value);
}
