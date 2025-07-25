import {Schema, models, model, Types} from "mongoose";

const cartItemSchema = new Schema(
    {
        product: {type: Types.ObjectId, ref: "Product", required: true},
        size: {type: String, required: true},
        quantity: {type: Number, required: true, default: 1, min: 1},
    }, {_id: false}
);

const cartSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: {
            type: [cartItemSchema],
            default: [],
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }, {timestamps: true}
);

export default models.Cart || model("Cart", cartSchema);
