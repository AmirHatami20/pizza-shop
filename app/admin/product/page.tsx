'use client'

import React, {useState} from "react"
import Header from "@/components/admin/Header"
import CreateProduct from "@/components/admin/modal/CreateProduct"
import {AiOutlineProduct} from "react-icons/ai"
import {MdOutlineRemoveRedEye} from "react-icons/md"
import {GrUpdate} from "react-icons/gr"
import {FaRegTrashAlt} from "react-icons/fa"
import {FiBox, FiPlus, FiSearch} from "react-icons/fi"
import {toPersianNumber} from "@/util/helper"
import {useAPI} from '@/hook/useAPI'
import StatsCard from "@/components/admin/StatsCard";
import toast from "react-hot-toast";

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [isOpenModal, setIsOpenModal] = useState(false)

    const {usePaginatedProducts, useAllCategories, useDeleteProduct} = useAPI()

    const {data: productsData, isLoading: isLoadingProducts} = usePaginatedProducts({
        page,
        search: searchTerm,
        category: selectedCategory,
        limit: 5
    })
    const products = productsData?.products || [];
    const {data: categories = [], isLoading: isLoadingCategories} = useAllCategories()

    const productPrePage = 5;
    const pageCount = Math.ceil((productsData?.totalFilteredProducts || 0) / productPrePage)

    const deleteMutation = useDeleteProduct()

    const dashboardItems = [
        {
            icon: <FiBox/>,
            value: isLoadingProducts ? "..." : productsData?.totalProducts || 0,
            label: "تعداد محصولات",
        },
        {
            icon: <AiOutlineProduct/>,
            value: isLoadingCategories ? "..." : categories?.length,
            label: "این ماه",
        },
    ]


    if (isLoadingCategories) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div
                    className="h-30 w-30 animate-spin rounded-full border-5 bg-white/30 backdrop-blur-xl border-dashed border-primary"/>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Header
                title="محصولات"
                subtitle="مدیریت و تغییر دوره ها"
            >
                <button
                    className="inline-flex gap-x-1 items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80"
                    onClick={() => setIsOpenModal(true)}
                >
                    <FiPlus className="w-4 h-4"/>
                    ساخت محصول جدید
                </button>
            </Header>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {dashboardItems.map((item, index) => (
                    <StatsCard
                        key={index}
                        icon={item.icon}
                        value={item.value}
                        label={item.label}
                    />
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white shadow rounded-lg">
                <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">جستجو</label>
                        <div
                            className="flex w-full gap-x-2 px-2 items-center h-10 sm:text-sm border border-gray-300 rounded-md">
                            <FiSearch className="text-gray-500"/>
                            <input
                                type="text"
                                placeholder="نام محصول..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-full outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="flex h-10 items-center px-2 w-full sm:text-sm border border-gray-300 rounded-md"
                        >
                            <option value="All">همه دسته‌ها</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Items */}
            <div className="bg-white shadow rounded-lg p-5">
                {!isLoadingProducts ? (
                    <>
                        <h3 className="text-lg font-medium text-gray-900 mt-0">
                            فهرست محصولات ({productsData?.totalFilteredProducts.toLocaleString('fa-IR')})
                        </h3>
                        {/* Navigation */}
                        <div className="flex justify-center items-center my-2 gap-x-3" dir="ltr">
                            {Array.from({length: pageCount}).map((_, index) => (
                                <button
                                    onClick={() => setPage(index + 1)}
                                    key={index}
                                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm ${
                                        index + 1 === page ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-5 mt-5">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="flex items-center justify-center md:justify-between flex-wrap bg-gray-200 rounded-lg px-4 py-5"
                                >
                                    <div className="flex items-center gap-x-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-[150px] max-h-[100px] h-auto rounded-lg"
                                        />
                                        <div className="flex flex-col px-4 border-l border-gray-400 space-y-0.5">
                                            <h2 className="font-semibold text-lg">{product.name}</h2>
                                            <p className="flex items-center gap-x-1 text-sm text-gray-800">
                                                <span>قیمت:</span>
                                                <span className="text-primary font-semibold">
                                            {toPersianNumber(product.basePrice, true)}
                                        </span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col px-2 space-y-2">
                                            <div className="flex gap-x-2 text-sm">
                                                <span>دسته بندی:</span>
                                                <div className="flex gap-x-2 text-primary">
                                                    {product.categories.map((cat, index) => (
                                                        <span key={cat._id}>
                                                    {cat.title}{index + 1 < product.categories.length ? " ," : ""}
                                                </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-x-2 text-sm">
                                                <span>سایزها:</span>
                                                <div className="flex gap-x-2 text-primary capitalize">
                                                    {product.sizes.map((size, index) => (
                                                        <span key={size._id}>
                                                    {size.label}{index + 1 < product.sizes.length ? " ," : ""}
                                                </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-3">
                                        <button
                                            className="rounded-full bg-green-500 w-10 h-10 text-white flex items-center justify-center"

                                        >
                                            <GrUpdate/>
                                        </button>
                                        <button
                                            className="rounded-full bg-blue-400 w-10 h-10 text-white flex items-center justify-center"

                                        >
                                            <MdOutlineRemoveRedEye/>
                                        </button>
                                        <button
                                            className="rounded-full bg-red-600 w-10 h-10 text-white flex items-center justify-center"
                                            onClick={() => {
                                                const confirmed = confirm('آیا از حذف مطمئنی؟')
                                                if (confirmed) deleteMutation.mutate(product._id,{
                                                    onSuccess: () => {
                                                        toast.success("محصول با موفقیت حذف شد.")
                                                    }
                                                })
                                            }}
                                        >
                                            <FaRegTrashAlt/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center min-h-40">
                        <div
                            className="h-30 w-30 animate-spin rounded-full border-5 bg-white/30 backdrop-blur-xl border-dashed border-primary"/>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <CreateProduct
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                categories={categories}
            />
        </div>
    )
}
