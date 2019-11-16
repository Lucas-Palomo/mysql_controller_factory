import e = require("express");
import {Request, Response} from "express";
import {Connection, PoolConnection, Query} from "mysql";

export class ControllerFactory {
	
	model: Object;
	keys: Array<string>;
	
	constructor(model: Object, keys: Array<string>) {
		this.model = model;
		this.keys = keys;
	}
	
	get(conn: Connection | PoolConnection, query: string, model: Object, verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			if (model === req.body) {
				conn.connect((err) => {
					if (err) {
						res.status(500).send({
							status: 500,
							message: "Bad Connection",
							error: {
								name: err.name,
								code: err.code,
								message: err.message,
								fatal: err.fatal,
								errno: err.errno,
								fieldCount: err.fieldCount,
								stack: err.stack,
								detailed_sql: {
									sql: err.sql,
									sql_message: err.sqlMessage,
									sql_state: err.sqlState,
									sql_state_marker: err.sqlStateMarker,
								}
							},
							err: err
						})
					} else {
						conn.query(
							query,
							req.body,
							((err, results) => {
								if (err) {
									res.status(400).send({
										status: 400,
										message: "Bad Request",
										error: err
									})
								} else {
									if (verbose) {
										res.status(200).send({
											status: 200,
											result: results,
											affectedRows: results.affectedRows
										})
									} else {
										res.status(200).send(results)
									}
								}
							})
						)
					}
				});
			} else {
				res.status(406).send({
					status: 406,
					message: "Not Acceptable",
					received: req.body,
					expected: model
				})
			}
		});
	}
}
