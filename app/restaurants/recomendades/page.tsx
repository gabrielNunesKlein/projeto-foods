import { Header } from '@/app/_components/header'
import { RestaurantItem } from '@/app/_components/restaurant-item'
import { db } from '@/app/_lib/prisma'
import React from 'react'

async function RecomendadedRestaurants() {

    const restaurants = await db.restaurant.findMany({})

  return (
    <>
        <Header />
        <div className='px-5 py-6'>
            <h2 className='text-lg font-semibold'>Restaurants Favoritos</h2>
            <div className='flex flex-wrap w-full gap-6 py-5'>
                {restaurants.map((restaurant) => (
                    <RestaurantItem key={restaurant.id} restaurant={restaurant} 
                        className='min-w-full max-w-full'
                    />
                ))}
            </div>
        </div>
    </>
  )
}

export default RecomendadedRestaurants