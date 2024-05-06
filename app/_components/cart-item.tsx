import React, { useContext } from 'react'
import { CartContext, CartProduct } from '../_context/cart'
import Image from 'next/image'
import { formatCurrency, getProductTotalPrice } from '../_helpers/price'
import { Button } from './ui/button'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'

interface CartItemProps {
    cartProduct: CartProduct
}

export const CartItem = ({ cartProduct }: CartItemProps) => {

    const { decressProductQuantity, incrementProductQuantity, removeProduct } = useContext(CartContext)

    const handleDecressProductQuantity = () => {
        decressProductQuantity(cartProduct.id)
    }

    const handleincrementProductQuantity = () => {
        incrementProductQuantity(cartProduct.id)
    }

    const handleRemove = () => {
        removeProduct(cartProduct.id)
    }

  return (
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <div className='w-20 h-20 relative'>
                <Image className='rounded-lg object-cover' src={cartProduct.imageUrl} alt={cartProduct.name} fill />
            </div>

            <div className='space-y-2'>
                <h3 className='text-xs'>
                    {cartProduct.name}
                </h3>

                <div className='flex items-center'>
                    <h4 className='text-sm font-semibold'>
                        {formatCurrency(getProductTotalPrice(cartProduct) * cartProduct.quantity)}
                    </h4>

                    { cartProduct.discontPercentage > 0 && (
                        <span className='text-xs text-muted-foreground line-through'>
                            {formatCurrency(Number(cartProduct.price) * cartProduct.quantity )}
                        </span>
                    )}
                </div>
                
                <div className="flex items-center gap-3">
                    <Button 
                    onClick={handleDecressProductQuantity}
                    size="icon" variant="ghost" className='w-8 h-8 border-muted-foreground border-solid border'>
                        <ChevronLeftIcon />
                    </Button>
                    <span className='w-4 text-sm'>{cartProduct.quantity}</span>
                    
                    <Button 
                    onClick={handleincrementProductQuantity}
                    size="icon" className='w-8 h-8'>
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </div>

        <Button
            onClick={handleRemove}
            size="icon" 
            className='w-8 h-8 border border-solid border-muted-foreground' 
            variant='ghost'>
            <TrashIcon size={18} />
        </Button>

    </div>
  )
}
