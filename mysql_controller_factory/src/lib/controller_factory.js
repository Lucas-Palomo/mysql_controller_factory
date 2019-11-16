"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_factory_1 = require("./status_factory");
const controller_options_1 = require("./controller_options");
class ControllerFactory {
    constructor(pool) {
        this.pool = pool;
    }
    findOne(query, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            this.pool.getConnection((err, connection) => {
                if (err) {
                    statusFactory.status500(err);
                }
                else {
                    connection.query(query, ((err, results) => {
                        connection.release();
                        if (err) {
                            statusFactory.status400(err);
                        }
                        else {
                            if (results.length > 0) {
                                statusFactory.status200(results[0]);
                            }
                            else {
                                statusFactory.status404();
                            }
                        }
                    }));
                }
            });
        });
    }
    findOneWithValues(query, expectedFrom, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            let controlOptions = new controller_options_1.ControllerOptions(req, res);
            if (!controlOptions.valuesIsValid(expectedFrom)) {
                statusFactory.status406(expectedFrom);
            }
            else {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        statusFactory.status500(err);
                    }
                    else {
                        connection.query(query, controlOptions.formattedValues(expectedFrom), ((err, results) => {
                            connection.release();
                            if (err) {
                                statusFactory.status400(err);
                            }
                            else {
                                if (results.length > 0) {
                                    statusFactory.status200(results[0]);
                                }
                                else {
                                    statusFactory.status404();
                                }
                            }
                        }));
                    }
                });
            }
        });
    }
    findMany(query, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            this.pool.getConnection((err, connection) => {
                if (err) {
                    statusFactory.status500(err);
                }
                else {
                    connection.query(query, ((err, results) => {
                        connection.release();
                        if (err) {
                            statusFactory.status400(err);
                        }
                        else {
                            if (results.length > 0) {
                                statusFactory.status200(results);
                            }
                            else {
                                statusFactory.status204();
                            }
                        }
                    }));
                }
            });
        });
    }
    findManyWithValues(query, expectedFrom, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            let controlOptions = new controller_options_1.ControllerOptions(req, res);
            if (!controlOptions.valuesIsValid(expectedFrom)) {
                statusFactory.status406(expectedFrom);
            }
            else {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        statusFactory.status500(err);
                    }
                    else {
                        connection.query(query, controlOptions.formattedValues(expectedFrom), ((err, results) => {
                            connection.release();
                            if (err) {
                                statusFactory.status400(err);
                            }
                            else {
                                if (results.length > 0) {
                                    statusFactory.status200(results);
                                }
                                else {
                                    statusFactory.status204();
                                }
                            }
                        }));
                    }
                });
            }
        });
    }
    insertOne(query, expectedFrom, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            let controlOptions = new controller_options_1.ControllerOptions(req, res);
            if (!controlOptions.valuesIsValid(expectedFrom)) {
                statusFactory.status406(expectedFrom);
            }
            else {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        statusFactory.status500(err);
                    }
                    else {
                        connection.query(query, controlOptions.formattedValues(expectedFrom), ((err, results) => {
                            if (err) {
                                statusFactory.status400(err);
                            }
                            else {
                                statusFactory.status201(results);
                            }
                        }));
                    }
                });
            }
        });
    }
    deleteOne(query, expectedFrom, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            let controlOptions = new controller_options_1.ControllerOptions(req, res);
            if (!controlOptions.valuesIsValid(expectedFrom)) {
                statusFactory.status406(expectedFrom);
            }
            else {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        statusFactory.status500(err);
                    }
                    else {
                        connection.query(query, controlOptions.formattedValues(expectedFrom), ((err, results) => {
                            if (err) {
                                statusFactory.status400(err);
                            }
                            else {
                                statusFactory.statusDeleted(results);
                            }
                        }));
                    }
                });
            }
        });
    }
}
exports.ControllerFactory = ControllerFactory;
//# sourceMappingURL=controller_factory.js.map