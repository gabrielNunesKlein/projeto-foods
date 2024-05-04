

import { Restaurant } from '@prisma/client'
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { formatCurrency } from '../_helpers/price';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '../_lib/utils';

interface RestaurantItemProps {
    restaurant: Restaurant;
    className?: string;
}

export const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link className={cn("min-w-[266px] max-w-[266px]", className)} href={`/restaurants/${restaurant.id}`}>
        <div className='w-full space-y-3'>
            <div className='w-full h-[136px] relative'>
                <Image src={restaurant.imageUrl} 
                    alt={restaurant.name} 
                    fill className='object-cover rounded-lg' 
                />
                <div className='absolute gap-2px top-2 left-2 bg-white px-2 py-1 rounded-full text-black flex items-center'>
                    <StarIcon size={12} className='fill-yellow-400 text-yellow-400' />
                    <span className='font-semibold text-xs'>5.0</span>
                </div>

                <Button size="icon" className='absolute rounded-full h-7 w-7 top-2 right-2 bg-gray-700'>
                    <HeartIcon size={16} className='fill-white' />
                </Button>
            </div>

            <div className='space-y-4'>
                <h3 className='font-semibold text-sm'>{restaurant.name}</h3>
                <div className="flex gap-3">
                    <div className="flex gap-1 items-center">
                        <BikeIcon className='text-primary' size={12} />
                        <span className=' text-xs text-muted-foreground'>
                            {Number(restaurant.deliveryFae) == 0 ? "Entrega Gratis" : formatCurrency(Number(restaurant.deliveryFae))}
                        </span>
                    </div>

                    <div className="flex gap-1 items-center">
                        <TimerIcon className='text-primary' size={12} />
                        <span className=' text-xs text-muted-foreground'>
                            {restaurant.deliveryTimeMinutes} min
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}
