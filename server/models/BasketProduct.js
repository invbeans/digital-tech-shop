const { Model } = require('objection');

class BasketProduct extends Model {
    static get tableName() {
        return 'basket_product'
    }

    static get relationMappings() {
        const Basket = require('./Basket')
        const Product = require('./Product')

        return {
            basket: {
                relation: Model.BelongsToOneRelation,
                modelClass: Basket,
                join: {
                    from: 'basket_product.basket',
                    to: 'basket.user'
                }
            },
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'basket_product.product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = BasketProduct