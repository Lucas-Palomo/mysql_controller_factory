import e = require("express");
import { Connection, PoolConnection } from "mysql";
export declare class ControllerFactory {
    private conn;
    constructor(conn: Connection | PoolConnection);
    list(query: string, expectedFrom: {
        params: {
            order: number;
            property: string;
        }[];
        body: {
            order: number;
            property: string;
        }[];
        query: {
            order: number;
            property: string;
        }[];
        locals: {
            order: number;
            property: string;
        }[];
    } | undefined, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
}
