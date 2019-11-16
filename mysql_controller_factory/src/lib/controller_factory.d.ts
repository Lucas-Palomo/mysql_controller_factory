import e = require("express");
import { Pool } from "mysql";
export declare class ControllerFactory {
    private pool;
    constructor(pool: Pool);
    findOne(query: string, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
    findOneWithValues(query: string, expectedFrom: {
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
    }, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
    findMany(query: string, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
    findManyWithValues(query: string, expectedFrom: {
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
    }, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
    insertOne(query: string, expectedFrom: {
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
    }, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
    deleteOne(query: string, expectedFrom: {
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
    }, verbose?: boolean): (req: e.Request<import("express-serve-static-core").ParamsDictionary>, res: e.Response) => void;
}
