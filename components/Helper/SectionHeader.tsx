interface SectionHeadersProps {
    subHeader?: string;
    mainHeader?: string;
}

export default function SectionHeader({subHeader, mainHeader}: SectionHeadersProps) {
    return (
        <div className="flex text-center flex-col gap-y-2 my-7">
            <h3 className="uppercase text-gray-500 text-lg font-semibold leading-4">
                {subHeader}
            </h3>
            <h2 className="text-primary font-bold text-4xl">
                {mainHeader}
            </h2>
        </div>
    );
}