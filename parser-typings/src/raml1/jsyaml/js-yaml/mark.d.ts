/// <reference path="../../../../typings/tsd.d.ts" />
declare class Mark {
    name: string;
    buffer: string;
    position: number;
    line: number;
    column: number;
    constructor(name: string, buffer: string, position: number, line: number, column: number);
    filePath: string;
    getSnippet(indent?: number, maxLength?: number): string;
    toString(compact?: boolean): string;
}
export = Mark;
