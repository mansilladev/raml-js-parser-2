/// <reference path="../../../../typings/tsd.d.ts" />
import Mark = require("./mark");
declare class YAMLException {
    message: string;
    reason: string;
    name: string;
    mark: Mark;
    constructor(reason: string, mark?: Mark);
    toString(compact?: boolean): any;
}
export = YAMLException;
