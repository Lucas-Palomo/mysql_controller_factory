import e = require("express");
import {Connection, PoolConnection} from "mysql";
import {StatusFactory} from "./status_factory";
import {ControllerOptions} from "./controller_options";

export class ControllerFactory {
	
	private conn: Connection | PoolConnection;
	
	constructor(conn: Connection | PoolConnection) {
		this.conn = conn;
	}
	
	list(query: string, verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			this.conn.connect((err) => {
				if (err) {
					statusFactory.status500(err)
				} else {
					this.conn.query(
						query,
						((err, results) => {
							if (err) {
								statusFactory.status400(err)
							} else {
								statusFactory.status200(results)
							}
						})
					);
				}
			});
		});
	}
}
