import { Action } from "./action";
import { HolidayAction } from "./holiday-action";

export class ActionHolidayPage {
    constructor(public action: Action,
        public holidayAction: HolidayAction) { }
}