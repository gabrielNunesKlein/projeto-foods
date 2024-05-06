

import React, { useContext } from 'react'
import { CartContext } from '../_context/cart'
import { CartItem } from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '../_helpers/price'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

export default function Car() {

  const { products, subTotalPrice, totalPrice, totalDisconts } = useContext(CartContext)

  return (
    <div className='py-5 h-full flex flex-col'>
        <div className='space-y-4 flex-auto'>
            {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
            ))}
        </div>

        <div className='mt-6'>
            <Card>
                <CardContent className='p-5 space-y-2'>
                    <div className='flex justify-between items-center'>
                        <span className='text-xs text-muted-foreground'>SubTotal</span>
                        <span>{formatCurrency(subTotalPrice)}</span>
                    </div>

                    <Separator />

                    <div className='flex justify-between items-center'>
                        <span className='text-xs text-muted-foreground'>Descontos</span>
                        <span>- {formatCurrency(totalDisconts)}</span>
                    </div>

                    <Separator />

                    <div className='flex justify-between items-center'>
                        <span className='text-xs text-muted-foreground'>Entrega</span>

                        { Number(products[0]?.restaurant.deliveryFae) > 0 
                        ? <span className='uppercase text-primary'>Gratis</span>
                        : formatCurrency(Number(products[0]?.restaurant.deliveryFae))}
                    </div>

                    <Separator />

                    <div className='flex justify-between items-center font-semibold'>
                        <span className='text-xs'>Total</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>

                </CardContent>
            </Card>
        </div>

        <Button className='w-full mt-6'>
            Finalizar pedido
        </Button>
    </div>
  )
}
