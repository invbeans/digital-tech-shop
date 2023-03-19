const { Model } = require('objection');

class Basket extends Model {
    static get tableName() {
        return 'basket'
    }

    static get relationMappings() {
        const User = require('./User')
        const BasketProduct = require('./BasketProduct')

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User, 
                join: {
                    from: 'basket.user',
                    to: 'user.id'
                }
            },
            basket_product: {
                relation: Model.HasManyRelation,
                modelClass: BasketProduct,
                join: {
                    from: 'basket.user',
                    to: 'basket_product.basket'
                }
            }
        }
    }
}

module.exports = Basket