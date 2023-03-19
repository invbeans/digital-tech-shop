const { Model } = require('objection');

class Promocode extends Model {
    static get tableName() {
        return 'promocode'
    }

    static get relationMappings() {

    }
}

module.exports = Promocode