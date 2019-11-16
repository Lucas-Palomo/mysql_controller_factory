import e = require("express");
import { Connection, PoolConnection } from "mysql";
export declare class ControllerFactory {
    conn: Connection | PoolConnection;
    primary_identifier: string | undefined;
    constructor(conn: Connection | PoolConnection, primary_identifier?: string);
    get(query: string, model: Object, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
}
