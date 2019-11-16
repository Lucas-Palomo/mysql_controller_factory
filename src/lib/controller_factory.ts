import e = require("express");
import {Connection, PoolConnection} from "mysql";
import {StatusFactory} from "./status_factory";
import {ControllerOptions} from "./controller_options";

export class ControllerFactory {
	
	private conn: Connection | PoolConnection;
	
	constructor(conn: Connection | PoolConnection) {
		this.conn = conn;
	}
	
	list(query: string, expectedValues?: Map<string, Array<string>> | undefined, verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			let controlOptions: ControllerOptions | undefined;
			if (expectedValues !== undefined && expectedValues.size > 0) {
				controlOptions = new ControllerOptions(expectedValues, req, res);
			}
			if (controlOptions !== undefined) {
				if (controlOptions.valuesIsValid(expectedValues)) {
					statusFactory.status406(expectedValues);
				} else {
					this.conn.connect((err) => {
						if (err) {
							statusFactory.status500(err)
						} else {
							this.conn.query(
								query,
								controlOptions?.formattedValues(expectedValues),
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
		});
	}
}
