import e = require("express");

export class ControllerOptions {
	
	req: e.Request;
	res: e.Response;
	
	constructor(req: e.Request, res: e.Response) {
		this.req = req;
		this.res = res;
	}
	
	arraysIsEquals(expected: { order: number, property: string }[], received: string[]) {
		if (expected.length === received.length) {
			for (let i = 0; i < expected.length; i++) {
				if (received[i] !== expected[i].property) {
					return false
				}
			}
			return true;
		} else {
			return false;
		}
	}
	
	valuesIsValid(
		from:
			{
				params: { order: number, property: string }[],
				body: { order: number, property: string }[],
				query: { order: number, property: string }[],
				locals: { order: number, property: string }[]
			}): boolean {
		
		let params: boolean = false;
		let body: boolean = false;
		let query: boolean = false;
		let locals: boolean = false;
		
		
		if (this.arraysIsEquals(from.params, Object.keys(this.req.params))) {
			params = true;
		}
		if (this.arraysIsEquals(from.body, Object.keys(this.req.body))) {
			body = true;
		}
		if (this.arraysIsEquals(from.query, Object.keys(this.req.query))) {
			query = true;
		}
		if (this.arraysIsEquals(from.locals, Object.keys(this.res.locals))) {
			locals = true;
		}
		
		return locals && body && params && query;
	}
	
	formattedValues(
		from:
			{
				params: { order: number, property: string }[],
				body: { order: number, property: string }[],
				query: { order: number, property: string }[],
				locals: { order: number, property: string }[]
			}): any[] {
		
		let values: Map<number, any> = new Map<number, any>();
		
		from.params.forEach((value) => {
			values.set(value.order, this.req.params[value.property]);
		});
		from.body.forEach((value) => {
			values.set(value.order, this.req.body[value.property]);
		});
		from.query.forEach((value) => {
			values.set(value.order, this.req.query[value.property]);
		});
		from.locals.forEach((value) => {
			values.set(value.order, this.res.locals[value.property]);
		});
		
		return Array.from(values.values());
	}
	
}
