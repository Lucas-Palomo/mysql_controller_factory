import e = require("express");
import {Pool} from "mysql";
import {StatusFactory} from "./status_factory";
import {ControllerOptions} from "./controller_options";

export class ControllerFactory {
	
	private pool: Pool;
	
	constructor(pool: Pool) {
		this.pool = pool;
	}
	
	findOne(query: string, verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			this.pool.getConnection((err, connection) => {
				if (err) {
					statusFactory.status500(err)
				} else {
					connection.query(
						query,
						((err, results) => {
							connection.release();
							if (err) {
								statusFactory.status400(err)
							} else {
								if (results.length > 0) {
									statusFactory.status200(results[0])
								} else {
									statusFactory.status404()
								}
							}
						}))
				}
			});
		});
	}
	
	findOneWithValues(
		query: string,
		expectedFrom:
			{
				params: { order: number, property: string }[],
				body: { order: number, property: string }[],
				query: { order: number, property: string }[],
				locals: { order: number, property: string }[]
			},
		verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			let controlOptions: ControllerOptions = new ControllerOptions(req, res);
			if (!controlOptions.valuesIsValid(expectedFrom)) {
				statusFactory.status406(expectedFrom);
			} else {
				this.pool.getConnection((err, connection) => {
					if (err) {
						statusFactory.status500(err)
					} else {
						connection.query(
							query,
							controlOptions.formattedValues(expectedFrom),
							((err, results) => {
								connection.release();
								if (err) {
									statusFactory.status400(err)
								} else {
									if (results.length > 0) {
										statusFactory.status200(results[0])
									} else {
										statusFactory.status404()
									}
								}
							})
						);
					}
				});
			}
		});
	}
	
	findMany(query: string, verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			this.pool.getConnection((err, connection) => {
				if (err) {
					statusFactory.status500(err)
				} else {
					connection.query(
						query,
						((err, results) => {
							connection.release();
							if (err) {
								statusFactory.status400(err)
							} else {
								if (results.length > 0) {
									statusFactory.status200(results)
								} else {
									statusFactory.status204()
								}
							}
						}))
				}
			});
		});
	}
	
	findManyWithValues(
		query: string,
		expectedFrom:
			{
				params: { order: number, property: string }[],
				body: { order: number, property: string }[],
				query: { order: number, property: string }[],
				locals: { order: number, property: string }[]
			},
		verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			let controlOptions: ControllerOptions = new ControllerOptions(req, res);
			if (!controlOptions.valuesIsValid(expectedFrom)) {
				statusFactory.status406(expectedFrom);
			} else {
				this.pool.getConnection((err, connection) => {
					if (err) {
						statusFactory.status500(err)
					} else {
						connection.query(
							query,
							controlOptions.formattedValues(expectedFrom),
							((err, results) => {
								connection.release();
								if (err) {
									statusFactory.status400(err)
								} else {
									if (results.length > 0) {
										statusFactory.status200(results)
									} else {
										statusFactory.status204()
									}
								}
							})
						);
					}
				});
			}
		});
	}
	
	insertOne(query: string,
	          expectedFrom:
		          {
			          params: { order: number, property: string }[],
			          body: { order: number, property: string }[],
			          query: { order: number, property: string }[],
			          locals: { order: number, property: string }[]
		          },
	          verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			let controlOptions: ControllerOptions = new ControllerOptions(req, res);
			if (!controlOptions.valuesIsValid(expectedFrom)) {
				statusFactory.status406(expectedFrom);
			} else {
				this.pool.getConnection((err, connection) => {
					if (err) {
						statusFactory.status500(err);
					} else {
						connection.query(
							query,
							controlOptions.formattedValues(expectedFrom),
							((err, results) => {
								if (err) {
									statusFactory.status400(err);
								} else {
									statusFactory.status201(results);
								}
							})
						);
					}
				})
			}
		});
	}
	
	deleteOne(query: string,
	          expectedFrom:
		          {
			          params: { order: number, property: string }[],
			          body: { order: number, property: string }[],
			          query: { order: number, property: string }[],
			          locals: { order: number, property: string }[]
		          },
	          verbose: boolean = false) {
		return ((req: e.Request, res: e.Response) => {
			const statusFactory = new StatusFactory(req, res, verbose);
			let controlOptions: ControllerOptions = new ControllerOptions(req, res);
			if (!controlOptions.valuesIsValid(expectedFrom)) {
				statusFactory.status406(expectedFrom);
			} else {
				this.pool.getConnection((err, connection) => {
					if (err) {
						statusFactory.status500(err);
					} else {
						connection.query(
							query,
							controlOptions.formattedValues(expectedFrom),
							((err, results) => {
								if (err) {
									statusFactory.status400(err);
								} else {
									statusFactory.statusDeleted(results);
								}
							})
						);
					}
				})
			}
		});
	}
}
