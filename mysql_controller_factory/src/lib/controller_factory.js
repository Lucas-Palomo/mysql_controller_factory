"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_factory_1 = require("./status_factory");
const controller_options_1 = require("./controller_options");
class ControllerFactory {
    constructor(conn) {
        this.conn = conn;
    }
    list(query, expectedFrom, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            if (expectedFrom !== undefined) {
                let controlOptions;
                controlOptions = new controller_options_1.ControllerOptions(req, res);
                if (controlOptions.valuesIsValid(expectedFrom)) {
                    statusFactory.status406(expectedFrom);
                }
                else {
                    this.conn.connect((err) => {
                        if (err) {
                            statusFactory.status500(err);
                        }
                        else {
                            this.conn.query(query, controlOptions.formattedValues(expectedFrom), ((err, results) => {
                                if (err) {
                                    statusFactory.status400(err);
                                }
                                else {
                                    statusFactory.status200(results);
                                }
                            }));
                        }
                    });
                }
            }
            else {
                this.conn.query(query, ((err, results) => {
                    if (err) {
                        statusFactory.status400(err);
                    }
                    else {
                        statusFactory.status200(results);
                    }
                }));
            }
        });
    }
}
exports.ControllerFactory = ControllerFactory;
//# sourceMappingURL=controller_factory.js.map