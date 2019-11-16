import e = require("express");
import { Pool } from "mysql";
export declare class ControllerFactory {
    private pool;
    constructor(pool: Pool);
    list(query: string, expectedFrom?: {
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
