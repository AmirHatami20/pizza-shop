import React, {useEffect} from 'react';

interface ModalProps {
    isOpenModal: boolean;
    handleClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function ModalWrapper({children, title, handleClose, isOpenModal}: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        }

        if (isOpenModal) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpenModal, handleClose]);

    return (
        <div
            className={`fixed inset-0 bg-black/50 z-40 flex items-center justify-center transition-opacity duration-300 ${
                isOpenModal ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={handleClose}
        >
            <div
                className={`bg-white rounded-xl shadow-xl w-full max-w-lg p-6 transform transition-all overflow-y-auto max-h-screen duration-300 ${
                    isOpenModal ? 'scale-95 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-4'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-red-500">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}