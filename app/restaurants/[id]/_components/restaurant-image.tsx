
"use client"

import { Button } from '@/app/_components/ui/button'
import { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'


interface RestaurantImageProps {
    restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

export const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {

    const router = useRouter()

    const handle = () => router.back()

  return (
    <div className="relative h-[250px] w-full ">
        <Image 
            src={restaurant?.imageUrl}
            alt={restaurant?.name}
            fill
            className="object-cover"
        />

        <Button onClick={handle} className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white" size="icon">
            <ChevronLeftIcon />
        </Button>

        <Button size="icon" className='absolute rounded-full h-7 w-7 top-4 right-4 bg-gray-700'>
            <HeartIcon size={20} className='fill-white' />
        </Button>
    </div>
  )
}
