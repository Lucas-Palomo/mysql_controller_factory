import e = require("express");
import { Connection, PoolConnection } from "mysql";
export declare class ControllerFactory {
    private conn;
    constructor(conn: Connection | PoolConnection);
    list(query: string, expectedFrom: {
        params: Map<number, string>;
        body: Map<number, string>;
        query: Map<number, string>;
        locals: Map<number, string>;
    } | undefined, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
}
