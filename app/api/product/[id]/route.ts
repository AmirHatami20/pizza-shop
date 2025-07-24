import {connectDB} from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";
import {Product} from "@/lib/models/Product";
import mongoose from "mongoose";

// DELETE
export async function DELETE(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const {id} = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({error: "شناسه نامعتبر است"}, {status: 400});
        }

        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({error: "محصول پیدا نشد"}, {status: 404});
        }

        return NextResponse.json({success: true});
    } catch (error) {
        console.error("DELETE Product Error:", error);
        return NextResponse.json(
            {error: "خطا در حذف محصول"},
            {status: 500}
        );
    }
}

// PUT
export async function PUT(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const {id} = await params;
        const data = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({error: "شناسه نامعتبر است"}, {status: 400});
        }

        const updated = await Product.findByIdAndUpdate(id, data, {new: true});

        if (!updated) {
            return NextResponse.json({error: "محصول یافت نشد"}, {status: 404});
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT Product Error:", error);
        return NextResponse.json(
            {error: "خطا در ویرایش محصول"},
            {status: 500}
        );
    }
}
