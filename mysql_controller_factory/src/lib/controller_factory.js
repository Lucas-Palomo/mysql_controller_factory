"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_factory_1 = require("./status_factory");
const controller_options_1 = require("./controller_options");
class ControllerFactory {
    constructor(conn) {
        this.conn = conn;
    }
    list(query, expectedValues, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            let controlOptions;
            if (expectedValues !== undefined && expectedValues.size > 0) {
                controlOptions = new controller_options_1.ControllerOptions(expectedValues, req, res);
            }
            if (controlOptions !== undefined) {
                if (controlOptions.valuesIsValid(expectedValues)) {
                    statusFactory.status406(expectedValues);
                }
                else {
                    this.conn.connect((err) => {
                        var _a;
                        if (err) {
                            statusFactory.status500(err);
                        }
                        else {
                            this.conn.query(query, (_a = controlOptions) === null || _a === void 0 ? void 0 : _a.formattedValues(expectedValues), ((err, results) => {
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
        });
    }
}
exports.ControllerFactory = ControllerFactory;
//# sourceMappingURL=controller_factory.js.map