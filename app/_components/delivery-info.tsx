import React from 'react'
import { Card } from './ui/card'
import { BikeIcon, TimerIcon } from 'lucide-react'
import { Restaurant } from '@prisma/client'
import { formatCurrency } from '../_helpers/price'

interface DeliveryInfoProps {
    restaurant: Pick<Restaurant, "deliveryFae" | "deliveryTimeMinutes">
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
        <Card className='flex justify-around py-3 mt-6'>
            <div className='flex flex-col items-center'>
                <div className='flex items-center gap-1 text-muted-foreground'>
                    <span className='text-xs'>Entrga</span>
                    <BikeIcon size={14} />
                </div>
                
                { Number(restaurant.deliveryFae) > 0 ? (
                    <p className='text-xs font-semibold'>
                        {formatCurrency(Number(restaurant.deliveryFae))}
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
                
                { Number(restaurant.deliveryFae) > 0 ? (
                    <p className='text-xs font-semibold'>
                        {restaurant.deliveryTimeMinutes} min
                    </p>
                ): (
                    <p className='text-xs font-semibold'>
                        Gratis
                    </p>
                )}
            </div>
        </Card>

    </>
  )
}

export default DeliveryInfo