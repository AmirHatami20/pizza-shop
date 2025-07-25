import React, {useState} from 'react';
import ModalWrapper from "@/components/Helper/ModalWrapper";
import {useAPI} from "@/hook/useAPI";
import toast from "react-hot-toast";

interface Props {
    isOpenModal: boolean;
    setIsOpenModal: (isOpenModal: boolean) => void;
}

export default function CreateCategory({isOpenModal, setIsOpenModal}: Props) {
    const [form, setForm] = useState({
        name: "",
        title: ""
    });

    const {useCreateCategory} = useAPI();
    const createMutation = useCreateCategory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    }

    const handleClose = () => {
        setIsOpenModal(false);
        setForm({name: "", title: ""});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createMutation.mutate(form, {
            onSuccess: () => {
                handleClose();
                toast.success("دسته بندی با موفقیت ساخته شد.")
            },
            onError: (err) => {
                console.error("خطا در ایجاد دسته:", err);
                toast.error("خطایی در ساخت دسته بندی به وجود آمده است.")
            }
        });
    }

    return (
        <ModalWrapper
            title="افزودن دسته‌بندی جدید"
            isOpenModal={isOpenModal}
            handleClose={handleClose}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1 text-sm">
                    <label>نام دسته بندی:</label>
                    <input
                        className="w-full border border-gray-400 p-1.5 rounded-md"
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col space-y-1 text-sm">
                    <label>نام انگلیسی دسته بندی:</label>
                    <input
                        className="w-full border border-gray-400 p-1.5 rounded-md"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
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
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/60 transition-colors"
                        disabled={createMutation?.isPending}
                    >
                        {createMutation?.isPending ? "در حال ثبت..." : "ثبت دسته بندی"}
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
}
