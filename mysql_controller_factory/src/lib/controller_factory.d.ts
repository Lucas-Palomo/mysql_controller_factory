import e = require("express");
import { Connection, PoolConnection } from "mysql";
export declare class ControllerFactory {
    private conn;
    constructor(conn: Connection | PoolConnection);
    list(query: string, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
}
