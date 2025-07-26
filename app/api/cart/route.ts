import {connectDB} from "@/lib/mongoose";
import Cart from "@/lib/models/Cart";
import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import mongoose, {Types} from "mongoose";
import type {CartItem} from "@/types";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const userId = session.user.id;

        const body = await req.json() as CartItem;
        const {product, size, quantity} = body;

        if (!product || !size) {
            return NextResponse.json({error: "Missing fields"}, {status: 400});
        }

        if (!Types.ObjectId.isValid(product)) {
            return NextResponse.json({error: "Invalid product ID"}, {status: 400});
        }

        const safeQuantity = quantity > 0 ? quantity : 1;

        let cart = await Cart.findOne({user: userId});

        if (!cart) {
            cart = new Cart({user: userId, items: []});
        }

        const existingItem = cart?.items.find(
            (item: CartItem) =>
                item.product.toString() === product && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += safeQuantity;
        } else {
            const newItem: CartItem = {
                product: new Types.ObjectId(product),
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

export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id || session.user.email;
        if (!userId) {
            return NextResponse.json({ error: "Invalid user session" }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(userId) }).populate("items.product");

        if (!cart) {
            return NextResponse.json([], { status: 200 });
        }

        if (!Array.isArray(cart.items)) {
                   return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(cart.items, { status: 200 });

    } catch (error) {
        console.error("🔥 Get cart error:", error);
        return NextResponse.json({ error: "Internal server error", details: String(error) }, { status: 500 });
    }
}

