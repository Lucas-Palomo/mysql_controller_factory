import e = require("express");
import { Connection, PoolConnection } from "mysql";
export declare class ControllerFactory {
    model: Object;
    keys: Array<string>;
    constructor(model: Object, keys: Array<string>);
    get(conn: Connection | PoolConnection, query: string, model: Object, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
}
