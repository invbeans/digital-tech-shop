const { Model } = require('objection');

class Review extends Model {
    static get tableName() {
        return 'review'
    }

    static get relationMappings() {
        const User = require('./User')
        const Product = require('./Product')

        return {
            user_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'review.user',
                    to: 'user.id'
                }
            },
            product_rel: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'review.product',
                    to: 'product.id'
                }
            }
        }
    }
}

module.exports = Review