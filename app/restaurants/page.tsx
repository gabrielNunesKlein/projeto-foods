"use client"

import { Restaurant } from '@prisma/client'
import { notFound, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { searchRestaurants } from './_actions/search'
import { Header } from '../_components/header'
import { RestaurantItem } from '../_components/restaurant-item'

const RestaurantsPage = () => {

    const searchParams = useSearchParams()

    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        const fetchRestaurants = async () => {
            const searchFor = searchParams.get("search")

            if(!searchFor) return

            const foundRestaurants = await searchRestaurants(searchFor || '')
            setRestaurants(foundRestaurants)
        }

        fetchRestaurants()
    }, [searchParams])

    const searchFor = searchParams.get("search")

    if(!searchFor){
        return notFound()
    }

    

  return (
    <>
        <Header />
        <div className='px-5 py-6'>
            <h2 className='text-lg font-semibold'>Restaurantes Encontrados</h2>
            <div className='flex flex-col w-full gap-6 py-5'>
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

export default RestaurantsPage