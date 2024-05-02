

import { Prisma, Product } from '@prisma/client'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { getProductTotalPrice, formatCurrency } from '../_helpers/price'
import { ArrowDown, ArrowDownIcon } from 'lucide-react'

interface ProductItemProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    }>
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className='w-[150px] min-w-[150px] space-y-2'>
        <div className='relative h-[150px] w-full'>
            <Image 
                src={product.imageUrl}
                alt={product.name}
                fill
                className='rounded-lg object-cover shadow-md'
            />


                <div className='absolute gap-2px top-0 left-0 bg-primary px-2 py-1 rounded-full text-white flex items-center'>
                    <ArrowDownIcon />
                    <span className='font-semibold text-xs'>{product.discontPercentage || 10} %</span>
                </div>


        </div>

        <div>
            <h2 className='text-sm truncate'>{product.name}</h2>
            <div className='flex gap-1'>
                R$
                <h3 className='font-semibold'>{formatCurrency(Number(product.price))}</h3>
                R$
                {product.discontPercentage > 0 && (
                    <span className='text-xs line-through text-muted-foreground'>
                        {formatCurrency(Number(product.price))}
                    </span>
                )}
            </div>

            <span className='text-muted-foreground text-xs'>
                {product.restaurant.name}
            </span>
        </div>
        
    </div>
  )
}
