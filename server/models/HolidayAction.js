const { Model } = require('objection');

class HolidayAction extends Model {
    static get tableName() {
        return 'holiday_action'
    }

    static get relationMappings() {

    }
}

module.exports = HolidayAction