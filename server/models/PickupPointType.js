const { Model } = require('objection');

class PickupPointType extends Model {
    static get tableName() {
        return 'pickup_point_type'
    }

    static get relationMappings() {
        const OrderShipping = require('./OrderShipping')

        return {
            order_shipping_rel: {
                relation: Model.HasManyRelation,
                modelClass: OrderShipping,
                join: {
                    from: 'pickup_point_type.id',
                    to: 'order_shipping.pickup_point_type'
                }
            }
        }
    }
}

module.exports = PickupPointType