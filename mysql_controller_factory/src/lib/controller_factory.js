"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_factory_1 = require("./status_factory");
class ControllerFactory {
    constructor(conn) {
        this.conn = conn;
    }
    list(query, verbose = false) {
        return ((req, res) => {
            const statusFactory = new status_factory_1.StatusFactory(req, res, verbose);
            this.conn.connect((err) => {
                if (err) {
                    statusFactory.status500(err);
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
        });
    }
}
exports.ControllerFactory = ControllerFactory;
//# sourceMappingURL=controller_factory.js.map