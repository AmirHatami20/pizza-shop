import {Schema, model, models} from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    sizes: [
        {
            label: {
                type: String,
                enum: ['sm', 'md', 'lg'],
                required: true,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
        }
    ],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        }
    ],
}, {timestamps: true});

export const Product = models?.Product || model('Product', ProductSchema);
