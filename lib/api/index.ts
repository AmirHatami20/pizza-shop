import {Product, Category, ProductData, CartItem} from "@/types";
import {API_PATH} from "@/constant/apiPath";

interface PaginatedParams {
    page: number;
    limit?: number;
    search?: string;
    category?: string;
}

// ————— Products —————
export async function createProduct(data: FormData) {
    try {
        const res = await fetch(API_PATH.PRODUCT.CREATE, {
            method: "POST",
            body: data,
        });
        if (!res.ok) new Error("ساخت محصول با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("createProduct Error:", error);
        return null;
    }
}

export async function getAllProducts(): Promise<Product[]> {
    try {
        const res = await fetch(API_PATH.PRODUCT.GET_ALL, {cache: "no-store"});
        if (!res.ok) new Error("خطا در دریافت محصولات");
        return await res.json();
    } catch (error) {
        console.error("getAllProducts Error:", error);
        return [];
    }
}


export async function getProductsByPagination(params: PaginatedParams): Promise<ProductData> {
    try {
        const {page, limit = 6, search = "", category = ""} = params;
        const query = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...(search && {search}),
            ...(category && category !== "All" && {category}),
        }).toString();

        const res = await fetch(`${API_PATH.PRODUCT.GET_ALL}?${query}`);
        if (!res.ok) new Error("دریافت محصولات صفحه‌ای با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("getProductsByPagination Error:", error);
        return {
            products: [],
            totalProducts: 0,
            totalFilteredProducts: 0,
        };
    }
}

export async function deleteProduct(id: string): Promise<boolean> {
    try {
        const res = await fetch(API_PATH.PRODUCT.DELETE(id), {method: "DELETE"});
        if (!res.ok) new Error("حذف محصول با خطا مواجه شد");
        await res.json();
        return true;
    } catch (error) {
        console.error("deleteProduct Error:", error);
        return false;
    }
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
    try {
        const res = await fetch(API_PATH.PRODUCT.UPDATE(id), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        if (!res.ok) new Error("آپدیت محصول با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("updateProduct Error:", error);
        return null;
    }
}

// ————— Categories —————
export async function createCategory(data: Partial<Category>) {
    try {
        const res = await fetch(API_PATH.CATEGORY.CREATE, {
            method: "POST",
            body: JSON.stringify(data),
        })
        if (!res.ok) new Error("دریافت دسته‌بندی‌ها با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("getAllCategories Error:", error);
        return [];
    }
}

export async function getAllCategories(): Promise<Category[]> {
    try {
        const res = await fetch(API_PATH.CATEGORY.GET_ALL, {cache: "no-store"});
        if (!res.ok) new Error("دریافت دسته‌بندی‌ها با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("getAllCategories Error:", error);
        return [];
    }
}

export async function deleteCategory(id: string): Promise<boolean> {
    try {
        const res = await fetch(API_PATH.CATEGORY.DELETE(id), {method: "DELETE"});
        if (!res.ok) new Error("حذف دسته‌بندی با خطا مواجه شد");
        await res.json();
        return true;
    } catch (error) {
        console.error("deleteCategory Error:", error);
        return false;
    }
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
    try {
        const res = await fetch(API_PATH.CATEGORY.UPDATE(id), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        if (!res.ok) new Error("آپدیت دسته‌بندی با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("updateCategory Error:", error);
        return null;
    }
}

// ————— Cart —————
export async function createCart(data: Partial<CartItem>) {
    try {
        const res = await fetch(API_PATH.CART.CREATE, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
        if (!res.ok) new Error("ساخت کارت با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("updateCategory Error:", error);
        return null;
    }
}


export async function getAllCarts(): Promise<CartItem[] | []> {
    try {
        const res = await fetch(API_PATH.CART.GET_ALL,{
            method: "GET",
            credentials: "include",
        });
        console.log(res)
        if (!res.ok) new Error("دریافت سبد خرید با خطا مواجه شد");
        return res.json();
    } catch (error) {
        console.error("getAllCarts Error:", error);
        return [];
    }
}

