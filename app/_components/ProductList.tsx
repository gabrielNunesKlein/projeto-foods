import { db } from "../_lib/prisma"
import { ProductItem } from "./product-item"

export const ProductList = async () => {

    const products = await db.product.findMany({
        take: 10,
        include: {
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    })

    console.log("Products >>> ", products)

    return (
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}