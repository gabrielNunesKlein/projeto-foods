import { Header } from '@/app/_components/header'
import { ProductItem } from '@/app/_components/product-item'
import { db } from '@/app/_lib/prisma'
import React from 'react'

interface CategoriesPageProps {
    params: {
        id: string
    }
}

const CategoriesPage = async ({ params: {id}}: CategoriesPageProps) => {

  const category = await db.category.findUnique({
    where: {
        id
    },
    include: {
        products: {
            include: {
                restaurant: {
                    select: {
                        name: true
                    }
                }
            }
        }
    }
  })  

  return (
    <>
        <Header />
        <div className='px-5 py-6'>
            <h2 className='text-lg font-semibold'>{category?.name}</h2>
            <div className='flex flex-wrap w-full gap-6 py-5'>
                {category?.products.map((product) => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </div>
        </div>
    </>
  )
}


export default CategoriesPage;