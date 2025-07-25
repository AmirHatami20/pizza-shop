import {connectDB} from "@/lib/mongoose";
import Cart from "@/lib/models/Cart";
import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {Types} from "mongoose";
import type {CartItem} from "@/types";

interface AddToCartRequestBody {
    productId: string;
    size: string;
    quantity?: number;
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const userId = session.user.id;

        const body = await req.json() as AddToCartRequestBody;
        const {productId, size, quantity} = body;

        if (!productId || !size) {
            return NextResponse.json({error: "Missing fields"}, {status: 400});
        }

        if (!Types.ObjectId.isValid(productId)) {
            return NextResponse.json({error: "Invalid product ID"}, {status: 400});
        }

        const safeQuantity = typeof quantity === "number" && quantity > 0 ? quantity : 1;

        let cart = await Cart.findOne({user: userId});

        if (!cart) {
            cart = new Cart({user: userId, items: []});
        }

        const existingItem = cart?.items.find(
            (item: CartItem) =>
                item.product.toString() === productId && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += safeQuantity;
        } else {
            const newItem: CartItem = {
                product: new Types.ObjectId(productId),
                size,
                quantity: safeQuantity,
            };
            cart?.items.push(newItem);
        }

        cart.updatedAt = new Date();
        await cart.save();

        return NextResponse.json({message: "محصول به سبد اضافه شد", cart}, {status: 201});
    } catch (error) {
        console.error("Add to cart error:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}
