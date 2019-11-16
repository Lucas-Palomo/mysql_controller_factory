import { Connection, ConnectionConfig, Pool, PoolConfig } from "mysql";
export declare class MysqlFactory {
    private _poolConfig;
    private _connConfig;
    constructor();
    createMysql(host: string, port: number, user: string, password: string, database: string, timezone: string): void;
    customPoolConfig(config: PoolConfig): void;
    customConnConfig(config: ConnectionConfig): void;
    connection(multipleStatements?: boolean): Connection;
    pool(multipleStatements?: boolean, connectionLimit?: number): Pool;
    private get poolConfig();
    private set poolConfig(value);
    private get connConfig();
    private set connConfig(value);
}
