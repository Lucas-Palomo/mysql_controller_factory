import { Connection, ConnectionConfig, Pool, PoolConfig } from "mysql";
export declare class MysqlFactory {
    private _poolConfig;
    private _connConfig;
    createMysql(host: string, port: number, user: string, password: string, timezone: string): void;
    customPoolConfig(config: PoolConfig): void;
    customConnConfig(config: ConnectionConfig): void;
    connection(multipleStatements?: boolean): Connection;
    pool(multipleStatements?: boolean, connectionLimit?: number): Pool;
    get poolConfig(): PoolConfig;
    set poolConfig(value: PoolConfig);
    get connConfig(): ConnectionConfig;
    set connConfig(value: ConnectionConfig);
}
