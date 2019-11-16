import e = require("express");

export class ControllerOptions {
	
	req: e.Request;
	res: e.Response;
	
	constructor(req: e.Request, res: e.Response) {
		this.req = req;
		this.res = res;
	}
	
	valuesIsValid(
		from:
			{
				params: Map<number, string>,
				body: Map<number, string>,
				query: Map<number, string>,
				locals: Map<number, string>
			}): boolean {
		
		let params: boolean = false;
		let body: boolean = false;
		let query: boolean = false;
		let locals: boolean = false;
		
		if (Array.from(from.params.values()) === Object.keys(this.req.params)) {
			params = true;
		}
		if (Array.from(from.body.values()) === Object.keys(this.req.body)) {
			body = true;
		}
		if (Array.from(from.query.values()) === Object.keys(this.req.query)) {
			query = true;
		}
		if (Array.from(from.locals.values()) === Object.keys(this.res.locals)) {
			locals = true;
		}
		
		return locals && body && params && query;
	}
	
	formattedValues(
		from:
			{
				params: Map<number, string>,
				body: Map<number, string>,
				query: Map<number, string>,
				locals: Map<number, string>
			}): any[] {
		
		let values: Map<number, any> = new Map<number, any>();
		
		from.params.forEach((value, key) => {
			values.set(key, this.req.params[value]);
		});
		from.body.forEach((value, key) => {
			values.set(key, this.req.body[value]);
		});
		from.query.forEach((value, key) => {
			values.set(key, this.req.query[value]);
		});
		from.locals.forEach((value, key) => {
			values.set(key, this.res.locals[value]);
		});
		
		return Array.from(values.values());
	}
	
}
