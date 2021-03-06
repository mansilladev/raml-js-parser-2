/// <reference path="../../../../typings/tsd.d.ts" />
declare class Schema {
    include: any[];
    implicit: any[];
    explicit: any[];
    compiledImplicit: any[];
    compiledExplicit: any[];
    compiledTypeMap: any[];
    constructor(definition: any);
    static DEFAULT: any;
    static create: () => Schema;
}
export = Schema;
