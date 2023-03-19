const { Model } = require('objection');

class Product extends Model {
    static get tableName() {
        return 'product'
    }

    static get relationMappings() {
        const ProductPropertyValues = require('./ProductPropertyValues')
        const ProductRemains = require('./ProductRemains')
        const Review = require('./Review')
        const ReturnProduct = require('./ReturnProduct')
        const ProductImage = require('./ProductImage')
        const Question = require('./Question')
        const DoubleAction = require('./DoubleAction')
        const BasketProduct = require('./BasketProduct')
        const OrderProduct = require('./OrderProduct')
        const SubCategory = require('./SubCategory')
        const Manufacturer = require('./Manufacturer')
        const Supplier = require('./Supplier')

        return {
            product_property_values: {
                relation: Model.HasManyRelation,
                modelClass: ProductPropertyValues,
                join: {
                    from: 'product.id',
                    to: 'product_property_values.product'
                }
            },
            product_remains: {
                relation: Model.HasOneRelation,
                modelClass: ProductRemains,
                join: {
                    from: 'product.id',
                    to: 'product_remains.product'
                }
            },
            review: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: 'product.id',
                    to: 'review.product'
                }
            },
            return_product: {
                relation: Model.HasManyRelation,
                modelClass: ReturnProduct,
                join: {
                    from: 'product.id',
                    to: 'return_product.product'
                }
            },
            product_image: {
                relation: Model.HasManyRelation,
                modelClass: ProductImage,
                join: {
                    from: 'product.id',
                    to: 'product_image.product'
                }
            },
            question: {
                relation: Model.HasManyRelation,
                modelClass: Question,
                join: {
                    from: 'product.id',
                    to: 'question.product'
                }
            },
            full_price_product: {
                relation: Model.HasManyRelation,
                modelClass: DoubleAction,
                join: {
                    from: 'product.id',
                    to: 'double_action.full_price_product'
                }
            },
            discount_product: {
                relation: Model.HasManyRelation,
                modelClass: DoubleAction,
                join: {
                    from: 'product.id',
                    to: 'double_action.discount_product'
                }
            },
            basket_product: {
                relation: Model.HasManyRelation,
                modelClass: BasketProduct,
                join: {
                    from: 'product.id',
                    to: 'basket_product.product'
                }
            },
            order_product: {
                relation: Model.HasManyRelation,
                modelClass: OrderProduct,
                join: {
                    from: 'product.id',
                    to: 'order_product.product'
                }
            },
            sub_category: {
                relation: Model.BelongsToOneRelation,
                modelClass: SubCategory,
                join: {
                    from: 'product.sub_category',
                    to: 'sub_category.id'
                }
            },
            manufacturer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Manufacturer,
                join: {
                    from: 'product.manufacturer',
                    to: 'manufacturer.id'
                }
            },
            supplier: {
                relation: Model.BelongsToOneRelation,
                modelClass: Supplier,
                join: {
                    from: 'product.supplier',
                    to: 'supplier.id'
                }
            }
        }
    }
}

module.exports = Product