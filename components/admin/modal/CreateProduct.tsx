import React, {useState, useRef} from 'react';
import {IoCloudUploadOutline} from 'react-icons/io5';
import {Category, SizeLabel} from '@/types';
import ModalWrapper from "@/components/admin/modal/ModalWrapper";
import {useAPI} from "@/hook/useAPI";
import toast from "react-hot-toast";

interface Props {
    isOpenModal?: boolean;
    setIsOpenModal: (isOpenModal: boolean) => void;
    categories: Category[];
}

interface FormState {
    name: string;
    basePrice: string;
    description: string;
    sizes: { label: SizeLabel; price: string }[];
    categories: string[];
}

const SIZE_OPTIONS: SizeLabel[] = ['sm', 'md', 'lg'];

export default function CreateProduct({isOpenModal = false, setIsOpenModal, categories}: Props) {
    const [form, setForm] = useState<FormState>({
        name: '',
        basePrice: '',
        description: '',
        sizes: [],
        categories: [],
    });
    const {useCreateProduct} = useAPI();
    const createMutation = useCreateProduct()

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSizeToggle = (label: SizeLabel) => {
        setForm((prev) => {
            const exists = prev.sizes.some((s) => s.label === label);
            if (exists) {
                return {
                    ...prev,
                    sizes: prev.sizes.filter((s) => s.label !== label),
                };
            } else {
                return {
                    ...prev,
                    sizes: [...prev.sizes, {label, price: ''}],
                };
            }
        });
    };

    const handleSizePriceChange = (label: SizeLabel, price: string) => {
        setForm((prev) => {
            const updatedSizes = prev.sizes.map((s) =>
                s.label === label ? {...s, price} : s
            );
            return {...prev, sizes: updatedSizes};
        });
    };

    const handleCategoryToggle = (id: string) => {
        setForm((prev) => {
            const isSelected = prev.categories.includes(id);
            return {
                ...prev,
                categories: isSelected
                    ? prev.categories.filter((cid) => cid !== id)
                    : [...prev.categories, id],
            };
        });
    };

    const handleClose = () => {
        setIsOpenModal(false);
        setPreviewImage(null);
        setImageFile(null);
        setForm({
            name: '',
            basePrice: '',
            description: '',
            sizes: [],
            categories: [],
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === "sizes" || key === "categories") {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value as string);
            }
        });

        if (imageFile) {
            formData.append("image", imageFile);
        } else {
            toast.error("لطفاً یک تصویر برای محصول انتخاب کنید.");
            return;
        }

        createMutation.mutate(formData, {
            onSuccess: () => {
                handleClose();
                toast.success("محصول با موفقیت ساخته شد.")
            },
            onError: (err) => {
                console.error("خطا در ایجاد دسته:", err);
                toast.error("خطایی در ساخت محصول به وجود آمده است.")
            }
        });

    };


    return (
        <ModalWrapper
            title="محصول"
            handleClose={handleClose}
            isOpenModal={isOpenModal}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">تصویر محصول</label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50"
                        onClick={handleClickUpload}
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="mx-auto max-h-20 object-contain rounded-md"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-y-1 justify-center text-gray-400">
                                <IoCloudUploadOutline className="text-2xl"/>
                                <span>انتخاب تصویر</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-y-1 text-sm">
                    <label>نام محصول:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-400 p-1.5 rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-y-1 text-sm">
                    <label>قیمت پایه (تومان):</label>
                    <input
                        type="number"
                        name="basePrice"
                        value={form.basePrice}
                        onChange={handleChange}
                        className="w-full border border-gray-400 p-1.5 rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-y-1 text-sm">
                    <label>توضیحات:</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-400 p-1.5 rounded-md resize-none"
                    />
                </div>

                {/* Sizes */}
                <div className="flex flex-col text-sm">
                    <label>سایزها و قیمت:</label>
                    {SIZE_OPTIONS.map(label => {
                        const size = form.sizes.find(s => s.label === label);
                        const isChecked = !!size;
                        return (
                            <div key={label} className="flex items-center h-9 gap-2">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleSizeToggle(label)}
                                    className="w-4 h-4"
                                />
                                <label className="capitalize w-7">{label}</label>
                                {isChecked && (
                                    <input
                                        type="number"
                                        placeholder="قیمت"
                                        value={size.price}
                                        onChange={(e) => handleSizePriceChange(label, e.target.value)}
                                        className="max-w-35 outline-none text-sm border border-gray-400 p-1 rounded-md"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Categories */}
                <div className="space-y-2">
                    <label className="block font-medium">دسته‌بندی‌ها:</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {categories.map(cat => (
                            <label key={cat._id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.categories.includes(cat._id)}
                                    onChange={() => handleCategoryToggle(cat._id)}
                                />
                                {cat.title}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        انصراف
                    </button>
                    <button
                        disabled={createMutation.isPending}
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/60 transition-colors"
                    >
                        {createMutation.isPending ? "در حال بارگذاری..." : "ثبت محصول"}

                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
}
