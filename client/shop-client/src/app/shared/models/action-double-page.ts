import { Action } from "./action";
import { DoubleAction } from "./double-action";

export class ActionDoublePage {
    constructor(public action: Action,
        public doubleAction: DoubleAction) { }
}