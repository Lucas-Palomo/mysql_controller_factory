import e = require("express");

export class StatusFactory {
	verbose: boolean;
	private req: e.Request;
	private res: e.Response;
	
	constructor(req: e.Request, res: e.Response, verbose: boolean = false) {
		this.verbose = verbose;
		this.req = req;
		this.res = res;
	}
	
	statusDeleted(results?: any | undefined) {
		if (this.verbose && results !== undefined) {
			this.res.status(200).send({
				status: 200,
				message: "Deleted with success",
				affectedRows: results?.affectedRows
			});
		} else {
			this.res.status(200).send({
				status: 200,
				message: "Deleted with success"
			})
		}
	}
	
	status200(results: any) {
		if (this.verbose) {
			this.res.status(200).send({
				status: 200,
				message: "Success",
				response: results,
				affectedRows: results.affectedRows
			})
		} else {
			this.res.status(200).send(results)
		}
	}
	
	status201(results: any) {
		if (this.verbose) {
			this.res.status(200).send({
				status: 200,
				message: "Created with success",
				affectedRows: results.affectedRows
			})
		} else {
			this.res.status(200).send({
				status: 200,
				message: "Created with success",
			});
		}
	}
	
	status204() {
		this.res.status(204).send({
			status: 204,
			message: "No Content"
		})
	}
	
	status404() {
		this.res.status(404).send({
			status: 404,
			message: "Not Found"
		})
	}
	
	status400(err: any) {
		this.res.status(400).send({
			status: 400,
			message: "Bad Request",
			error: err
		})
	}
	
	status406(model: { params: { order: number; property: string }[]; body: { order: number; property: string }[]; query: { order: number; property: string }[]; locals: { order: number; property: string }[] }) {
		this.res.status(406).send({
			status: 406,
			message: "Not Acceptable",
			expected: model,
			received: [
				{body: this.req.body},
				{params: this.req.params},
				{query: this.req.query},
				{locals: this.res.locals}
			],
		})
	}
	
	status500(err: any) {
		if (this.verbose) {
			this.res.status(500).send({
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
				}
			})
		} else {
			this.res.status(500).send({
				status: 500,
				message: "Bad Connection",
				err: err
			});
		}
	}
}
