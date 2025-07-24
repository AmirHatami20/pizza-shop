'use client'

import {useAPI} from "@/hook/useAPI"
import ProductSection from '@/components/menu/ProductSection'
import FullLoader from '@/components/Helper/FullLoader'

export default function MenuPage() {
    const {useAllProducts, useAllCategories} = useAPI()

    const {data: products, isLoading: isLoadingProducts} = useAllProducts()
    const {data: categories, isLoading: isLoadingCategories} = useAllCategories()

    if (isLoadingProducts || isLoadingCategories) return <FullLoader/>

    return (
        <ProductSection products={products!} categories={categories!}/>
    )
}
