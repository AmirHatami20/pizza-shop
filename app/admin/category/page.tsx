'use client';

import React, {useMemo, useState} from 'react';
import Header from '@/components/admin/Header';
import StatCard from '@/components/admin/StatsCard';
import {AiOutlineProduct} from 'react-icons/ai';
import {MdOutlineCalendarMonth, MdOutlineRemoveRedEye} from 'react-icons/md';
import CreateCategory from '@/components/admin/modal/CreateCategory';
import {FiPlus, FiSearch} from 'react-icons/fi';
import {GrUpdate} from 'react-icons/gr';
import {FaRegTrashAlt} from 'react-icons/fa';
import {useAPI} from "@/hook/useAPI";
import toast from "react-hot-toast";

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

    const {useAllCategories, useDeleteCategory} = useAPI()

    const {data: categories = [], isLoading: isLoadingCategories} = useAllCategories()
    const deleteMutation = useDeleteCategory()

    // Filtered Results
    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) return categories;
        const term = searchTerm.toLowerCase();
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(term) ||
            cat.title.toLowerCase().includes(term)
        );
    }, [categories, searchTerm]);

    if (isLoadingCategories) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="h-30 w-30 animate-spin rounded-full border-5 border-dashed border-primary"/>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Header
                title="دسته‌بندی‌ها"
                subtitle="مدیریت و تغییر دسته بندی ها"
            >
                <button
                    className="inline-flex gap-x-1 items-center px-3 py-2 text-sm font-medium rounded-md border bg-primary text-white hover:bg-primary/80"
                    onClick={() => setIsOpenModal(true)}
                >
                    <FiPlus className="w-4 h-4"/>
                    ساخت دسته بندی جدید
                </button>
            </Header>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <StatCard
                    icon={<AiOutlineProduct/>}
                    label="کل دسته‌بندی‌ها"
                    value={categories.length}
                />
                <StatCard
                    icon={<MdOutlineCalendarMonth/>}
                    label="این ماه"
                    value={categories.filter(cat =>
                        new Date(cat.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    ).length}
                />
            </div>

            {/* Search Filter */}
            <div className="bg-white shadow rounded-lg">
                <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">جستجو</label>
                        <div
                            className="flex w-full gap-x-2 px-2 items-center h-10 sm:text-sm border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
                            <FiSearch className="text-gray-500"/>
                            <input
                                type="text"
                                placeholder="عنوان یا نام کوتاه..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-full outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category List */}
            <div className="bg-white shadow rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900">
                    فهرست دسته‌ها ({filteredCategories.length.toLocaleString('fa-IR')})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {filteredCategories.map(cat => (
                        <div
                            key={cat._id}
                            className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-between bg-gray-100 rounded-lg p-4"
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

                            <div className="flex gap-x-3">
                                <button
                                    className="rounded-full bg-green-500 w-10 h-10 text-white flex items-center justify-center">
                                    <GrUpdate/>
                                </button>
                                <button
                                    className="rounded-full bg-blue-500 w-10 h-10 text-white flex items-center justify-center">
                                    <MdOutlineRemoveRedEye/>
                                </button>
                                <button
                                    className="rounded-full bg-red-600 w-10 h-10 text-white flex items-center justify-center"
                                    onClick={() => {
                                        if (confirm('آیا از حذف مطمئن هستید؟')) {
                                            deleteMutation.mutate(cat._id, {
                                                onSuccess: () => {
                                                    toast.success('دسته‌بندی با موفقیت حذف شد!');
                                                }
                                            });
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

            {/* Create Category Modal */}
            <CreateCategory
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            />
        </div>
    );
}
