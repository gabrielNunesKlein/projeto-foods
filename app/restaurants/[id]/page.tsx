import { db } from '@/app/_lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'
import { RestaurantImage } from './_components/restaurant-image'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
import DeliveryInfo from '@/app/_components/delivery-info'
import { ProductList } from '@/app/_components/ProductList'
import CartBanner from './_components/cart-banner'

interface RestaurantPageProps {
    params: {
        id: string
    }
}

const RestaurantPage = async ({ params: {id}}: RestaurantPageProps) => {

    const restaurant = await db.restaurant.findUnique({
        where: {
            id
        },
        include: {
            categories: {
                include: {
                    products: {
                        where: {
                            restaurantId: id
                        },
                        include: {
                            restaurant: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            },
            products: {
                take: 10,
                include: {
                    restaurant: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    if(!restaurant){
        return notFound();
    }

  return (
    <div>
        <RestaurantImage restaurant={restaurant} />

        <div className="flex justify-between items-center px-5 pt-5 z-50 relative rounded-tl-3xl rounded-tr-3xl mt-[-1.5rem] bg-white ">
            <div className='flex items-center gap-[0.35rem]'>
                <div className="relative w-8 h-8">
                    <Image 
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <h1 className='font-semibold text-xl'>
                    {restaurant.name}
                </h1>
            </div>
            
            <div className='gap-3px bg-white px-2 py-[2px] rounded-full text-white bg-foreground flex items-center'>
                <StarIcon size={12} className='fill-yellow-400 text-yellow-400' />
                <span className='font-semibold text-xs'>5.0</span>
            </div>
        </div>

        <div className="px-5">
            <DeliveryInfo restaurant={restaurant} />
        </div>

        <div className='flex items-center overflow-x-scroll gap-4 px-5 mt-3'>
            {restaurant.categories.map((category) => (
                <div key={category.id} className='min-w-[167px] bg-[#F4F4F5] rounded-lg text-center'>
                    <span className='text-xs text-center text-muted-foreground'>{category.name}</span>
                </div>
            ))}
        </div>

        <div className="mt-6 space-y-4">
            <h2 className='px-5 font-semibold'>Mais Pedidos</h2>
            <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
            <div className="mt-6 space-y-4" key={category.id}>
                <h2 className='px-5 font-semibold'>{category.name}</h2>
                <ProductList products={category.products} />
            </div>
        ))}

        <CartBanner restaurant={restaurant} />


    </div>
  )
}

export default RestaurantPage