const { Model } = require('objection');

class Basket extends Model {
    static get tableName() {
        return 'basket'
    }

    static get idColumn() {
        return 'user'
    }

    static get relationMappings() {
        const User = require('./User')
        const BasketProduct = require('./BasketProduct')

        return {
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User, 
                join: {
                    from: 'basket.user',
                    to: 'user.id'
                }
            },
            basket_product_rel: {
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