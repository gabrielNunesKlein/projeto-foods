
"use client";

import { useContext, useState } from 'react'

import Image from 'next/image'
import { Prisma } from '@prisma/client'
import { BadgeDiscont } from '../../../_components/badge-discont'
import { formatCurrency, getProductTotalPrice } from '../../../_helpers/price'
import { Button } from '@/app/_components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { ProductList } from '@/app/_components/ProductList'
import DeliveryInfo from '@/app/_components/delivery-info';
import { CartContext } from '@/app/_context/cart';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/_components/ui/sheet';
import Cart from '@/app/_components/cart';

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
    const [isCartOpen, setIsCartOpen] = useState(false)

    const { products, addProduct } = useContext(CartContext)

    

    const handleAddCart = () => {
        addProduct(product, qunatity)
        setIsCartOpen(true)

        console.log("products >>> ", products)
    }

    const handleIncrement = ()  => setQuantity(currentState => currentState + 1)
    
    const handleDecrement = ()  => 
        setQuantity((currentState) => {
            if(currentState == 1) return 1


            return currentState - 1
        })


  return (
    <>
    <div className="z-50 relative py-5 rounded-tl-3xl rounded-tr-3xl mt-[-1.5rem] bg-white">
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
        <DeliveryInfo restaurant={product.restaurant} />
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

    <div className="mt-6 px-5">
        <Button onClick={handleAddCart} className='w-full font-semibold'>
            Adicionar a Sacola
        </Button>
    </div>


</div>

<Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
    <SheetContent className='w-[90vw]'>
        <SheetHeader>
            <SheetTitle className='text-left'>
                Sacola
            </SheetTitle>
        </SheetHeader>
        <Cart />
    </SheetContent>
</Sheet>

</>
  )
}
