import e = require("express");
import {Pool} from "mysql";
import {StatusFactory} from "./status_factory";
import {ControllerOptions} from "./controller_options";

export class ControllerFactory {
	
	private pool: Pool;
	
	constructor(pool: Pool) {
		this.pool = pool;
	}
	
	list(
		query: string,
		expectedFrom ?:
			{
				params: { order: number, property: string }[],
				body: { order: number, property: string }[],
				query: { order: number, property: string }[],
				locals: { order: number, property: string }[]
			} | undefined,
		verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			
			this.pool.getConnection((err, connection) => {
				if (err) {
					connection.release();
					statusFactory.status500(err)
				} else {
					if (expectedFrom !== undefined) {
						let controlOptions: ControllerOptions;
						controlOptions = new ControllerOptions(req, res);
						if (!controlOptions.valuesIsValid(expectedFrom)) {
							connection.release();
							statusFactory.status406(expectedFrom);
						} else {
							connection.query(
								query,
								controlOptions.formattedValues(expectedFrom),
								((err, results) => {
									connection.release();
									if (err) {
										statusFactory.status400(err)
									} else {
										statusFactory.status200(results)
									}
								})
							);
						}
					} else {
						connection.query(
							query,
							((err, results) => {
								connection.release();
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
