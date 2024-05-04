
"use client";

import { useState } from 'react'

import Image from 'next/image'
import { Prisma } from '@prisma/client'
import { BadgeDiscont } from '../../../_components/badge-discont'
import { formatCurrency, getProductTotalPrice } from '../../../_helpers/price'
import { Button } from '@/app/_components/ui/button'
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from 'lucide-react'
import { Card } from '@/app/_components/ui/card'
import { ProductList } from '@/app/_components/ProductList'

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>;

    extraProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>[]
}

export const ProductDetails = ({ product, extraProducts }: ProductDetailsProps) => {
    const [qunatity, setQuantity] = useState(1)

    const handleIncrement = ()  => setQuantity(currentState => currentState + 1)
    
    const handleDecrement = ()  => 
        setQuantity((currentState) => {
            if(currentState == 1) return 1


            return currentState - 1
        })


  return (
    <div className="py-5">
    <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative w-6 h-6">
            <Image 
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                className="rounded-full object-cover"
            />
        </div>
        <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
    </div>
    <h1 className="font-semibold text-xl mb-2 mt-1 px-5">{product.restaurant.name}</h1>

    
    <div className="flex justify-between px-5">
        <div>
            <div className="flex items-center space-x-3">
                <h2 className="font-semibold text-xl">{formatCurrency(getProductTotalPrice(product))}</h2>
                <BadgeDiscont product={product}  />
            </div>
        
        {product.discontPercentage !== 0 && (
            <p className="text-muted-foreground text-sm">
                De: {formatCurrency(Number(product.price))}
            </p>
        )}

        </div>

        <div className="flex items-center gap-3">
            <Button onClick={handleDecrement} size="icon" variant="ghost" className='border-muted-foreground border-solid border'>
                <ChevronLeftIcon />
            </Button>
            <span className='w-4 text-sm'>{qunatity}</span>
            <Button size="icon" onClick={handleIncrement}>
                <ChevronRightIcon />
            </Button>
        </div>
    </div>
    
    <div className="px-5">
        <Card className='flex justify-around py-3 mt-6'>
            <div className='flex flex-col items-center'>
                <div className='flex items-center gap-1 text-muted-foreground'>
                    <span className='text-xs'>Entrga</span>
                    <BikeIcon size={14} />
                </div>
                
                { Number(product.restaurant.deliveryFae) > 0 ? (
                    <p className='text-xs font-semibold'>
                        {formatCurrency(Number(product.restaurant.deliveryFae))}
                    </p>
                ): (
                    <p className='text-xs font-semibold'>
                        Gratis
                    </p>
                )}
            </div>

            <div className='flex flex-col items-center'>
                <div className='flex items-center gap-1 text-muted-foreground'>
                    <span className='text-xs'>Entrga</span>
                    <TimerIcon size={14} />
                </div>
                
                { Number(product.restaurant.deliveryFae) > 0 ? (
                    <p className='text-xs font-semibold'>
                        {product.restaurant.deliveryTimeMinutes} min
                    </p>
                ): (
                    <p className='text-xs font-semibold'>
                        Gratis
                    </p>
                )}
            </div>
        </Card>

    </div>

    <div className='mt-6 space-y-3 px-5'>
        <h3 className='font-semibold'>
            Sobre
        </h3>
        <p className='text-sm text-muted-foreground'>
            {product.description}
        </p>
    </div>

    <div className='mt-6 space-y-3'>
        <h3 className='font-semibold px-5'>
            Produtos Semelhantes
        </h3>

        <ProductList products={extraProducts} />

    </div>


</div>
  )
}
