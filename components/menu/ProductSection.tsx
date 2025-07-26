'use client'

import {Product, Category} from "@/types"
import SectionHeader from "@/components/Helper/SectionHeader"
import ProductCard from "@/components/Cards/ProductCard"

type Props = {
    products: Product[]
    categories: Category[]
}

export default function ProductSection({products, categories}: Props) {
    return (
        <div className="mb-10 space-y-10">
            {categories.map(cat => {
                const relatedProducts = products.filter(product =>
                    product.categories?.some(c => c._id === cat._id)
                ).slice(0, 3)

                if (relatedProducts.length === 0) return null

                return (
                    <section key={cat._id} className="container">
                        <SectionHeader
                            mainHeader={cat.title}
                            subHeader="دسته بندی"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedProducts.map(product => (
                                <ProductCard
                                    key={product._id}
                                    {...product}
                                />
                            ))}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
