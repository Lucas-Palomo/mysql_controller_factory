import e = require("express");

export class ControllerOptions {
	
	req: e.Request;
	res: e.Response;
	
	constructor(expectedOrder: Map<string, Array<string>>, req: e.Request, res: e.Response) {
		this.req = req;
		this.res = res;
	}
	
	valuesIsValid(expectedOrder: Map<string, Array<string>> | undefined): boolean {
		
		let params: boolean = false;
		let body: boolean = false;
		let query: boolean = false;
		let locals: boolean = false;
		
		expectedOrder?.forEach((value, key) => {
			if (key.startsWith("params")) {
				if (Object.keys(this.req.params) === value) {
					params = true;
				}
			}
			if (key.startsWith("body")) {
				if (Object.keys(this.req.body) === value) {
					body = true;
				}
			}
			if (key.startsWith("query")) {
				if (Object.keys(this.req.query) === value) {
					query = true;
				}
			}
			if (key.startsWith("locals")) {
				if (Object.keys(this.res.locals) === value) {
					locals = true;
				}
			}
		});
		return locals && body && params && query;
	}
	
	formattedValues(expectedOrder: Map<string, Array<string>> | undefined): any[] {
		
		let formattedValues: any[] = [];
		
		expectedOrder?.forEach((value, key) => {
			if (key.startsWith("params")) {
				for (let i = 0; i <= value.length; i++) {
					formattedValues[i] = this.req.params[value[i]];
				}
			}
			if (key.startsWith("body")) {
				for (let i = 0; i <= value.length; i++) {
					formattedValues[i] = this.req.body[value[i]];
				}
			}
			if (key.startsWith("query")) {
				for (let i = 0; i <= value.length; i++) {
					formattedValues[i] = this.req.query[value[i]];
				}
			}
			if (key.startsWith("locals")) {
				for (let i = 0; i <= value.length; i++) {
					formattedValues[i] = this.res.locals[value[i]];
				}
			}
		});
		return formattedValues;
	}
	
}
