import e = require("express");
import {Connection, PoolConnection} from "mysql";
import {StatusFactory} from "./status_factory";
import {ControllerOptions} from "./controller_options";

export class ControllerFactory {
	
	private conn: Connection | PoolConnection;
	
	constructor(conn: Connection | PoolConnection) {
		this.conn = conn;
	}
	
	list(
		query: string,
		expectedFrom:
			{
				params: Map<number, string>,
				body: Map<number, string>,
				query: Map<number, string>,
				locals: Map<number, string>
			} | undefined,
		verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			if (expectedFrom !== undefined) {
				let controlOptions: ControllerOptions;
				controlOptions = new ControllerOptions(req, res);
				if (!controlOptions.valuesIsValid(expectedFrom)) {
					statusFactory.status406(expectedFrom);
				} else {
					this.conn.connect((err) => {
						if (err) {
							statusFactory.status500(err)
						} else {
							this.conn.query(
								query,
								controlOptions.formattedValues(expectedFrom),
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
				}
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
	}
}
