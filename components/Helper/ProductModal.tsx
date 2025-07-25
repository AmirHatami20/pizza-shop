import React from 'react';
import ModalWrapper from "@/components/Helper/ModalWrapper";

interface ProductModalProps {
    isOpenModal: boolean;
    handleClose: () => void;
}

export default function ProductModal({isOpenModal, handleClose,}: ProductModalProps) {
    return (
        <ModalWrapper
            title="اضافه کردن محصول به سبد"
            isOpenModal={isOpenModal}
            handleClose={handleClose}
        >
            <div>

            </div>

        </ModalWrapper>
    );
}