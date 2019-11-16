"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_factory_1 = require("./status_factory");
const controller_options_1 = require("./controller_options");
class ControllerFactory {
    constructor(pool) {
        this.pool = pool;
    }
    list(query, expectedFrom, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            this.pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    statusFactory.status500(err);
                }
                else {
                    if (expectedFrom !== undefined) {
                        let controlOptions;
                        controlOptions = new controller_options_1.ControllerOptions(req, res);
                        if (!controlOptions.valuesIsValid(expectedFrom)) {
                            connection.release();
                            statusFactory.status406(expectedFrom);
                        }
                        else {
                            connection.query(query, controlOptions.formattedValues(expectedFrom), ((err, results) => {
                                connection.release();
                                if (err) {
                                    statusFactory.status400(err);
                                }
                                else {
                                    statusFactory.status200(results);
                                }
                            }));
                        }
                    }
                    else {
                        connection.query(query, ((err, results) => {
                            connection.release();
                            if (err) {
                                statusFactory.status400(err);
                            }
                            else {
                                statusFactory.status200(results);
                            }
                        }));
                    }
                }
            });
        });
    }
}
exports.ControllerFactory = ControllerFactory;
//# sourceMappingURL=controller_factory.js.map