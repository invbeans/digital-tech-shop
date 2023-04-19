import { Action } from "./action";
import { BrandAction } from "./brand-action";

export class ActionBrandPage {
    constructor(public action: Action,
        public brandAction: BrandAction) { }
}