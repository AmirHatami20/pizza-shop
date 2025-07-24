import React from 'react';

interface Props {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function Header({children, title, subtitle}: Props) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            </div>
            <div className="flex gap-x-3 space-x-reverse justify-center gap-y-2 flex-wrap">
                {children}
            </div>
        </div>
    );
}