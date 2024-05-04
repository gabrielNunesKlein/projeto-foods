import { ProductList } from '@/app/_components/ProductList'
import { Header } from '@/app/_components/header'
import { ProductItem } from '@/app/_components/product-item'
import { db } from '@/app/_lib/prisma'
import React from 'react'

const RecomendadedProductPage = async () => {

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

  return (
    <div>
    <>
        <Header />
        <div className='px-5 py-6'>
            <h2 className='text-lg font-semibold'>Pedidos Recomendados</h2>
            <div className='grid grid-cols-2 w-full gap-6 py-5'>
                {products.map((product) => (
                    <ProductItem key={product.id}  product={product}
                    />
                ))}
            </div>
        </div>
    </>
    </div>
  )
}

export default RecomendadedProductPage;
