import {getAllProducts} from "@/lib/api"
import ProductCard from "@/components/Cards/ProductCard"
import SectionHeader from "@/components/Helper/SectionHeader"

export default async function MenuPage() {
    const products = await getAllProducts()

    return (
        <section className="container mb-12">
            <SectionHeader
                subHeader="پیشنهاد ویژه ما"
                mainHeader="پر فروش ترین محصولات"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map(product => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </div>
        </section>
    )
}
