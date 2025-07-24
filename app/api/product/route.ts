import {connectDB} from "@/lib/mongoose";
import {Product} from "@/lib/models/Product";
import {NextRequest, NextResponse} from "next/server";
import {FilterQuery} from "mongoose";
import {Product as ProductType, Size} from "@/types";
import {uploadImage} from "@/lib/uploadImage";

// Read
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        await import("@/lib/models/Category");

        const {searchParams} = new URL(req.url);

        const page = searchParams.get("page");
        const limit = parseInt(searchParams.get("limit") || "5");
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";

        const query: FilterQuery<ProductType> = {};

        if (search) query.name = {$regex: search, $options: "i"};
        if (category && category !== "All") query.categories = category;

        const totalProducts = await Product.countDocuments()
        const totalFilteredProducts = await Product.countDocuments(query)

        // if paginated => Paginated Product
        if (page) {
            const currentPage = parseInt(page || "1");
            const products = await Product.find(query)
                .populate("categories")
                .skip((currentPage - 1) * limit)
                .limit(limit)
                .lean()
                .sort({createdAt: -1});

            return NextResponse.json({products, totalProducts, totalFilteredProducts});
        }

        // else => All Product
        const allProducts = await Product.find(query)
            .populate("categories")
            .lean()
            .sort({createdAt: -1});

        return NextResponse.json(allProducts);
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);
        return NextResponse.json({error: "خطا در دریافت محصولات"}, {status: 500});
    }
}

// Create
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const imageFile = formData.get("image") as File;

        const name = formData.get("name")?.toString() || "";
        const description = formData.get("description")?.toString() || "";
        const basePrice = parseFloat(formData.get("basePrice")?.toString() || "0");
        const categories = JSON.parse(formData.get("categories")?.toString() || "[]");
        const sizes = JSON.parse(formData.get("sizes")?.toString() || "[]");
        const sizesNormalized = sizes.map((s: Size) => ({
            label: s.label,
            price: Number(s.price),
        }));

        if (!name || !basePrice || !imageFile || categories.length === 0) {
            return NextResponse.json({error: "لطفاً تمام فیلدهای ضروری را پر کنید."}, {status: 400});
        }

        const imageUrl = await uploadImage(imageFile);

        const newProduct = await Product.create({
            name,
            description,
            basePrice,
            sizes: sizesNormalized,
            image: imageUrl,
            categories
        })
        return NextResponse.json(newProduct);

    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);
        return NextResponse.json({error: "خطا در ساخت محصول"}, {status: 500});
    }
}
