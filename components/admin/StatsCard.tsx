import React from "react";

interface Props {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

const StatCard: React.FC<Props> = ({icon, label, value}) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5 flex items-center">
            <div className="flex-shrink-0 text-primary text-4xl">{icon}</div>
            <div className="mr-5 w-0 flex-1">
                <dl>
                    <dt className=" font-medium text-gray-500 truncate">{label}</dt>
                    <dd className="text-2xl font-medium text-gray-900">
                        {typeof value === 'number' ? value.toLocaleString('fa-IR') : value}
                    </dd>
                </dl>
            </div>
        </div>
    </div>
);

export default StatCard;
