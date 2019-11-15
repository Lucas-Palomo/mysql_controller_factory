"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generic_Controller = /** @class */ (function () {
    function Generic_Controller() {
    }
    Generic_Controller.prototype.list = function () {
        return (function (req, res) {
            res.status(200).send({
                nickname: "Monkey",
                name: "Nicolas"
            });
        });
    };
    return Generic_Controller;
}());
exports.Generic_Controller = Generic_Controller;
//# sourceMappingURL=generic_controller.js.map