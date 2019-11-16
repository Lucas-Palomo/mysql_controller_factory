export class ControllerOptions {
	
	
	private _id: string | undefined;
	private _verbose: boolean | undefined;
	private _usesOptions: usesOptions | undefined;
	private _expectedOptions: expectedOptions | undefined;
	
	
	get id(): string | undefined {
		return this._id;
	}
	
	set id(value: string | undefined) {
		this._id = value;
	}
	
	get verbose(): boolean | undefined {
		return this._verbose;
	}
	
	set verbose(value: boolean | undefined) {
		this._verbose = value;
	}
	
	get usesOptions(): usesOptions | undefined {
		return this._usesOptions;
	}
	
	set usesOptions(value: usesOptions | undefined) {
		this._usesOptions = value;
	}
	
	get expectedOptions(): expectedOptions | undefined {
		return this._expectedOptions;
	}
	
	set expectedOptions(value: expectedOptions | undefined) {
		this._expectedOptions = value;
	}
}

class expectedOptions {
	
	private _expected_params: object | undefined;
	private _expected_body: object | undefined;
	private _expected_query: object | undefined;
	
	get expected_params(): object | undefined {
		return this._expected_params;
	}
	
	set expected_params(value: object | undefined) {
		this._expected_params = value;
	}
	
	get expected_body(): object | undefined {
		return this._expected_body;
	}
	
	set expected_body(value: object | undefined) {
		this._expected_body = value;
	}
	
	get expected_query(): object | undefined {
		return this._expected_query;
	}
	
	set expected_query(value: object | undefined) {
		this._expected_query = value;
	}
}

class usesOptions {
	
	private _body: boolean | undefined;
	private _params: boolean | undefined;
	private _query: boolean | undefined;
	
	get body(): boolean | undefined {
		return this._body;
	}
	
	set body(value: boolean | undefined) {
		this._body = value;
	}
	
	get params(): boolean | undefined {
		return this._params;
	}
	
	set params(value: boolean | undefined) {
		this._params = value;
	}
	
	get query(): boolean | undefined {
		return this._query;
	}
	
	set query(value: boolean | undefined) {
		this._query = value;
	}
}
