"use client";

import { useContext, useState } from 'react'
import { CartContext } from '@/app/_context/cart'
import { formatCurrency } from '@/app/_helpers/price'
import { Restaurant } from '@prisma/client'
import { Button } from '@/app/_components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/_components/ui/sheet';
import Cart from '@/app/_components/cart';

interface CartBannerProps {
    restaurant: Pick<Restaurant, "id">
}

const CartBanner = ({ restaurant }: CartBannerProps) => {

    const { products, totalPrice, totalQuantity } = useContext(CartContext)

    const restaurantHasProduct = products.some((product) => product.restaurantId == restaurant.id)

    if(!restaurantHasProduct) return null;

  return (
    <div className='fixed w-full z-50 bg-white bottom-0 left-0 p-5 pt-3 border-t-muted-foreground border shadow-md'>
        <div className='flex justify-between items-center'>
            <div>
                <span className='text-xs text-muted-foreground'>
                    Total sem entrega
                </span>
                <h3 className='font-semibold'>
                    {formatCurrency(totalPrice)} 
                    <span className='text-xs text-muted-foreground'>/ {totalQuantity}</span>
                </h3>
            </div>
            
            <Sheet>
                <SheetTrigger>
                    <Button>
                        Ver Sacola
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-[90vw]'>
                    <SheetHeader>
                        <SheetTitle className='text-left'>
                            Sacola
                        </SheetTitle>
                    </SheetHeader>
                        <Cart />
                </SheetContent>
            </Sheet>

        </div>
    </div>
  )
}

export default CartBanner