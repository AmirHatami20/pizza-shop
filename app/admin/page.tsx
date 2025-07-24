'use client'

import React, {useState} from 'react'
import StatsCard from "@/components/admin/StatsCard"
import {FiBox, FiList, FiPlus} from "react-icons/fi"
import {useAPI} from "@/hook/useAPI"
import {toPersianNumber} from "@/util/helper"
import {MdOutlineRemoveRedEye} from "react-icons/md"
import {FaRegTrashAlt} from "react-icons/fa"
import toast from "react-hot-toast"
import Header from "@/components/admin/Header";
import CreateProduct from "@/components/admin/modal/CreateProduct";
import CreateCategory from "@/components/admin/modal/CreateCategory";

export default function Page() {
    const [isOpenCreateProductModal, setIsOpenCreateProductModal] = useState(false);
    const [isOpenCreateCategoryModal, setIsOpenCreateCategoryModal] = useState(false);

    const {
        usePaginatedProducts,
        useAllCategories,
        useDeleteCategory,
    } = useAPI()

    const {data: productsData, isLoading: isLoadingProducts} = usePaginatedProducts({
        page: 1,
        limit: 5
    })
    const {data: categories = [], isLoading: isLoadingCategories} = useAllCategories()
    const products = productsData?.products || [];

    const deleteMutation = useDeleteCategory()

    const dashboardItems = [
        {
            icon: <FiBox/>,
            value: isLoadingProducts ? "..." : productsData?.totalProducts || 0,
            label: "تعداد محصولات",
        },
        {
            icon: <FiList/>,
            value: isLoadingCategories ? "..." : categories.length,
            label: "تعداد دسته‌بندی‌ها",
        },
    ]

    if (isLoadingProducts || isLoadingCategories) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="h-30 w-30 animate-spin rounded-full border-5 border-dashed border-primary"/>
            </div>
        )
    }

    return (
        <div>
            <div className="space-y-6">
                {/* Header */}
                <Header
                    title="داشبورد ادمین"
                    subtitle="مشاهده و تنظیم داده‌های سایت"
                >
                    <button
                        className="inline-flex gap-x-1 items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-400 hover:bg-gray-100"
                        onClick={() => setIsOpenCreateCategoryModal(true)}
                    >
                        <FiPlus className="w-4 h-4"/>
                        ساخت دسته بندی جدید
                    </button>
                    <button
                        className="inline-flex gap-x-1 items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80"
                        onClick={() => setIsOpenCreateProductModal(true)}
                    >
                        <FiPlus className="w-4 h-4"/>
                        ساخت محصول جدید
                    </button>

                </Header>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {dashboardItems.map((item, index) => (
                        <StatsCard
                            key={index}
                            icon={item.icon}
                            value={item.value}
                            label={item.label}
                        />
                    ))}
                </div>

                {/* Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Products List */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold">آخرین محصولات</h3>
                        <div className="flex flex-col space-y-2 mt-3 ">
                            {products.map(product => (
                                <div
                                    key={product._id}
                                    className="flex items-center justify-between bg-gray-100 rounded-lg p-4"
                                >
                                    <div className="flex items-center gap-x-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-16 h-auto max-h-10"
                                        />
                                        <div className="flex flex-col gap-y-1">
                                            <span className="text-sm font-semibold">{product.name}</span>
                                            <p className="text-xs">
                                                قیمت:{" "}
                                                <span className="text-primary font-semibold">
                                                {toPersianNumber(product.basePrice)}
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button
                                            className="rounded-full bg-blue-400 w-8 h-8 text-white flex items-center justify-center"
                                        >
                                            <MdOutlineRemoveRedEye/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold">آخرین دسته‌بندی‌ها</h3>
                        <div className="flex flex-col space-y-2 mt-3">
                            {categories.map(cat => (
                                <div
                                    key={cat._id}
                                    className="flex items-center justify-between bg-gray-100 rounded-lg p-4"
                                >
                                    <div className="flex flex-col text-sm space-y-1">
                                        <div className="flex gap-x-2">
                                            <span>نام:</span>
                                            <span className="text-primary font-semibold">{cat.title}</span>
                                        </div>
                                        <div className="flex gap-x-2">
                                            <span>تایتل:</span>
                                            <span className="text-gray-600">{cat.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="rounded-full bg-red-600 w-8 h-8 text-white flex items-center justify-center"
                                            onClick={() => {
                                                if (confirm('آیا از حذف مطمئن هستید؟')) {
                                                    deleteMutation.mutate(cat._id, {
                                                        onSuccess: () => toast.success('دسته‌بندی با موفقیت حذف شد'),
                                                        onError: () => toast.error('خطا در حذف دسته‌بندی'),
                                                    })
                                                }
                                            }}
                                        >
                                            <FaRegTrashAlt/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Create Product Modal */}
            <CreateProduct
                isOpenModal={isOpenCreateProductModal}
                setIsOpenModal={setIsOpenCreateProductModal}
                categories={categories}
            />

            {/* Create Category Modal */}
            <CreateCategory
                isOpenModal={isOpenCreateCategoryModal}
                setIsOpenModal={setIsOpenCreateCategoryModal}
            />
        </div>
    )
}
