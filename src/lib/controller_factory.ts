import e = require("express");
import {Connection, PoolConnection} from "mysql";
import {StatusFactory} from "./status_factory";

export class ControllerFactory {
	
	conn: Connection | PoolConnection;
	primary_identifier: string;
	
	constructor(conn: Connection | PoolConnection, primary_identifier: string = "") {
		this.conn = conn;
		this.primary_identifier = primary_identifier
	}
	
	list(query: string, verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			this.conn.connect((err) => {
				if (err) {
					statusFactory.status500(err)
				} else {
					if (this.primary_identifier !== "") {
						this.conn.query(
							query,
							req.params[this.primary_identifier],
							((err, results) => {
								if (err) {
									statusFactory.status400(err)
								} else {
									statusFactory.status200(results)
								}
							})
						);
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
				}
			});
		});
	}
}
