import { Action } from "./action";
import { SubCategoryAction } from "./sub-category-action";

export class ActionSubCatPage {
    constructor(public action: Action,
        public subCategoryAction: SubCategoryAction) { }
}