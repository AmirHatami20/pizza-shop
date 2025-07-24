import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getAllProducts,
    getProductsByPagination,
    deleteProduct,
    updateProduct,
    getAllCategories,
    deleteCategory,
    updateCategory,
    createProduct,
    createCategory,
} from "@/lib/api";
import {Category, Product, ProductData} from "@/types";

interface PaginatedParams {
    page: number;
    limit?: number;
    search?: string;
    category?: string;
}

export function useAPI() {
    const queryClient = useQueryClient();

    return {
        // ——— Products ———
        useAllProducts: () =>
            useQuery<Product[]>({
                queryKey: ["products"],
                queryFn: getAllProducts,
            }),

        usePaginatedProducts: (params: PaginatedParams) =>
            useQuery<ProductData>({
                queryKey: ["products", params],
                queryFn: () => getProductsByPagination(params),
            }),

        useDeleteProduct: () =>
            useMutation({
                mutationFn: (id: string) => deleteProduct(id),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ["products"]});
                },
            }),

        useUpdateProduct: () =>
            useMutation({
                mutationFn: ({id, data}: { id: string; data: Partial<Product> }) =>
                    updateProduct(id, data),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ["products"]});
                },
            }),

        useCreateProduct: () =>
            useMutation({
                mutationFn: (data: FormData) => createProduct(data),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ["products"]});
                },
            }),

        // ——— Categories ———
        useAllCategories: () =>
            useQuery<Category[]>({
                queryKey: ["categories"],
                queryFn: getAllCategories,
            }),

        useDeleteCategory: () =>
            useMutation({
                mutationFn: (id: string) => deleteCategory(id),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ["categories"]});
                },
            }),

        useUpdateCategory: () =>
            useMutation({
                mutationFn: ({id, data}: { id: string; data: Partial<Category> }) =>
                    updateCategory(id, data),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ["categories"]});
                },
            }),

        useCreateCategory: () =>
            useMutation<Category, Error, Partial<Category>>({
                mutationFn: (data) => createCategory(data),
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["categories"] });
                },
            })


    };
}
